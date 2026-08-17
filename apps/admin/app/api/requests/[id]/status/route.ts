import { NextResponse } from "next/server";
import { z } from "zod";

import { REQUEST_STATUSES, updateRequestStatus } from "@repo/core/airtable";

const bodySchema = z.object({
  status: z.enum(REQUEST_STATUSES),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "סטטוס לא תקין." }, { status: 400 });
  }

  let airtableResponse: Response | null;
  try {
    airtableResponse = await updateRequestStatus(id, parsed.data.status);
  } catch (error) {
    console.error("Missing Airtable environment variables.", error);
    return NextResponse.json({ error: "השרת אינו מוגדר כראוי." }, { status: 500 });
  }

  if (!airtableResponse) {
    return NextResponse.json({ error: "לא הצלחנו להתחבר לשרת. נסו שוב." }, { status: 502 });
  }

  if (!airtableResponse.ok) {
    const errorBody = await airtableResponse.json().catch(() => null);
    console.error("Airtable status update failed:", errorBody);
    return NextResponse.json(
      { error: "עדכון הסטטוס נכשל. נסו שוב." },
      { status: airtableResponse.status }
    );
  }

  return NextResponse.json({ ok: true });
}
