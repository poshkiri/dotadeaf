# InterestingDeaf - Supabase Foundation Rules

## Purpose
This document defines the integration foundation rules for Supabase in the InterestingDeaf MVP.
Its purpose is to ensure a simple, secure, and maintainable Supabase setup for Next.js App Router and TypeScript.

## 1) Foundation Layer Role
1. The Supabase foundation layer is responsible for consistent client initialization and safe environment-based configuration usage.
2. It must provide clear boundaries between browser/client use cases and server use cases.
3. It must reduce duplication and prevent ad hoc Supabase setup across the codebase.
4. It must stay infrastructure-focused and avoid feature-specific business logic.

## 2) Browser/Client vs Server Separation
1. Browser/client contexts must use only the public Supabase configuration intended for client exposure.
2. Server contexts must use server-only configuration and enforce stronger trust boundaries.
3. Server and client initialization paths must remain explicitly separated.
4. Do not mix browser and server initialization logic in one ambiguous utility.
5. Do not pass server-level credentials or privileged behavior into client-side code paths.

## 3) Environment Variable Handling Expectations
1. Environment variables must be the only source for Supabase URL and keys.
2. Missing or invalid Supabase environment configuration is a runtime setup error and must be surfaced clearly.
3. Sensitive environment values must never be logged, exposed, or embedded in client bundles.
4. Client-safe variables and server-only variables must be clearly distinguished by naming and usage context.
5. Do not introduce permissive fallbacks for critical Supabase configuration.

## 4) Security Expectations: Anon Key vs Service Role Key
1. The anon key is for public or user-scoped client/server access paths under RLS policy control.
2. The service role key is privileged and server-only.
3. Service role credentials must never be used in browser/client contexts.
4. Service role usage must be restricted to explicitly approved trusted server operations.
5. Prefer least-privilege access patterns and default to anon + RLS where feasible for MVP behavior.

## 5) Centralization of Supabase Initialization
1. Supabase initialization must be centralized in a small, clearly defined foundation module set.
2. Initialization logic must not be duplicated across route handlers, pages, components, or feature files.
3. Feature modules must consume foundation-level initialization utilities rather than creating local clients ad hoc.
4. Keep initialization interfaces minimal and context-specific (server vs client).

## 6) Rules Against Scattered Ad Hoc Setup
1. Direct one-off Supabase client construction in random files is prohibited.
2. Copy-pasted setup snippets across features are prohibited.
3. Any new Supabase usage path must go through the established foundation layer.
4. If a new setup variant is needed, update the central foundation utilities instead of introducing local exceptions.

## 7) Maintainability Expectations
1. Keep the Supabase foundation layer small, explicit, and easy to audit.
2. Prefer straightforward initialization and configuration patterns over speculative abstractions.
3. Preserve clear ownership boundaries between infrastructure setup and feature/business code.
4. Ensure naming, module placement, and import usage remain consistent with project structure rules.
5. Expand foundation complexity only when validated MVP needs require it.

## 8) Intentionally Not Implemented at This Stage
The following are intentionally out of scope for this foundation document:
1. Authentication flow implementation details.
2. Profile bootstrap or automatic post-auth profile creation flows.
3. Advanced multi-tenant or organization-level Supabase patterns.
4. Complex infrastructure wrappers that are not required for MVP.
5. Non-essential abstraction layers around the Supabase client.

## 9) App Router Appropriateness Rules
1. Supabase usage patterns must align with App Router server-first architecture.
2. Server-rendered and route-handler contexts should remain first-class for data operations.
3. Client-side Supabase usage must be intentional, minimal, and limited to valid browser-driven needs.
4. Route and data-access boundaries must remain explicit when integrating Supabase in App Router flows.

## Enforcement
1. Any Supabase integration that bypasses these foundation rules is non-compliant.
2. If a required usage pattern is unclear, choose the safer and simpler approach and request clarification.
3. Security, maintainability, and consistency take priority over short-term convenience.
