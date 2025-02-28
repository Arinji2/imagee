"use server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
export async function AppendCookie(
  key: string,
  value: string,
  options?: Partial<ResponseCookie>
) {
  cookies().set(key, value, options);
}
export async function HasCookie(key: string) {
  return cookies().has(key);
}
export async function GetCookie(key: string) {
  return cookies().get(key)?.value;
}
