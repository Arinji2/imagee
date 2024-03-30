"use client";
import initPocketbase from "@/lib/initPocketbase";
import Button from "@/primatives/button";
import { ButtonText } from "@/primatives/typography";
import { AppendCookie } from "@/utils/cookieHelpers";
import { SiDiscord, SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function GoogleButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        const pb = await initPocketbase();
        pb.authStore.clear();
        const authData = await pb
          .collection("users")
          .authWithOAuth2({ provider: "google" });

        await AppendCookie("token", authData.token, {
          expires: new Date(authData.meta!.expiry),
          secure: true,
          sameSite: "strict",
          httpOnly: true,
        });
        const userData = pb.authStore.model;
        if (userData?.displayName === "") {
          router.push("/auth/onboarding");
        }

        setLoading(false);
        router.push("/dashboard");
      }}
      className="flex w-full xl:w-[600px] overflow-hidden relative flex-row items-center justify-between bg-palette-accent"
    >
      <div
        className={`${
          loading ? "translate-y-0 " : "-translate-y-full "
        }w-full h-full absolute top-0 left-0 transition-transform ease-in-out duration-300 bg-palette-secondary flex flex-col items-center justify-center`}
      >
        <Loader2 className="xl:size-10 size-5 text-palette-text animate-spin" />
      </div>
      <ButtonText className="  text-palette-text">Login with Google</ButtonText>
      <SiGoogle color="#292925" className="xl:size-10 size-5" />
    </Button>
  );
}

export function DiscordButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        const pb = await initPocketbase();
        pb.authStore.clear();
        const authData = await pb
          .collection("users")
          .authWithOAuth2({ provider: "discord" });
        await AppendCookie("token", authData.token, {
          expires: new Date(authData.meta!.expiry),
          secure: true,
          sameSite: "strict",
          httpOnly: true,
        });
        const userData = pb.authStore.model;
        if (userData?.displayName === "") {
          router.push("/auth/onboarding");
        }

        setLoading(false);
        router.push("/dashboard");
      }}
      className="flex w-full xl:w-[600px] overflow-hidden relative flex-row items-center justify-between bg-palette-accent"
    >
      <div
        className={`${
          loading ? "translate-y-0 " : "-translate-y-full "
        }w-full h-full absolute top-0 left-0 transition-transform ease-in-out duration-300 bg-palette-secondary flex flex-col items-center justify-center`}
      >
        <Loader2 className="xl:size-10 size-5 text-palette-text animate-spin" />
      </div>
      <ButtonText className="  text-palette-text">
        Login with Discord
      </ButtonText>
      <SiDiscord color="#292925" className="xl:size-10 size-5" />
    </Button>
  );
}

export function GithubButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        const pb = await initPocketbase();
        pb.authStore.clear();
        const authData = await pb
          .collection("users")
          .authWithOAuth2({ provider: "github" });

        await AppendCookie("token", authData.token, {
          expires: new Date(authData.meta!.expiry),
          secure: true,
          sameSite: "strict",
          httpOnly: true,
        });
        const userData = pb.authStore.model;
        if (userData?.displayName === "") {
          router.push("/auth/onboarding");
        }

        setLoading(false);
        router.push("/dashboard");
      }}
      className="flex w-full xl:w-[600px] overflow-hidden relative flex-row items-center justify-between bg-palette-accent"
    >
      <div
        className={`${
          loading ? "translate-y-0 " : "-translate-y-full "
        }w-full h-full absolute top-0 left-0 transition-transform ease-in-out duration-300 bg-palette-secondary flex flex-col items-center justify-center`}
      >
        <Loader2 className="xl:size-10 size-5 text-palette-text animate-spin" />
      </div>
      <ButtonText className="  text-palette-text">Login with Github</ButtonText>
      <SiGithub color="#292925" className="xl:size-10 size-5" />
    </Button>
  );
}
