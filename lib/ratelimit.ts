import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit"; 


const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
  analytics: true,
  
  prefix: "@upstash/ratelimit",
});

export default ratelimit
//3:6:46
