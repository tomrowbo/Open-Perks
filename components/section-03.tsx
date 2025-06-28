import Image from 'next/image'
import Features from '@/public/images/features-03.png'

export default function Section03() {
  return (
    <section className="mt-12 md:mt-20" data-aos-id-3>
      <div className="relative max-w-7xl mx-auto">
        {/* Bg */}
        <div
          className="absolute inset-0 rounded-tl-[100px] mb-24 md:mb-0 bg-linear-to-b from-slate-100 pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pb-6 pt-12 md:pt-20">
            {/* Section content */}
            <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left flex flex-col md:flex-row items-center justify-end">
              {/* Content */}
              <div className="w-[512px] max-w-full shrink-0 md:order-1">
                {/* Copy */}
                <h2 className="h2 mb-4" data-aos="fade-up" data-aos-anchor="[data-aos-id-3]" data-aos-delay="100">
                  Stakeholder Value
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  {/* Credential Provider */}
                  <div>
                    <h4 className="text-lg font-bold mb-2">Credential Provider</h4>
                    <ul className="text-slate-500 list-disc list-inside space-y-1">
                      <li>Issues ZK credential: "Spent ₩10M+ in past 12 months"</li>
                      <li>Monetize per verification or via proof marketplace</li>
                    </ul>
                  </div>
                  {/* User */}
                  <div>
                    <h4 className="text-lg font-bold mb-2">User</h4>
                    <ul className="text-slate-500 list-disc list-inside space-y-1">
                      <li>Access premium spaces, invites, VIP treatment</li>
                      <li>Build a portfolio of credentials (fashion, travel, dining, etc.)</li>
                      <li>Feels in control, not farmed for data</li>
                    </ul>
                  </div>
                  {/* Verifier */}
                  <div>
                    <h4 className="text-lg font-bold mb-2">Verifier</h4>
                    <ul className="text-slate-500 list-disc list-inside space-y-1">
                      <li>Acquires high-value, high-conversion customers</li>
                      <li>Offers tailored perks: free entry, upgrades, samples</li>
                      <li>No need to handle or store customer data</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Image */}
              <div className="w-full max-w-sm md:max-w-none md:mr-8 mt-8 md:mt-0">
                <div className="relative -mx-8 md:mx-0">
                  <Image
                    src={Features}
                    className="md:max-w-none"
                    width={496}
                    height={496}
                    alt="Stakeholder Value"
                    data-aos="fade-up"
                    data-aos-anchor="[data-aos-id-3]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}