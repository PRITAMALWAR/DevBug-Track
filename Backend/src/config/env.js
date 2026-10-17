
import { autoKey } from "autokey-env";

const config = autoKey({
  required: [
    "DATABASE_URL",
    "JWT_SECRET",
    "CLIENT_URL",
  ],
});

export const env = {
  PORT: Number(config.get("PORT") || 5000),
  NODE_ENV: config.get("NODE_ENV") || "development",
  CLIENT_URL: config.get("CLIENT_URL"),
  DATABASE_URL: config.get("DATABASE_URL"),
  JWT_SECRET: config.get("JWT_SECRET"),
};

if (!Number.isInteger(env.PORT) || env.PORT < 1 || env.PORT > 65535) {
  throw new Error("PORT must be a valid TCP port");
}

if (
  env.NODE_ENV === "production" &&
  env.JWT_SECRET.length < 32
) {
  throw new Error("JWT_SECRET must be at least 32 characters in production");
}
