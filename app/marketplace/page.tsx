'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlane, FaWalking, FaDollarSign, FaHeartbeat, FaTv, FaBook, FaShoppingCart, FaUtensils, FaHome } from 'react-icons/fa';
import { MdApps } from 'react-icons/md';
import { useAirService } from '@/app/contexts/AirServiceProvider';
import { AirCredentialWidget, type QueryRequest, type Language } from "@mocanetwork/air-credential-sdk";
import "@mocanetwork/air-credential-sdk/dist/style.css";
import { BUILD_ENV } from '@mocanetwork/airkit';

interface RewardCardProps {
  logo: string;
  name: string;
  category: string;
  offer: string;
}

const categories = [
  { label: 'All Categories', icon: <MdApps /> },
  { label: 'Travel', icon: <FaPlane /> },
  { label: 'Life and Mobility', icon: <FaWalking /> },
  { label: 'Finance and Crypto', icon: <FaDollarSign /> },
  { label: 'Health and Wellness', icon: <FaHeartbeat /> },
  { label: 'Entertainment', icon: <FaTv /> },
  { label: 'Learning and Development', icon: <FaBook /> },
  { label: 'Shopping and Retail', icon: <FaShoppingCart /> },
  { label: 'Food and Dining', icon: <FaUtensils /> },
  { label: 'Home and Living', icon: <FaHome /> },
];

