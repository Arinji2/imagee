"use client";

import UpdateDisplayNameAction from "@/actions/UpdateDisplayNameAction";
import Button from "@/primatives/button";
import { P } from "@/primatives/typography";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Input() {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <input
        type="text"
        placeholder="Display Name..."
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full h-[50px] bg-palette-primary  border-neo-brutalist border-black rounded-neo-brutalist shadow-neo-brutalist shadow-black outline-0 px-3 text-white placeholder-white"
      />
      <Button
        onClick={async () => {
          if (displayName.length < 3) {
            toast.error("Display Name must be at least 3 characters long");
            return;
          }
          setLoading(true);
          const res = await UpdateDisplayNameAction(displayName);
          if (res.type === "error") {
            toast.error(res.message);
          } else {
            toast.success(res.message);
            router.push("/dashboard");
          }

          setLoading(false);
        }}
        className="xl:w-full hover:bg-palette-accent mt-auto flex flex-row items-center justify-center gap-2"
      >
        <P className="text-palette-text font-bold ">CONTINUE</P>
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin text-palette-text"></Loader2>
        )}
      </Button>
    </>
  );
}
