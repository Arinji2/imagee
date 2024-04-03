import initPocketbase from "@/lib/initPocketbase";
import { H1 } from "@/primatives/typography";
import { EmojiSchemaType } from "@/validations/types";
import WidthWrapper from "@/wrappers/widthWrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import dynamic from "next/dynamic";

import { Emojis } from "./emojis";
import { ManageLoading } from "./manage";
const DynamicManage = dynamic(() => import("./manage"), {
  ssr: false,
  loading: () => <ManageLoading />,
});
export default async function Page({
  searchParams,
}: {
  searchParams: {
    search_name: string | string[] | undefined;
    search_link: string | string[] | undefined;
    sort: string | string[] | undefined;
  };
}) {
  const pb = await initPocketbase();
  const token = cookies().get("token");

  const searchName =
    searchParams.search_name !== undefined &&
    !Array.isArray(searchParams.search_name);

  const searchLink =
    searchParams.search_link !== undefined &&
    !Array.isArray(searchParams.search_link);

  const toSort =
    searchParams.sort !== undefined &&
    (searchParams.sort === "prefixed" || searchParams.sort === "unprefixed");

  if (!token) redirect("/auth");
  pb.authStore.save(token.value);
  await pb.collection("users").authRefresh();

  const emojis = (await pb.collection("emojis").getFullList({
    filter: `owner = "${pb.authStore.model!.id}" ${
      searchName ? ` && displayName ~ "${searchParams.search_name}"` : ""
    } ${searchLink ? ` && url ~ "${searchParams.search_link}"` : ""}`,
  })) as (EmojiSchemaType & { id: string })[];

  let finalEmojis = emojis;
  if (toSort) {
    if (searchParams.sort === "prefixed")
      finalEmojis = emojis.filter((emoji) => emoji.prefixed);
    if (searchParams.sort === "unprefixed")
      finalEmojis = emojis.filter((emoji) => !emoji.prefixed);
  }

  return (
    <div className="w-full h-fit min-h-[100svh] flex flex-col items-start justify-start bg-palette-primary py-3">
      <WidthWrapper>
        <div className="w-full h-fit flex flex-col items-start justify-start gap-10">
          <div className="bg-palette-accent border-neo-brutalist shadow-neo-brutalist border-black shadow-black p-4 w-full h-fit flex flex-col items-center justify-center">
            <H1 className="text-palette-text ">DASHBOARD</H1>
          </div>
          <div className="w-full h-fit relative  flex flex-col md:flex-row items-center md:items-stretch justify-start gap-10">
            <DynamicManage />

            <Emojis
              username={pb.authStore.model!.displayName}
              emojis={finalEmojis}
            />
          </div>
        </div>
      </WidthWrapper>
    </div>
  );
}
