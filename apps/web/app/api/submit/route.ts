import { NextResponse } from "next/server";

import { createRequest } from "@repo/core/airtable";
import { getClientIp, isRateLimited } from "@repo/core/rate-limit";
import { landingFormSchema } from "@/lib/validation";

const SUBMIT_LIMIT = 5;
const SUBMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(request: Request) {
  if (isRateLimited(`submit:${getClientIp(request)}`, SUBMIT_LIMIT, SUBMIT_WINDOW_MS)) {
    return NextResponse.json(
      { error: "יותר מדי פניות בזמן קצר. נסו שוב בעוד כמה דקות." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "הבקשה אינה תקינה." }, { status: 400 });
  }

  const parsed = landingFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "הנתונים שנשלחו אינם תקינים." },
      { status: 400 }
    );
  }

  let airtableResponse: Response | null;
  try {
    airtableResponse = await createRequest(parsed.data);
  } catch (error) {
    console.error("Missing Airtable environment variables.", error);
    return NextResponse.json(
      { error: "השרת אינו מוגדר לקבל פניות כרגע." },
      { status: 500 }
    );
  }

  if (!airtableResponse) {
    return NextResponse.json(
      { error: "לא הצלחנו להתחבר לשרת. נסו שוב." },
      { status: 502 }
    );
  }

  if (!airtableResponse.ok) {
    const errorBody = await airtableResponse.json().catch(() => null);
    console.error("Airtable submission failed:", airtableResponse.status, errorBody);
    return NextResponse.json(
      { error: "אירעה שגיאה בשמירת הפנייה. נסו שוב." },
      { status: 502 } // upstream failure — never leak Airtable's own status to the client
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
