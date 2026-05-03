/**
 * يفرض خوادم DNS عامة قبل اتصال mongodb+srv (SRV lookup).
 * يمكن تجاوز القائمة عبر MONGO_DNS_SERVERS في .env مفصولة بفواصل.
 */
import dns from "node:dns";

export function configureDnsForMongo() {
  try {
    if (typeof dns.setDefaultResultOrder === "function") {
      dns.setDefaultResultOrder("ipv4first");
    }
  } catch {
    /* ignore */
  }

  const custom = process.env.MONGO_DNS_SERVERS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const servers =
    custom?.length > 0 ? custom : ["8.8.8.8", "8.8.4.4", "1.1.1.1", "1.0.0.1"];

  dns.setServers(servers);
  if (process.env.NODE_ENV !== "production") {
    console.log("[dns] resolvers:", dns.getServers().join(", "));
  }
}
