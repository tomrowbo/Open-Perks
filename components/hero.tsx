import LoginButton from './login-button'
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
                The Private Status Layer for High-Spending Individuals
              </h1>
              <p className="text-2xl text-blue-200 mb-4" data-aos="fade-up" data-aos-delay="200">
                Spend more. Unlock more. Privately.
              </p>
              <p className="text-lg text-blue-200 mb-8" data-aos="fade-up" data-aos-delay="250">
                Prove your spending power with zero-knowledge credentials. Tap to unlock exclusive access and perks—no data leaks, no loyalty hassle.
              </p>

              {/* Buttons */}
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12 md:mb-0"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div>
                  <LoginButton />
                </div>
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
                <Image src={HeroImage} className="md:max-w-none" width="548" height="545" alt="Vaulted hero" data-aos="fade-up" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}