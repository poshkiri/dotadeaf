import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const CONVERSATIONS_TABLE = "conversations";
const CONVERSATION_PARTICIPANTS_TABLE = "conversation_participants";
const MESSAGES_TABLE = "messages";
const DEFAULT_MESSAGE_LIMIT = 50;
const MAX_MESSAGE_LIMIT = 100;

type ConversationRow = {
  id: string;
  created_at: string;
  updated_at: string;
  last_message_at: string | null;
};

type ConversationParticipantRow = {
  conversation_id: string;
  user_id: string;
};

type MessageRow = {
  id: string;
  conversation_id: string;
  sender_user_id: string;
  body: string;
  created_at: string;
  edited_at: string | null;
};

export type UserConversation = {
  id: string;
  created_at: string;
  updated_at: string;
  last_message_at: string | null;
};

export type ConversationMessage = {
  id: string;
  conversation_id: string;
  sender_user_id: string;
  body: string;
  created_at: string;
  edited_at: string | null;
};

export type ConversationSummary = {
  id: string;
  other_participant: {
    user_id: string;
    display_name: string;
  };
  last_message_body: string | null;
  last_message_at: string | null;
};

type FetchConversationMessagesParams = {
  currentUserId: string;
  conversationId: string;
  limit?: number;
};

type SendMessageParams = {
  currentUserId: string;
  conversationId: string;
  body: string;
};

type CreateOrGetDirectConversationParams = {
  currentUserId: string;
  otherUserId: string;
};

type ProfileRow = {
  user_id: string;
  display_name: string;
};

type PostgresError = {
  code?: string;
  message?: string;
};

function normalizeMessageBody(value: string): string {
  return value.trim();
}

function resolveMessageLimit(limit: number | undefined): number {
  if (!limit || Number.isNaN(limit)) {
    return DEFAULT_MESSAGE_LIMIT;
  }

  return Math.min(Math.max(limit, 1), MAX_MESSAGE_LIMIT);
}

