import initPocketbase from "@/lib/initPocketbase";
import { H1 } from "@/primatives/typography";
import WidthWrapper from "@/wrappers/widthWrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Client from "./client";

export default async function Page() {
  const pb = await initPocketbase();
  const token = cookies().get("token");
  if (!token) redirect("/auth");
  pb.authStore.save(token.value);
  await pb.collection("users").authRefresh();
  const emojis = await pb.collection("emojis").getFullList({
    filter: `owner = "${pb.authStore.model!.id}"`,
  });

  return (
    <div className="w-full h-fit xl:h-[100svh] flex flex-col items-stretch justify-start bg-palette-primary">
      <WidthWrapper>
        <div className="w-full py-3 h-fit max-w-[900px] flex flex-col items-stretch justify-start gap-10">
          <div className="bg-palette-accent border-neo-brutalist shadow-neo-brutalist border-black shadow-black p-4 w-full h-fit flex flex-col items-center justify-center">
            <H1 className="text-palette-text ">CREATE</H1>
          </div>
          <Client isNew={emojis.length === 0} />
        </div>
      </WidthWrapper>
    </div>
  );
}
