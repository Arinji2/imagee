"use client";

import { H4 } from "@/primatives/typography";
import { Loader2, PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function Manage() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const [isLoadingName, startTransitionName] = useTransition();
  const [isLoadingLink, startTransitionLink] = useTransition();

  const pathname = usePathname();
  return (
    <div className="h-auto w-full md:sticky top-5 z-50 md:min-h-[550px] md:max-h-[550px] pb-2 flex gap-3 flex-col md:max-w-[250px] items-stretch transition-transform ease-in-out duration-300">
      <Link
        href="/dashboard/create"
        className="w-full md:w-[250px]  h-[100px] md:h-[20%] p-3 flex flex-col gap-3  items-center justify-center bg-palette-bg rounded-neo-brutalist border-neo-brutalist hover:shadow-neo-brutalist-hover transition-shadow ease-in-out duration-300 shadow-neo-brutalist shadow-black border-black"
      >
        <H4 className="text-palette-text font-bold xl:text-[20px] text-center">
          Create New Link
        </H4>
        <PlusCircle className="size-[20px] md:size-[40px] text-palette-text" />
      </Link>
      <div className="w-full h-auto min-h-[100px] md:h-[80%] flex flex-col items-start justify-start p-2 gap-4 bg-palette-bg mt-auto rounded-neo-brutalist border-neo-brutalist border-black shadow-neo-brutalist">
        <div className="w-full h-fit flex flex-col items-center justify-center gap-2">
          <H4 className="text-palette-text font-bold">Search Tool</H4>
          <div className="w-full h-fit flex flex-row items-end justify-start gap-2">
            <input
              type="text"
              placeholder="Search by name..."
              onChange={(e) => {
                params.delete("search_link");
                params.set("search_name", e.target.value);
                window.history.pushState(null, "", `?${params.toString()}`);
              }}
              className="w-full h-[40px] bg-palette-bg text-palette-text border-neo-brutalist border-black rounded-neo-brutalist p-2"
            />
            <button
              onClick={() => {
                startTransitionName(() => {
                  router.replace(`${pathname}?${params.toString()}`);
                });
              }}
              className="size-[40px] shrink-0 bg-palette-accent border-neo-brutalist border-black flex flex-col items-center justify-center rounded-neo-brutalist"
            >
              {isLoadingName ? (
                <Loader2
                  strokeWidth={3}
                  className="size-[20px] text-palette-text animate-spin"
                />
              ) : (
                <Search
                  strokeWidth={3}
                  className="size-[20px] text-palette-text"
                />
              )}
            </button>
          </div>
          <div className="w-full h-fit flex flex-row items-end justify-start gap-2">
            <input
              type="text"
              placeholder="Search by URL..."
              onChange={(e) => {
                params.delete("search_name");
                params.set("search_link", e.target.value);
                window.history.pushState(null, "", `?${params.toString()}`);
              }}
              className="w-full h-[40px] bg-palette-bg text-palette-text border-neo-brutalist border-black rounded-neo-brutalist p-2"
            />
            <button
              onClick={() => {
                startTransitionLink(() => {
                  router.replace(`${pathname}?${params.toString()}`);
                });
              }}
              className="size-[40px] shrink-0 bg-palette-accent border-neo-brutalist border-black flex flex-col items-center justify-center rounded-neo-brutalist"
            >
              {isLoadingLink ? (
                <Loader2
                  strokeWidth={3}
                  className="size-[20px] text-palette-text animate-spin"
                />
              ) : (
                <Search
                  strokeWidth={3}
                  className="size-[20px] text-palette-text"
                />
              )}
            </button>
          </div>
          <button
            onClick={() => {
              params.delete("search_name");
              params.delete("search_link");
              router.replace(`${pathname}?${params.toString()}`);
            }}
            className="w-full h-[40px] bg-red-400 border-neo-brutalist border-black rounded-neo-brutalist shadow-neo-brutalist-hover  text-palette-text font-bold"
          >
            Clear Search
          </button>
        </div>
        <div className="w-full h-fit flex flex-col items-center justify-center gap-2">
          <H4 className="text-palette-text font-bold">Filter Tool</H4>
          <div className="w-full h-fit flex flex-col items-center justify-start gap-2">
            <button
              onClick={() => {
                params.set("sort", "prefixed");
                router.replace(`${pathname}?${params.toString()}`);
              }}
              className="w-full h-[40px] bg-palette-secondary border-neo-brutalist border-black rounded-neo-brutalist shadow-neo-brutalist-hover  text-palette-text font-bold"
            >
              Prefixed
            </button>
            <button
              onClick={() => {
                params.set("sort", "unprefixed");
                router.replace(`${pathname}?${params.toString()}`);
              }}
              className="w-full h-[40px] bg-palette-secondary border-neo-brutalist border-black rounded-neo-brutalist shadow-neo-brutalist-hover  text-palette-text font-bold"
            >
              Non Prefixed
            </button>
            <button
              onClick={() => {
                params.delete("sort");
                router.replace(`${pathname}?${params.toString()}`);
              }}
              className="w-full h-[40px] bg-red-400 border-neo-brutalist border-black rounded-neo-brutalist shadow-neo-brutalist-hover  text-palette-text font-bold"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ManageLoading() {
  return (
    <div className="h-auto w-full md:sticky top-5 z-50 md:min-h-[550px] md:max-h-[550px] pb-2 flex gap-3 flex-col md:max-w-[250px] items-stretch transition-transform ease-in-out duration-300">
      <Link
        href="/dashboard/create"
        className="w-full md:w-[250px]  h-[100px] md:h-[20%] p-3 flex flex-col gap-3 items-center justify-center bg-palette-bg rounded-neo-brutalist border-neo-brutalist hover:shadow-neo-brutalist-hover transition-shadow ease-in-out duration-300 shadow-neo-brutalist shadow-black border-black"
      >
        <H4 className="text-palette-text font-bold text-center xl:text-[20px]">
          Create New Link
        </H4>
        <PlusCircle className="size-[20px] md:size-[40px] text-palette-text" />
      </Link>
      <div className="w-full h-auto min-h-[100px] md:h-[80%] flex flex-col items-start justify-start p-2 gap-4 bg-palette-bg mt-auto rounded-neo-brutalist border-neo-brutalist border-black shadow-neo-brutalist">
        <div className="w-full h-fit flex flex-col items-center justify-center gap-2">
          <H4 className="text-palette-text font-bold">Search Tool</H4>
          <div className="w-full h-fit flex flex-row items-end justify-start gap-2">
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full h-[40px] bg-palette-bg text-palette-text border-neo-brutalist border-black rounded-neo-brutalist p-2"
            />
            <div className="size-[40px] shrink-0 bg-palette-accent border-neo-brutalist border-black flex flex-col items-center justify-center rounded-neo-brutalist">
              <Search
                strokeWidth={3}
                className="size-[20px] text-palette-text"
              />
            </div>
          </div>
          <div className="w-full h-fit flex flex-row items-end justify-start gap-2">
            <input
              type="text"
              placeholder="Search by URL..."
              className="w-full h-[40px] bg-palette-bg text-palette-text border-neo-brutalist border-black rounded-neo-brutalist p-2"
            />
            <div className="size-[40px] shrink-0 bg-palette-accent border-neo-brutalist border-black flex flex-col items-center justify-center rounded-neo-brutalist">
              <Search
                strokeWidth={3}
                className="size-[20px] text-palette-text"
              />
            </div>
          </div>
          <button className="w-full h-[40px] bg-red-400 border-neo-brutalist border-black rounded-neo-brutalist shadow-neo-brutalist-hover  text-palette-text font-bold">
            Clear Search
          </button>
        </div>
        <div className="w-full h-fit flex flex-col items-center justify-center gap-2">
          <H4 className="text-palette-text font-bold">Filter Tool</H4>
          <div className="w-full h-fit flex flex-col items-center justify-start gap-2">
            <button className="w-full h-[40px] bg-palette-secondary border-neo-brutalist border-black rounded-neo-brutalist shadow-neo-brutalist-hover hover:shadow-neo-brutalist text-palette-text font-bold">
              Prefixed
            </button>
            <button className="w-full h-[40px] bg-palette-secondary border-neo-brutalist border-black rounded-neo-brutalist shadow-neo-brutalist-hover hover:shadow-neo-brutalist text-palette-text font-bold">
              Non Prefixed
            </button>
            <button className="w-full h-[40px] bg-red-400 border-neo-brutalist border-black rounded-neo-brutalist shadow-neo-brutalist-hover  text-palette-text font-bold">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
