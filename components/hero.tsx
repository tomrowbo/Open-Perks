import Link from 'next/link'
import Image from 'next/image'
import Illustration from '@/public/images/hero-illustration.svg'
import HeroImage from '@/public/images/viphero.png'

export default function Hero() {
  return (
    <section className="relative">
      {/* Bg */}
      <div
        className="absolute inset-0 rounded-bl-[100px] mb-28 md:mb-0 bg-linear-to-tr from-blue-600 to-blue-500 pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-36 md:pt-40 md:pb-20">
          {/* Hero content */}
          <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left">
            {/* Content */}
            <div className="md:w-[600px]">
              {/* Copy */}
              <h1 className="h1 text-white mb-6" data-aos="fade-up" data-aos-delay="100">
                Unlock Exclusive Offers with Your Real Spending
              </h1>
              <p className="text-2xl text-blue-200 mb-4" data-aos="fade-up" data-aos-delay="200">
                Connect your bank, prove your spend, and get rewarded by top brands for your loyalty—or for switching.
              </p>
              <p className="text-lg text-blue-200 mb-8" data-aos="fade-up" data-aos-delay="250">
                OpenPerks connects your bank accounts to surface personalized, high-value offers. Merchants reward you for spending in certain categories or at competitors—no points, no games, just real rewards for your real spend.
              </p>

              {/* Waitlist Form */}
              <div
                className="max-w-md mx-auto md:mx-0 mb-12 md:mb-0"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <form
                  action="https://formspree.io/f/xzzgojeq"
                  method="POST"
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2" htmlFor="email">
                      Your email:
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email"
                      required
                      className="w-full px-4 py-2 rounded bg-white/10 border border-blue-400/30 text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-300"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 text-sm font-medium mb-2" htmlFor="message">
                      Your message:
                    </label>
                    <textarea 
                      name="message" 
                      id="message"
                      rows={3}
                      className="w-full px-4 py-2 rounded bg-white/10 border border-blue-400/30 text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-300 resize-none"
                      placeholder="Tell us what you're interested in"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="btn-sm w-full inline-flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 group shadow-sm"
                  >
                    Join Waitlist
                    <span className="tracking-normal text-blue-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                      <svg className="fill-current" width="12" height="10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Image */}
            <div className="max-w-sm mx-auto md:max-w-none md:absolute md:left-[600px] md:top-0 -mb-12 md:-mt-12 md:mb-0">
              <div className="relative -ml-3 -mr-24 md:mx-0">
                <Image
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 mt-16 md:mt-0 pointer-events-none -z-10 max-w-none mix-blend-lighten"
                  src={Illustration}
                  priority
                  alt="Hero illustration"
                  aria-hidden="true"
                />
                <Image src={HeroImage} className="md:max-w-none" width="548" height="545" alt="OpenPerks hero" data-aos="fade-up" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}