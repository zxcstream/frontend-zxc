import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.API_SECRET || "supersecret123";

function validateFrontendToken(f_token: string, id: string, ts: number) {
  const expected = crypto
    .createHash("sha256")
    .update(`${id}:${ts}`)
    .digest("hex");
  return expected === f_token && Date.now() - ts < 5000;
}

function generateBackendToken(f_token: string, id: string) {
  const ts = Date.now();
  const token = crypto
    .createHmac("sha256", SECRET)
    .update(`${id}:${f_token}:${ts}`)
    .digest("hex");
  return { token, ts };
}

export async function POST(req: NextRequest) {
  const { id, f_token, ts } = await req.json();

  if (!validateFrontendToken(f_token, id, ts)) {
    return NextResponse.json(
      { error: "Invalid frontend token" },
      { status: 403 }
    );
  }

  const b_token = generateBackendToken(f_token, id);
  return NextResponse.json(b_token);
}