async function assertConversationParticipant({
  userId,
  conversationId,
}: {
  userId: string;
  conversationId: string;
}): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(CONVERSATION_PARTICIPANTS_TABLE)
    .select("id")
    .eq("conversation_id", conversationId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to verify conversation access: ${error.message}`);
  }

  if (!data) {
    throw new Error("Conversation access denied for this user.");
  }
}

export async function fetchUserConversations(
  currentUserId: string,
): Promise<UserConversation[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(CONVERSATION_PARTICIPANTS_TABLE)
    .select(
      "conversation_id, conversations!inner(id, created_at, updated_at, last_message_at)",
    )
    .eq("user_id", currentUserId);

  if (error) {
    throw new Error(`Failed to fetch conversations: ${error.message}`);
  }

  const rows = (data ?? []) as Array<{
    conversations: ConversationRow | ConversationRow[] | null;
  }>;

  return rows
    .map((row) =>
      Array.isArray(row.conversations) ? row.conversations[0] : row.conversations,
    )
    .filter((conversation): conversation is ConversationRow => Boolean(conversation))
    .map((conversation) => ({
      id: conversation.id,
      created_at: conversation.created_at,
      updated_at: conversation.updated_at,
      last_message_at: conversation.last_message_at,
    }))
    .sort((a, b) => {
      const aTimestamp = a.last_message_at ?? a.updated_at;
      const bTimestamp = b.last_message_at ?? b.updated_at;
      return new Date(bTimestamp).getTime() - new Date(aTimestamp).getTime();
    });
}

export async function fetchConversationSummaries(
  currentUserId: string,
): Promise<ConversationSummary[]> {
  const conversations = await fetchUserConversations(currentUserId);
  if (conversations.length === 0) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const conversationIds = conversations.map((conversation) => conversation.id);
  const { data: participantRows, error: participantError } = await supabase
    .from(CONVERSATION_PARTICIPANTS_TABLE)
    .select("conversation_id, user_id")
    .in("conversation_id", conversationIds)
    .neq("user_id", currentUserId);

  if (participantError) {
    throw new Error(`Failed to fetch conversation participants: ${participantError.message}`);
  }

  const otherParticipants = (participantRows ?? []) as ConversationParticipantRow[];
  const otherUserIds = [...new Set(otherParticipants.map((row) => row.user_id))];

  const profilesByUserId = new Map<string, string>();
  if (otherUserIds.length > 0) {
    const { data: profileRows, error: profileError } = await supabase
      .from("profiles")
      .select("user_id, display_name")
      .in("user_id", otherUserIds);

    if (profileError) {
      throw new Error(`Failed to fetch participant profiles: ${profileError.message}`);
    }

    for (const profile of (profileRows ?? []) as ProfileRow[]) {
      const normalizedDisplayName = profile.display_name?.trim();
      profilesByUserId.set(profile.user_id, normalizedDisplayName || "Unknown user");
    }
  }

  const { data: lastMessageRows, error: lastMessageError } = await supabase
    .from(MESSAGES_TABLE)
    .select("conversation_id, body, created_at")
    .in("conversation_id", conversationIds)
    .order("created_at", { ascending: false });

  if (lastMessageError) {
    throw new Error(`Failed to fetch last messages: ${lastMessageError.message}`);
  }

  const latestMessageByConversation = new Map<
    string,
    { body: string | null; created_at: string }
  >();
  for (const message of (lastMessageRows ?? []) as Array<{
    conversation_id: string;
    body: string | null;
    created_at: string;
  }>) {
    if (!latestMessageByConversation.has(message.conversation_id)) {
      latestMessageByConversation.set(message.conversation_id, {
        body: message.body,
        created_at: message.created_at,
      });
    }
  }

  const otherParticipantByConversation = new Map<string, string>();
  for (const participant of otherParticipants) {
    if (!otherParticipantByConversation.has(participant.conversation_id)) {
      otherParticipantByConversation.set(participant.conversation_id, participant.user_id);
    }
  }

  return conversations
    .map((conversation) => {
      const otherUserId = otherParticipantByConversation.get(conversation.id);
      if (!otherUserId) {
        return null;
      }

      const lastMessage = latestMessageByConversation.get(conversation.id);
      return {
        id: conversation.id,
        other_participant: {
          user_id: otherUserId,
          display_name: profilesByUserId.get(otherUserId) ?? "Unknown user",
        },
        last_message_body: lastMessage?.body ?? null,
        last_message_at: lastMessage?.created_at ?? conversation.last_message_at,
      } satisfies ConversationSummary;
    })
    .filter((item): item is ConversationSummary => Boolean(item))
    .sort((a, b) => {
      const aTime = a.last_message_at ?? "";
      const bTime = b.last_message_at ?? "";
      return new Date(bTime).getTime() - new Date(aTime).getTime();
    });
}

export async function fetchConversationMessages({
  currentUserId,
  conversationId,
  limit,
}: FetchConversationMessagesParams): Promise<ConversationMessage[]> {
  await assertConversationParticipant({ userId: currentUserId, conversationId });

  const supabase = await createSupabaseServerClient();
  const safeLimit = resolveMessageLimit(limit);
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .select("id, conversation_id, sender_user_id, body, created_at, edited_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(safeLimit);

  if (error) {
    throw new Error(`Failed to fetch messages: ${error.message}`);
  }

  const rows = (data ?? []) as MessageRow[];

  return rows
    .map((row) => ({
      id: row.id,
      conversation_id: row.conversation_id,
      sender_user_id: row.sender_user_id,
      body: row.body,
      created_at: row.created_at,
      edited_at: row.edited_at,
    }))
    .reverse();
}

export async function sendMessage({
  currentUserId,
  conversationId,
  body,
}: SendMessageParams): Promise<ConversationMessage> {
  await assertConversationParticipant({ userId: currentUserId, conversationId });

  const messageBody = normalizeMessageBody(body);
  if (!messageBody) {
    throw new Error("Message body cannot be empty.");
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .insert({
      conversation_id: conversationId,
      sender_user_id: currentUserId,
      body: messageBody,
    })
    .select("id, conversation_id, sender_user_id, body, created_at, edited_at")
    .single();

  if (error) {
    throw new Error(`Failed to send message: ${error.message}`);
  }

  const insertedMessage = data as MessageRow;
  const { error: updateConversationError } = await supabase
    .from(CONVERSATIONS_TABLE)
    .update({ last_message_at: insertedMessage.created_at })
    .eq("id", conversationId);

  if (updateConversationError) {
    throw new Error(
      `Message saved but failed to update conversation metadata: ${updateConversationError.message}`,
    );
  }

  return {
    id: insertedMessage.id,
    conversation_id: insertedMessage.conversation_id,
    sender_user_id: insertedMessage.sender_user_id,
    body: insertedMessage.body,
    created_at: insertedMessage.created_at,
    edited_at: insertedMessage.edited_at,
  };
}

export async function createOrGetDirectConversation({
  currentUserId,
  otherUserId,
}: CreateOrGetDirectConversationParams): Promise<UserConversation> {
  if (currentUserId === otherUserId) {
    throw new Error("Cannot create a direct conversation with yourself.");
  }

  const firstUserId = currentUserId < otherUserId ? currentUserId : otherUserId;
  const secondUserId = currentUserId < otherUserId ? otherUserId : currentUserId;
  const supabase = await createSupabaseServerClient();
  const { data: participantLinks, error: participantLinksError } = await supabase
    .from(CONVERSATION_PARTICIPANTS_TABLE)
    .select("conversation_id, user_id")
    .in("user_id", [currentUserId, otherUserId]);

  if (participantLinksError) {
    throw new Error(
      `Failed to find existing direct conversation: ${participantLinksError.message}`,
    );
  }

  const links = (participantLinks ?? []) as ConversationParticipantRow[];
  const candidateConversationIds = [
    ...new Set(links.map((link) => link.conversation_id)),
  ];

  if (candidateConversationIds.length > 0) {
    const { data: candidateParticipants, error: candidateParticipantsError } =
      await supabase
        .from(CONVERSATION_PARTICIPANTS_TABLE)
        .select("conversation_id, user_id")
        .in("conversation_id", candidateConversationIds);

    if (candidateParticipantsError) {
      throw new Error(
        `Failed to verify direct conversation participants: ${candidateParticipantsError.message}`,
      );
    }

    const allParticipants = (candidateParticipants ?? []) as ConversationParticipantRow[];
    const participantsByConversation = new Map<string, Set<string>>();

    for (const participant of allParticipants) {
      if (!participantsByConversation.has(participant.conversation_id)) {
        participantsByConversation.set(participant.conversation_id, new Set<string>());
      }
      participantsByConversation
        .get(participant.conversation_id)
        ?.add(participant.user_id);
    }

    const matchedConversationId = candidateConversationIds.find((conversationId) => {
      const participantSet = participantsByConversation.get(conversationId);
      if (!participantSet) {
        return false;
      }

      return (
        participantSet.size === 2 &&
        participantSet.has(currentUserId) &&
        participantSet.has(otherUserId)
      );
    });

    if (matchedConversationId) {
      const { data: existingConversation, error: existingConversationError } =
        await supabase
          .from(CONVERSATIONS_TABLE)
          .select("id, created_at, updated_at, last_message_at")
          .eq("id", matchedConversationId)
          .single();

      if (existingConversationError) {
        throw new Error(
          `Failed to load existing conversation: ${existingConversationError.message}`,
        );
      }

      const row = existingConversation as ConversationRow;
      return {
        id: row.id,
        created_at: row.created_at,
        updated_at: row.updated_at,
        last_message_at: row.last_message_at,
      };
    }
  }

  const { data: createdConversation, error: createConversationError } = await supabase
    .from(CONVERSATIONS_TABLE)
    .insert({})
    .select("id, created_at, updated_at, last_message_at")
    .single();

  if (createConversationError) {
    throw new Error(`Failed to create conversation: ${createConversationError.message}`);
  }

  const conversation = createdConversation as ConversationRow;
  const { error: createParticipantsError } = await supabase
    .from(CONVERSATION_PARTICIPANTS_TABLE)
    .insert([
      { conversation_id: conversation.id, user_id: currentUserId },
      { conversation_id: conversation.id, user_id: otherUserId },
    ]);

  if (createParticipantsError) {
    const postgresError = createParticipantsError as PostgresError;
    if (postgresError.code === "23505") {
      const { data: existingByPair, error: existingByPairError } = await supabase
        .from(CONVERSATIONS_TABLE)
        .select("id, created_at, updated_at, last_message_at")
        .eq("participant_one_user_id", firstUserId)
        .eq("participant_two_user_id", secondUserId)
        .maybeSingle();

      if (existingByPairError) {
        throw new Error(
          `Failed to resolve existing conversation after uniqueness conflict: ${existingByPairError.message}`,
        );
      }

      if (existingByPair) {
        const row = existingByPair as ConversationRow;
        return {
          id: row.id,
          created_at: row.created_at,
          updated_at: row.updated_at,
          last_message_at: row.last_message_at,
        };
      }
    }

    throw new Error(
      `Failed to add conversation participants: ${createParticipantsError.message}`,
    );
  }

  return {
    id: conversation.id,
    created_at: conversation.created_at,
    updated_at: conversation.updated_at,
    last_message_at: conversation.last_message_at,
  };
}
