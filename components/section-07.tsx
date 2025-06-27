import Image from 'next/image'
import Pricing01 from '@/public/images/pricing-01.png'
import Pricing02 from '@/public/images/pricing-02.png'
import Pricing03 from '@/public/images/pricing-03.png'

export default function Section07() {
  return (
    <section>
      <div className="relative max-w-7xl mx-auto">
        {/* Bg */}
        <div className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 border-2 border-slate-100 pointer-events-none -z-10" aria-hidden="true" />
        <div className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 bg-linear-to-t from-white pointer-events-none -z-10" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section content */}
            <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">
              {/* Section header */}
              <div className="md:max-w-3xl mb-12 md:mb-20" data-aos="fade-up">
                <h2 className="h2 mb-4">Tiered Proofs: Bronze, Silver, Gold</h2>
                <p className="text-lg text-slate-500 mb-8">
                  The more you spend, the more you unlock. Vaulted's zero-knowledge credentials let you prove your status—Bronze, Silver, or Gold—without revealing your identity or raw data.
                </p>
              </div>

              {/* Tiers */}
              <div
                className="max-w-sm md:max-w-2xl xl:max-w-none mx-auto grid gap-8 md:grid-cols-3 xl:grid-cols-3 xl:gap-6 items-start"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {/* Bronze Tier */}
                <div className="relative flex flex-col h-full rounded-br-[100px] py-5 px-6 border border-slate-200">
                  <div className="mb-4">
                    <div className="text-lg font-bold text-center mb-3">Bronze</div>
                    <Image className="w-full rounded-lg" src={Pricing01} width={210} height={124} alt="Bronze tier" />
                  </div>
                  <div className="mb-5">
                    <div className="text-2xl text-slate-800 font-bold text-center mb-4">$100,000+/year</div>
                  </div>
                  <div className="text-slate-800 font-medium mb-4">Total spending per year</div>
                  <ul className="text-slate-500 text-left space-y-2">
                    <li className="flex items-start"><span className="mr-3">🛬</span><span>Basic lounge access</span></li>
                    <li className="flex items-start"><span className="mr-3">🛍️</span><span>Retail welcome gifts</span></li>
                    <li className="flex items-start"><span className="mr-3">🍽️</span><span>Dining upgrades</span></li>
                  </ul>
                </div>

                {/* Silver Tier */}
                <div className="relative flex flex-col h-full bg-linear-to-b from-blue-100 to-blue-50 rounded-br-[100px] py-5 px-6 border border-slate-200">
                  <div className="absolute top-0 right-0 -translate-y-1/2 mr-6 inline-flex text-sm text-white bg-teal-500 font-[550] rounded-full px-3 py-px">
                    Popular
                  </div>
                  <div className="mb-4">
                    <div className="text-lg font-bold text-center mb-3">Silver</div>
                    <Image className="w-full rounded-lg" src={Pricing02} width={210} height={124} alt="Silver tier" />
                  </div>
                  <div className="mb-5">
                    <div className="text-2xl text-slate-800 font-bold text-center mb-4">$250,000+/year</div>
                  </div>
                  <div className="text-slate-800 font-medium mb-4">Total spending per year</div>
                  <ul className="text-slate-500 text-left space-y-2">
                    <li className="flex items-start"><span className="mr-3">🏨</span><span>Hotel upgrades</span></li>
                    <li className="flex items-start"><span className="mr-3">🎰</span><span>Casino & club entry</span></li>
                    <li className="flex items-start"><span className="mr-3">💎</span><span>VIP event invites</span></li>
                  </ul>
                </div>

                {/* Gold Tier */}
                <div className="relative flex flex-col h-full rounded-br-[100px] py-5 px-6 border border-slate-200">
                  <div className="mb-4">
                    <div className="text-lg font-bold text-center mb-3">Gold</div>
                    <Image className="w-full rounded-lg" src={Pricing03} width={210} height={124} alt="Gold tier" />
                  </div>
                  <div className="mb-5">
                    <div className="text-2xl text-slate-800 font-bold text-center mb-4">$1,000,000+/year</div>
                  </div>
                  <div className="text-slate-800 font-medium mb-4">Total spending per year</div>
                  <ul className="text-slate-500 text-left space-y-2">
                    <li className="flex items-start"><span className="mr-3">🛡️</span><span>Concierge & VIP services</span></li>
                    <li className="flex items-start"><span className="mr-3">🛫</span><span>First-class travel upgrades</span></li>
                    <li className="flex items-start"><span className="mr-3">🏛️</span><span>Private flagship access</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}