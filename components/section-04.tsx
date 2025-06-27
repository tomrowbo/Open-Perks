import Image from 'next/image'
import Features from '@/public/images/features-04.png'

export default function Section04() {
  return (
    <section className="mt-6" data-aos-id-4>
      <div className="relative max-w-7xl mx-auto">
        {/* Bg */}
        <div className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 border-2 border-slate-100 pointer-events-none -z-10" aria-hidden="true" />
        <div className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 bg-linear-to-t from-white pointer-events-none -z-10" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section content */}
            <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left flex flex-col md:flex-row items-center">
              {/* Content */}
              <div className="w-[512px] max-w-full shrink-0">
                {/* Copy */}
                <h2 className="h2 mb-4" data-aos="fade-up" data-aos-anchor="[data-aos-id-4]" data-aos-delay="100">
                  Unlock exclusive access and perks at premium venues
                </h2>
                <p className="text-lg text-slate-500 mb-6" data-aos="fade-up" data-aos-anchor="[data-aos-id-4]" data-aos-delay="200">
                  Tap your phone to prove your status and enjoy instant upgrades, VIP rooms, and more—no airline status or loyalty program required.
                </p>

                {/* Lists */}
                <div className="sm:columns-2 mb-8 space-y-8 sm:space-y-0" data-aos="fade-up" data-aos-anchor="[data-aos-id-4]" data-aos-delay="300">
                  {/* Column #1 */}
                  <div>
                    <h5 className="font-bold mb-5">Physical Venues</h5>
                    <ul className="inline-flex flex-col text-slate-500 space-y-2.5">
                      <li className="flex items-center"><span className="mr-3">🛬</span><span>Airport Lounges</span></li>
                      <li className="flex items-center"><span className="mr-3">🏨</span><span>Hotels & Resorts</span></li>
                      <li className="flex items-center"><span className="mr-3">🧖‍♀️</span><span>Spas & Wellness</span></li>
                      <li className="flex items-center"><span className="mr-3">🎰</span><span>Casinos & Private Clubs</span></li>
                      <li className="flex items-center"><span className="mr-3">🛍️</span><span>Luxury Retail</span></li>
                      <li className="flex items-center"><span className="mr-3">🏛️</span><span>Flagship Stores</span></li>
                    </ul>
                  </div>
                  {/* Column #2 */}
                  <div>
                    <h5 className="font-bold mb-5">Digital & Hybrid</h5>
                    <ul className="inline-flex flex-col text-slate-500 space-y-2.5">
                      <li className="flex items-center"><span className="mr-3">🎟️</span><span>Exclusive Events</span></li>
                      <li className="flex items-center"><span className="mr-3">💎</span><span>VIP Experiences</span></li>
                      <li className="flex items-center"><span className="mr-3">🍽️</span><span>Fine Dining</span></li>
                      <li className="flex items-center"><span className="mr-3">🛫</span><span>Travel Upgrades</span></li>
                      <li className="flex items-center"><span className="mr-3">🛡️</span><span>Concierge Services</span></li>
                    </ul>
                  </div>
                </div>

                {/* Button */}
                <div className="max-w-xs mx-auto sm:max-w-none" data-aos="fade-up" data-aos-anchor="[data-aos-id-4]" data-aos-delay="300">
                  <div>
                    <a className="btn-sm inline-flex items-center text-blue-50 bg-blue-500 hover:bg-blue-600 group shadow-xs" href="apply.html">
                      Get your card
                      <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                        <svg className="fill-current" width="12" height="10" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="flex-1 flex justify-center md:justify-end mt-10 md:mt-0">
                <Image src={Features} width={520} height={400} alt="Vaulted venues" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}