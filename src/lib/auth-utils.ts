import { redirect } from 'next/navigation'

// Placeholder until NextAuth is configured in T-3
// Returns a dummy userId so the app compiles
export async function getCurrentUserId(): Promise<string> {
  // Will be replaced with real auth() call in T-3
  return 'placeholder-user-id'
}
