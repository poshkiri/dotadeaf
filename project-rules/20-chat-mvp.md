# InterestingDeaf - Chat MVP Rules

## Purpose
This document defines mandatory MVP rules for the chat system in InterestingDeaf.
The goal is to provide clear, private, and maintainable one-to-one messaging for deaf and hard-of-hearing Dota 2 players.

## Project Context
- Product: InterestingDeaf (MVP platform for deaf and hard-of-hearing Dota 2 players).
- Chat model: one-to-one personal messaging only.
- Architecture context: Next.js App Router, TypeScript, Supabase.

## 1) Purpose of the Chat System
1. Enable private direct communication between two users.
2. Support practical teammate coordination in a simple text-based format.
3. Keep message interactions clear, predictable, and easy to audit.
4. Prioritize reliability and privacy over feature breadth.

## 2) Scope of Conversations and Messages
MVP chat scope includes only:
1. One-to-one conversations.
2. Message sending and reading inside existing allowed conversations.
3. Basic conversation list and thread views.
4. Minimal message state needed for core usability (for example timestamps/read marker handling if implemented).

Out-of-scope features must not be implemented in MVP without explicit approval.

## 3) One-to-One Conversation Constraint
1. Every conversation must represent exactly two participants.
2. Group chats are explicitly prohibited in MVP.
3. Conversation membership rules must prevent invalid participant counts for one-to-one behavior.
4. No conversation type polymorphism (for example “group” vs “direct”) is required in MVP.

## 4) Conversation Creation Rules
1. Conversation creation must occur only between valid authenticated users.
2. Duplicate one-to-one conversations between the same user pair should be avoided by design and data constraints where feasible.
3. Conversation creation must enforce participant ownership and validity checks.
4. Conversation creation flow must stay simple and deterministic.
5. Do not create speculative conversation metadata unrelated to MVP needs.

## 5) Message Sending Behavior
1. Users can send messages only in conversations they participate in.
2. Sender identity must always match the authenticated user context.
3. Empty messages must be rejected.
4. Message creation must be atomic and tied to one conversation.
5. Message ordering must be deterministic and consistent in thread display.
6. Message sending failure must provide a clear retry-safe outcome.

## 6) Message Display Expectations
1. Thread views must clearly distinguish sender vs recipient messages.
2. Message chronology must be obvious and stable.
3. Timestamp visibility should be clear enough for practical conversation context.
4. Conversation list should present useful recency context (for example latest message timing) where available.
5. UI must remain text-first, calm, and readable without decorative complexity.

## 7) Access Control Expectations
1. Conversation and message access is restricted to conversation participants only.
2. Users must not list, view, or interact with conversations they do not belong to.
3. Users must not send messages on behalf of other users.
4. Access checks must be enforced at trusted server/database boundaries.
5. Deny-by-default behavior applies when ownership/participant checks are uncertain.

## 8) Security Expectations
1. Chat operations must follow least-privilege principles.
2. Do not expose internal identifiers or data unrelated to the caller’s authorized scope.
3. Validate all user-controlled input before persistence.
4. Do not leak sensitive internals through error messages.
5. Keep chat data access aligned with RLS and authorization policy expectations.

## 9) Performance and Delivery Simplicity
1. Keep MVP chat implementation straightforward and maintainable.
2. Polling/server-render refresh patterns are acceptable in MVP if they remain clear and efficient.
3. Real-time transport complexity is not required at this stage.
4. Avoid premature optimization and speculative messaging infrastructure.

## 10) Intentionally Out of Scope for MVP
1. Group chats.
2. Real-time infrastructure requirements (for example mandatory websocket architecture).
3. File/media attachments.
4. Message reactions.
5. Typing indicators, presence-rich collaboration features, and advanced chat UX effects.
6. Message forwarding, pinning, threads, or other advanced messaging mechanics.
7. Voice/video communication features.

## 11) Maintainability Requirements
1. Keep chat domain logic, data access, and UI responsibilities clearly separated.
2. Keep message and conversation rules centralized and reusable.
3. Avoid duplicate access-control logic spread across unrelated layers.
4. Keep chat modules small, explicit, and easy to review.
5. Expand chat complexity only after explicit post-MVP scope approval.

## Enforcement
1. Any chat implementation that violates these rules is non-compliant.
2. If uncertainty exists, choose the simpler and stricter one-to-one interpretation.
3. Privacy, correctness, and access safety take priority over feature expansion.