const mockRewards: RewardCardProps[] = [
  { logo: '/images/aavia.png', name: 'Aavia', category: 'Health and Wellness', offer: 'Spend $50 on competitor health apps in the last 30 days, get 20% off your first year.' },
  { logo: '/images/airalo.png', name: 'Airalo', category: 'Travel', offer: 'Spend $20 on international roaming in the last week, get 10% off your first eSIM.' },
  { logo: '/images/airtm.jpg', name: 'Airtm', category: 'Finance and Crypto', offer: 'Trade $100 in crypto on other platforms in the last 90 days, earn $5 bonus on your first exchange.' },
  { logo: '/images/akiflow.jpg', name: 'Akiflow', category: 'Learning and Development', offer: 'Spend $30 on productivity tools in the last month, get 3 months free on premium plan.' },
  { logo: '/images/alosim.jpeg', name: 'AloSIM', category: 'Travel', offer: 'Spend $15 on travel data in the last week, get Free 1GB data for new users.' },
  { logo: '/images/alcovita.jpg', name: 'Alcovita', category: 'Health and Wellness', offer: 'Spend $40 on health supplements in the last 30 days, get 15% off all Alcovita products.' },
  { logo: '/images/americanexpress.png', name: 'American Express', category: 'Finance and Crypto', offer: 'Spend more than $1 on any card in the last 90 days, get $10 when signing up.' },
  { logo: '/images/anyplace.webp', name: 'Anyplace', category: 'Travel', offer: 'Spend $200 on short-term rentals in the last 90 days, save $50 on your next long-term stay.' },
  { logo: '/images/avisandbudget.png', name: 'Avis & Budget', category: 'Travel', offer: 'Spend $100 on ride-sharing in the last month, get up to 25% off car rentals.' },
  { logo: '', name: 'BetterHelp', category: 'Health and Wellness', offer: 'Spend $50 on mental wellness apps in the last 30 days, get your first month free.' },
  { logo: '', name: 'Better Speech', category: 'Health and Wellness', offer: 'Spend $30 on communication courses in the last month, get 10% off your first therapy session.' },
  { logo: '', name: 'Bilingval', category: 'Learning and Development', offer: 'Spend $20 on language learning apps in the last 90 days, get 2 months free on annual subscription.' },
  { logo: '', name: 'Boldvoice', category: 'Learning and Development', offer: 'Spend $25 on public speaking courses in the last month, unlock premium features for 3 months.' },
  { logo: '', name: 'Starbucks', category: 'Food and Dining', offer: 'Spend $100 at competitor coffee shops in the last 30 days, get $10 off your next order.' },
  { logo: '', name: `Dunkin'`, category: 'Food and Dining', offer: 'Spend $50 at competitor donut shops in the last week, get a free coffee with any purchase.' },
  { logo: '', name: 'Netflix', category: 'Entertainment', offer: 'Spend $20 on streaming services in the last month, get 3 months free on premium plan.' },
  { logo: '', name: 'Spotify', category: 'Entertainment', offer: 'Spend $15 on music streaming in the last week, get 6 months free for premium family plan.' },
  { logo: '', name: 'Amazon', category: 'Shopping and Retail', offer: 'Spend $100 at other online retailers in the last 90 days, get 10% off your next Amazon purchase over $50.' },
  { logo: '', name: 'Nike', category: 'Shopping and Retail', offer: 'Spend $75 on athletic wear in the last month, get Free shipping on all Nike orders.' },
  { logo: '', name: 'Coursera', category: 'Learning and Development', offer: 'Spend $50 on online courses in the last 30 days, get 20% off any Coursera course.' },
  { logo: '', name: 'Udemy', category: 'Learning and Development', offer: 'Spend $30 on educational content in the last week, buy one Udemy course, get one free.' },
  { logo: '', name: 'Peloton', category: 'Health and Wellness', offer: 'Spend $40 on fitness classes in the last month, get your first month free on digital membership.' },
  { logo: '', name: 'ClassPass', category: 'Health and Wellness', offer: 'Spend $25 on gym memberships in the last 30 days, save $20 on your first ClassPass pack.' },
  { logo: '', name: 'Coinbase', category: 'Finance and Crypto', offer: 'Spend $200 on crypto trading in the last 90 days, get $10 in Bitcoin.' },
  { logo: '', name: 'Binance', category: 'Finance and Crypto', offer: 'Spend $500 on crypto exchanges in the last month, get zero fees on first $500 trade.' },
  { logo: '', name: 'Uber', category: 'Life and Mobility', offer: 'Spend $30 on public transport in the last week, get 50% off your next 3 Uber rides.' },
  { logo: '', name: 'Lyft', category: 'Life and Mobility', offer: 'Spend $20 on taxis in the last 30 days, get $5 off your next 5 Lyft rides.' },
  { logo: '', name: 'Airbnb', category: 'Travel', offer: 'Spend $150 on hotel stays in the last 90 days, save $75 on your next Airbnb booking over $300.' },
  { logo: '', name: 'Booking.com', category: 'Travel', offer: 'Spend $100 on travel bookings in the last month, get 10% cashback on hotel stays.' },
  { logo: '', name: 'DoorDash', category: 'Food and Dining', offer: 'Spend $40 on food delivery in the last week, get Free delivery on your first 3 orders.' },
  { logo: '', name: 'Uber Eats', category: 'Food and Dining', offer: 'Spend $30 on restaurant takeout in the last 30 days, get $15 off your first order over $25.' },
  { logo: '', name: 'Hulu', category: 'Entertainment', offer: 'Spend $10 on streaming subscriptions in the last month, get your first 2 months free.' },
  { logo: '', name: 'Disney+', category: 'Entertainment', offer: 'Spend $8 on family entertainment in the last week, get 1 month free.' },
  { logo: '', name: 'Target', category: 'Shopping and Retail', offer: 'Spend $75 at competitor stores in the last 90 days, get $15 Target gift card.' },
  { logo: '', name: 'Walmart', category: 'Shopping and Retail', offer: 'Spend $50 on groceries in the last month, get Free 2-day shipping on all Walmart orders.' },
  { logo: '', name: 'MasterClass', category: 'Learning and Development', offer: 'Spend $60 on skill-building platforms in the last 30 days, buy one annual pass, get one free.' },
  { logo: '', name: 'Duolingo', category: 'Learning and Development', offer: 'Spend $10 on language apps in the last week, unlock Super Duolingo for 3 months.' },
  { logo: '', name: 'Calm', category: 'Health and Wellness', offer: 'Spend $20 on meditation apps in the last month, get 1 year free premium subscription.' },
  { logo: '', name: 'Headspace', category: 'Health and Wellness', offer: 'Spend $15 on mindfulness tools in the last 30 days, get 6 months free for new users.' },
  { logo: '', name: 'Fidelity', category: 'Finance and Crypto', offer: 'Spend $500 on investment platforms in the last 90 days, get $100 when you open a new account.' },
  { logo: '', name: 'Robinhood', category: 'Finance and Crypto', offer: 'Spend $200 on stock trading in the last month, get a free stock when you sign up.' },
  { logo: '', name: 'Lime', category: 'Life and Mobility', offer: 'Spend $10 on scooter rentals in the last week, get 5 free unlocks and 10 minutes of ride time.' },
  { logo: '', name: 'Bird', category: 'Life and Mobility', offer: 'Spend $8 on e-scooter rides in the last 30 days, get your first ride free up to $5.' },
  { logo: '', name: 'Expedia', category: 'Travel', offer: 'Spend $300 on flights in the last 90 days, save $50 on flight + hotel packages.' },
  { logo: '', name: 'Hotels.com', category: 'Travel', offer: 'Spend $200 on hotel bookings in the last month, earn 1 free night after 10 nights.' },
  { logo: '', name: 'Grubhub', category: 'Food and Dining', offer: 'Spend $30 on food delivery in the last week, get 20% off your next order.' },
  { logo: '', name: 'Postmates', category: 'Food and Dining', offer: 'Spend $25 on meal delivery in the last 30 days, get Free delivery on orders over $15.' },
  { logo: '', name: 'HBO Max', category: 'Entertainment', offer: 'Spend $12 on movie rentals in the last month, get 1 month free.' },
  { logo: '', name: 'Peacock', category: 'Entertainment', offer: 'Spend $10 on sports streaming in the last week, unlock premium for 6 months.' },
  { logo: '', name: 'Best Buy', category: 'Shopping and Retail', offer: 'Spend $150 on electronics in the last 90 days, get 10% off any single item.' },
  { logo: '', name: 'Sephora', category: 'Shopping and Retail', offer: 'Spend $40 on beauty products in the last month, get a Free gift with any purchase over $25.' },
];

