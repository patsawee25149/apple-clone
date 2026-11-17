import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { User } from "@/app/types/user";

const USERS_DB = path.join(process.cwd(), "data", "users.json");

function readUsers(): User[] {
  const raw = fs.readFileSync(USERS_DB, "utf-8");
  return JSON.parse(raw || "[]");
}
function writeUsers(users: User[]) {
  fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2), "utf-8");
}

async function getUserFromRequest(request: NextRequest) {
  const origin = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${origin}/api/auth/me`, {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.user as User | null;
}

export async function GET(request: NextRequest) {
  const sessionUser = await getUserFromRequest(request);
  if (!sessionUser?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = readUsers();
  const me = users.find((u) => u.email === sessionUser.email);
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ wishlist: me.wishlist ?? [] });
}

export async function POST(request: NextRequest) {
  const sessionUser = await getUserFromRequest(request);
  if (!sessionUser?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.id !== "number" || !["add", "remove"].includes(body.action)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const users = readUsers();
  const idx = users.findIndex((u) => u.email === sessionUser.email);
  if (idx === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const current = users[idx].wishlist ?? [];
  if (body.action === "add" && !current.includes(body.id)) current.push(body.id);
  if (body.action === "remove") users[idx].wishlist = current.filter((x) => x !== body.id);
  else users[idx].wishlist = current;

  writeUsers(users);
  return NextResponse.json({ wishlist: users[idx].wishlist });
}