# Authentication — Shape

## Data Model Changes

### New Models
- User: id, name, email (unique), emailVerified, image, password (nullable), createdAt, updatedAt
- Account: Auth.js standard (provider, providerAccountId, tokens)

### Modified Models
- Expense: add userId (FK to User), @@index([userId])
- Category: add userId (FK to User), change @unique(name) to @@unique([name, userId])

## API Surface
- POST /api/auth/[...nextauth] — NextAuth route handler
- Server actions: signUp, signInWithCredentials, signOutAction

## Frontend Changes
- src/app/(auth)/ — New route group for sign-in/sign-up (no sidebar)
- src/features/auth/ — Auth feature module
- src/middleware.ts — Route protection
- All dashboard queries + actions updated with userId filtering

## Dependencies
- next-auth@beta, @auth/prisma-adapter, bcryptjs
- Google OAuth credentials (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