const BROKE_PROGRAM_ID = "c21hg030pva9b0076618O6";

const RewardCard: React.FC<RewardCardProps & { onClaim?: () => void, isClaiming?: boolean }> = ({ logo, name, category, offer, onClaim, isClaiming }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative w-full h-32 bg-gray-200 flex items-center justify-center">
        {logo ? (
          <Image src={logo} alt={`${name} Logo`} fill style={{ objectFit: 'cover' }} className="rounded-none" />
        ) : (
          <span className="text-gray-500 text-sm">No Logo</span>
        )}
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{category}</p>
        <p className="text-gray-700 text-base mb-4 flex-grow">{offer}</p>
      </div>
      <div className="p-4 border-t border-gray-200 flex justify-between space-x-2">
        <button
          className="flex-1 bg-blue-500 text-white text-sm px-3 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={onClaim}
          disabled={isClaiming}
        >
          {isClaiming ? 'Verifying...' : 'Claim Reward'}
        </button>
        <button className="flex-1 border border-gray-300 text-gray-700 text-sm px-3 py-2 rounded hover:bg-gray-100 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [location, setLocation] = useState('Anywhere');
  const [sortBy, setSortBy] = useState('Relevance');
  const { airService } = useAirService();
  const [isClaiming, setIsClaiming] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const fakeCode = 'AMEX-WELCOME-TR456743';
  const redeemUrl = 'https://americanexpress.com/redeem';

  const handleCopy = () => {
    navigator.clipboard.writeText(fakeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClaimReward = async () => {
    if (!airService) return;
    setIsClaiming(true);
    try {
      const authResponse = await fetch('/api/verifier-auth', { method: 'POST' });
      if (!authResponse.ok) {
        throw new Error('Failed to get verifier authentication token');
      }
      const { token } = await authResponse.json();
      const queryRequest: QueryRequest = {
        process: "Verify",
        verifierAuth: token,
        programId: BROKE_PROGRAM_ID,
      };
      const rp = await airService.goToPartner("https://credential-widget.sandbox.air3.com/");
      const widget = new AirCredentialWidget(queryRequest, process.env.NEXT_PUBLIC_PARTNER_ID!, {
        endpoint: rp.urlWithToken,
        airKitBuildEnv: BUILD_ENV.SANDBOX,
        theme: "light",
        locale: "en" as Language,
        redirectUrlForIssuer: "localhost:3000/connect",
      });
      widget.on("verifyCompleted", (data: any) => {
        setIsClaiming(false);
        if (data.status === "Compliant") {
          setShowModal(true);
        }
        widget.destroy();
      });
      widget.on("close", () => {
        setIsClaiming(false);
        widget.destroy();
      });
      widget.launch();
    } catch (err) {
      setIsClaiming(false);
    }
  };

  const filteredRewards = mockRewards.filter(reward => {
    const matchesCategory = selectedCategory === 'All Categories' || reward.category === selectedCategory;
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reward.offer.toLowerCase().includes(searchTerm.toLowerCase());
    // Location and Sort By are placeholders for now
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="relative">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 rounded-bl-[100px] mb-28 md:mb-0 bg-linear-to-tr from-blue-600 to-blue-500 pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="absolute w-full z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between h-auto md:h-24 pt-4">
            {/* Site branding */}
            <div className="flex items-center space-x-3 mb-2">
              <Link className="block" href="/" aria-label="Vaulted">
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                  <g fillRule="nonzero" fill="none">
                    <g className="fill-white" transform="translate(3 3)">
                      <circle cx="5" cy="5" r="5" />
                      <circle cx="19" cy="5" r="5" />
                      <circle cx="5" cy="19" r="5" />
                      <circle cx="19" cy="19" r="5" />
                    </g>
                    <g className="fill-sky-300">
                      <circle cx="15" cy="5" r="5" />
                      <circle cx="25" cy="15" r="5" />
                      <circle cx="15" cy="25" r="5" />
                      <circle cx="5" cy="15" r="5" />
                    </g>
                  </g>
                </svg>
              </Link>
              <span className="text-2xl font-bold text-white">Vaulted</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-36 md:pt-22">
        {/* Card Container for Marketplace Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Category Tabs Section */}
          <div className="mb-8 pb-4 border-b border-gray-200">
            <div className="flex space-x-6 overflow-x-auto no-scrollbar">
              {categories.map(cat => {
                const isSelected = selectedCategory === cat.label;
                return (
                  <button
                    key={cat.label}
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors
                      ${isSelected ? 'bg-blue-100 text-blue-700 font-bold' : 'text-gray-400 hover:bg-blue-50'}`}
                    onClick={() => setSelectedCategory(cat.label)}
                  >
                    <span className={`text-2xl mb-1 ${isSelected ? 'text-blue-700' : 'text-gray-400'}`}>{cat.icon}</span>
                    <span className="text-xs font-medium whitespace-nowrap">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Search rewards..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>Anywhere</option>
              <option>London</option>
              <option>New York</option>
            </select>
            <select
              className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Alphabetical</option>
              <option>Newest</option>
              <option>Popularity</option>
            </select>
          </div>

          {/* Reward Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRewards.map((reward, index) => (
              <RewardCard
                key={index}
                {...reward}
                onClaim={reward.name === 'American Express' ? handleClaimReward : undefined}
                isClaiming={reward.name === 'American Express' ? isClaiming : false}
              />
            ))}
          </div>

          {/* Success Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative animate-fade-in z-10">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <img src="/images/americanexpress.png" alt="American Express" className="mx-auto mb-4 w-20 h-20 rounded-full shadow" />
                <h2 className="text-2xl font-bold mb-2 text-blue-700">Welcome to American Express!</h2>
                <p className="mb-4 text-gray-600">Copy your exclusive welcome code below and redeem your offer.</p>
                <div className="flex items-center justify-center mb-4">
                  <span className="font-mono text-lg bg-gray-100 px-4 py-2 rounded-l select-all border border-gray-200">{fakeCode}</span>
                  <button
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r transition-colors border border-l-0 border-gray-200 ${copied ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    onClick={handleCopy}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <a
                  href={redeemUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors"
                >
                  Redeem Offer
                </a>
              </div>
            </div>
          )}

          {filteredRewards.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No rewards found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}