import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imagee",
  description:
    "When your Discord Nitro ends before your addiction to use custom emojis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <main>
          <Toaster
            toastOptions={{
              position: "top-right",
              style: {
                boxShadow: "8px 8px 0 0 #000000",
                borderRadius: "5px",
                borderWidth: "4px",
                borderColor: "#000000",
              },
            }}
          />

          {children}
        </main>
      </body>
    </html>
  );
}
