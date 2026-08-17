export const REQUEST_STATUSES = [
  "חדש",
  "קיבל הצעת מחיר",
  "סגר חבילה",
  "לא סגר חבילה",
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export type AirtableRequestRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  preferCall: boolean;
  status: RequestStatus;
  createdTime: string;
};

type AirtableConfig = {
  apiKey: string;
  baseId: string;
  tableName: string;
};

function getAirtableConfig(): AirtableConfig {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!apiKey || !baseId || !tableName) {
    throw new Error("Missing Airtable environment variables.");
  }

  return { apiKey, baseId, tableName };
}

function tableUrl(config: AirtableConfig, path = "") {
  return `https://api.airtable.com/v0/${config.baseId}/${encodeURIComponent(config.tableName)}${path}`;
}

type NewRequestInput = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  preferCall: boolean;
};

export async function createRequest(input: NewRequestInput): Promise<Response | null> {
  const config = getAirtableConfig();

  return fetch(tableUrl(config), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        Name: input.fullName,
        Email: input.email,
        Phone: input.phone,
        Message: input.message,
        "Prefer Call": input.preferCall,
        Status: "חדש" satisfies RequestStatus,
      },
    }),
  }).catch(() => null);
}

type AirtableRecord = {
  id: string;
  createdTime: string;
  fields: {
    Name?: string;
    Email?: string;
    Phone?: string;
    Message?: string;
    "Prefer Call"?: boolean;
    Status?: RequestStatus;
  };
};

function toRequestRecord(record: AirtableRecord): AirtableRequestRecord {
  return {
    id: record.id,
    fullName: record.fields.Name ?? "",
    email: record.fields.Email ?? "",
    phone: record.fields.Phone ?? "",
    message: record.fields.Message ?? "",
    preferCall: record.fields["Prefer Call"] ?? false,
    status: record.fields.Status ?? "חדש",
    createdTime: record.createdTime,
  };
}

export async function listRequests(): Promise<AirtableRequestRecord[]> {
  const config = getAirtableConfig();
  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const url = tableUrl(config, offset ? `?offset=${offset}` : "");
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${config.apiKey}` },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Airtable list request failed: ${response.status}`);
    }

    const data: { records: AirtableRecord[]; offset?: string } = await response.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records.map(toRequestRecord);
}

export async function updateRequestStatus(
  id: string,
  status: RequestStatus
): Promise<Response | null> {
  const config = getAirtableConfig();

  return fetch(tableUrl(config, `/${id}`), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: { Status: status } }),
  }).catch(() => null);
}
