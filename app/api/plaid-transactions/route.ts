import { NextRequest, NextResponse } from 'next/server';
import { PlaidApi, Configuration, PlaidEnvironments, Products, CountryCode } from 'plaid';

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export async function POST(req: NextRequest) {
  const { action, public_token } = await req.json();

  if (action === 'create_link_token') {
    try {
      const response = await plaidClient.linkTokenCreate({
        user: {
          client_user_id: 'user-id',
        },
        client_name: 'ZkTap',
        products: [Products.Transactions],
        country_codes: [CountryCode.Us],
        language: 'en',
      });
      return NextResponse.json(response.data);
    } catch (error) {
      console.error('Error creating link token:', error);
      return NextResponse.json({ error: 'Failed to create link token' }, { status: 500 });
    }
  }

  if (action === 'exchange_public_token') {
    try {
      const response = await plaidClient.itemPublicTokenExchange({
        public_token: public_token,
      });
      // Store the access_token and item_id in your database
      const { access_token, item_id } = response.data;
      return NextResponse.json({ access_token, item_id });
    } catch (error) {
      console.error('Error exchanging public token:', error);
      return NextResponse.json({ error: 'Failed to exchange public token' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get('access_token');

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token is required' }, { status: 400 });
  }

  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 90);

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}
