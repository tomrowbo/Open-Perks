import { NextResponse } from 'next/server';

export async function POST() {
  const verifierDid = process.env.NEXT_PUBLIC_VERIFIER_DID;
  const apiKey = process.env.NEXT_PUBLIC_VERIFIER_API_KEY;
  const apiUrl = "https://credential.api.sandbox.air3.com";

  if (!verifierDid || !apiKey) {
    return NextResponse.json({ error: 'Missing verifier credentials' }, { status: 500 });
  }

  try {
    const response = await fetch(`${apiUrl}/verifier/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        "X-Test": "true",
      },
      body: JSON.stringify({
        verifierDid: verifierDid,
        authToken: apiKey,
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.code === 80000000 && data.data && data.data.token) {
      return NextResponse.json({ token: data.data.token });
    } else {
      console.error("Failed to get verifier auth token from API:", data.msg || "Unknown error");
      return NextResponse.json({ error: "Failed to get verifier auth token" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching verifier auth token:", error);
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
