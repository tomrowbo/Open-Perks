import { NextResponse } from 'next/server';

export async function GET() {
  const accessToken = process.env.MONZO_ACCESS_TOKEN;
  const accountId = process.env.MONZO_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    return NextResponse.json({ error: 'Missing Monzo credentials' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.monzo.com/transactions?account_id=${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Monzo API error:', await response.text());
      return NextResponse.json({ error: 'Failed to fetch Monzo transactions' }, { status: response.status });
    }

    const data = await response.json();
    const totalSpent = data.transactions
      .filter((tx: any) => tx.amount < 0 && !tx.merchant?.name.includes('Pot'))
      .reduce((sum: number, tx: any) => sum + Math.abs(tx.amount), 0) / 100;

    return NextResponse.json({ totalSpent });

  } catch (error) {
    console.error('Error fetching Monzo transactions:', error);
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
