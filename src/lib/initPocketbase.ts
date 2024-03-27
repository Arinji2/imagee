import PocketBase from "pocketbase";
export default async function initPocketbase() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_URL!);
  return pb;
}
