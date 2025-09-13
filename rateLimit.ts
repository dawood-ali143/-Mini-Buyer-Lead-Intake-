const rateMap = new Map<string, { count: number; timestamp: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 10;

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || now - entry.timestamp > WINDOW_MS) {
    rateMap.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) return false;

  entry.count += 1;
  return true;
}
