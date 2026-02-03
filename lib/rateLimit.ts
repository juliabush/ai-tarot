import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function rateLimit(ip: string) {
  const key = `rate:${ip}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 60 * 60 * 24);
  }

  return count <= 5;
}
