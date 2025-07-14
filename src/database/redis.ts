import chalk from "chalk";
import Redis from "ioredis";
const {green, redBright } = chalk

const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log(green("🧩 | Connected to ")+ redBright('Redis'));
});

redis.on("error", (err) => {
  // console.error("❌ | Redis error:", err);
});

export default redis
