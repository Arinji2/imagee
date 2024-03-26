export async function GET() {
  const imageUrl =
    "https://db-imagee.arinji.com/api/files/wj5zb3eupeq5t2l/5fqxcd2p9a8cxbd/wat_G6Rz9CscFj.png";
  const data = await fetch(imageUrl, { cache: "no-cache" });
  return new Response(data.body);
}
