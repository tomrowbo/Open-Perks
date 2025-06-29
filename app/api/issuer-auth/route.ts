import { NextResponse } from 'next/server';

export async function POST() {
  const issuerDid = process.env.NEXT_PUBLIC_ISSUER_DID;
  const apiKey = process.env.NEXT_PUBLIC_ISSUER_API_KEY;
  const apiUrl = "https://credential.api.sandbox.air3.com";

  if (!issuerDid || !apiKey) {
    return NextResponse.json({ error: 'Missing issuer credentials' }, { status: 500 });
  }

  try {
    const response = await fetch(`${apiUrl}/issuer/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        "X-Test": "true",
      },
      body: JSON.stringify({
        issuerDid: issuerDid,
        authToken: apiKey,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Upstream API error:', errorBody);
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.code === 80000000 && data.data && data.data.token) {
      return NextResponse.json({ token: data.data.token });
    } else {
      console.error("Failed to get issuer auth token from API:", data.msg || "Unknown error");
      return NextResponse.json({ error: "Failed to get issuer auth token" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching issuer auth token:", error);
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
