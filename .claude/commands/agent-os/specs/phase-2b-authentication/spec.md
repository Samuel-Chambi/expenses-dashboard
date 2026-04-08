# Authentication — Spec

## Context

Phase 2b. App has no user accounts — all data is global. This adds NextAuth.js v5 with email/password + Google OAuth, per-user data isolation, and auth pages. SaaS-ready architecture.

## Tasks

- [x] T-1: Save spec documentation
- [x] T-2: Prisma schema migration + install packages
- [x] T-3: NextAuth.js v5 setup + middleware
- [x] T-4: Auth pages (sign-in, sign-up)
- [ ] T-5: Per-user data isolation
- [ ] T-6: Sidebar user data + sign-out + seed update

## What Will Be Built

- **Models:** User, Account (Auth.js standard)
- **Schema Changes:** userId on Expense + Category, compound unique on Category [name, userId]
- **Auth Config:** NextAuth.js v5 with Credentials + Google providers, JWT sessions
- **Pages:** /sign-in, /sign-up (centered card layout, no sidebar)
- **Components:** SignInForm, SignUpForm, OAuthButtons, PasswordInput
- **Middleware:** Protect all dashboard routes, redirect to /sign-in
- **Server Actions:** signUp, signInWithCredentials, signOutAction
- **Helper:** getCurrentUserId() utility

## Acceptance Criteria

- Unauthenticated users redirected to /sign-in
- Can sign up with email/password, auto-redirected to dashboard
- Can sign in with existing credentials
- Google OAuth sign-in works (when credentials configured)
- Each user sees only their own expenses and categories
- CRUD operations scoped to current user
- Sidebar shows real user name/email
- Sign-out works and redirects to /sign-in
- Seed creates test user (test@example.com / password123)
