import { NextResponse } from "next/server";

import { landingFormSchema } from "@/lib/validation";

export async function POST(request: Request) {
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

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!apiKey || !baseId || !tableName) {
    console.error("Missing Airtable environment variables.");
    return NextResponse.json(
      { error: "השרת אינו מוגדר לקבל פניות כרגע." },
      { status: 500 }
    );
  }

  const { fullName, email, phone, message, preferCall } = parsed.data;

  const airtableResponse = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: fullName,
          Email: email,
          Phone: phone,
          Message: message,
          "Prefer Call": preferCall,
          Status: "חדש",
        },
      }),
    }
  ).catch(() => null);

  if (!airtableResponse) {
    return NextResponse.json(
      { error: "לא הצלחנו להתחבר לשרת. נסו שוב." },
      { status: 502 }
    );
  }

  if (!airtableResponse.ok) {
    const errorBody = await airtableResponse.json().catch(() => null);
    console.error("Airtable submission failed:", errorBody);
    return NextResponse.json(
      { error: "אירעה שגיאה בשמירת הפנייה. נסו שוב." },
      { status: airtableResponse.status }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
