import initPocketbase from "@/lib/initPocketbase";
import { notFound } from "next/navigation";
import sharp from "sharp";

export async function GET({
  params,
}: {
  params: { imgURL: string; img: string };
}) {
  const pb = await initPocketbase();

  try {
    const image = await pb
      .collection("emojis")
      .getFirstListItem(
        `url="${params.img}" && owner.displayName="${params.imgURL}" && prefixed=true`
      );

    const url = `https://db-imagee.arinji.com/api/files/emojis/${image.id}/${image.emoji}?`;

    const fetchedImage = await fetch(url, { cache: "force-cache" });
    const buffer = await fetchedImage.arrayBuffer();
    const resizedImage = await sharp(buffer)
      .resize(48, 48, { fit: "contain" })
      .toBuffer();
    return new Response(resizedImage, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    notFound();
  }
}
