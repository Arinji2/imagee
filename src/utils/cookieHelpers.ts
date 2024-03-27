"use server";
import { cookies } from "next/headers";
export async function AppendCookie(key: string, value: string) {
  cookies().set(key, value);
}
export async function HasCookie(key: string) {
  return cookies().has(key);
}
export async function GetCookie(key: string) {
  return cookies().get(key)?.value;
}
