import initPocketbase from "@/lib/initPocketbase";
import { H1, H3 } from "@/primatives/typography";
import WidthWrapper from "@/wrappers/widthWrapper";
import { PlusCircle } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

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
    <div className="w-full h-fit min-h-[100svh] flex flex-col items-start justify-start bg-palette-primary py-3">
      <WidthWrapper>
        <div className="w-full h-fit flex flex-col items-start justify-start gap-10">
          <div className="bg-palette-accent border-neo-brutalist shadow-neo-brutalist border-black shadow-black p-4 w-full h-fit flex flex-col items-center justify-center">
            <H1 className="text-palette-text ">DASHBOARD</H1>
          </div>
          <div className="w-full h-fit flex flex-row items-center justify-start gap-10">
            <Link
              href="/dashboard/create"
              className="w-full md:w-[250px] h-[300px] md:h-[400px] p-3 flex flex-col gap-6 items-center justify-center bg-palette-bg rounded-neo-brutalist border-neo-brutalist hover:shadow-neo-brutalist-hover transition-shadow ease-in-out duration-300 shadow-neo-brutalist shadow-black border-black"
            >
              <H3 className="text-palette-text text-center">Create New Link</H3>
              <PlusCircle className="size-20 text-palette-text" />
            </Link>
          </div>
        </div>
      </WidthWrapper>
    </div>
  );
}
