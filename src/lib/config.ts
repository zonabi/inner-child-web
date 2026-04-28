/**
 * Inner Child — Client Configuration
 *
 * Reads environment variables exposed via Next.js (NEXT_PUBLIC_ prefix).
 * Falls back to sensible defaults for local development.
 */

/** Base URL for the FastAPI backend (no trailing slash). */
export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_IC_API_URL ?? "http://localhost:8000";
