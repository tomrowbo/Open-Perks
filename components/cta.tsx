export default function Cta() {
  return (
    <section className="relative">
      {/* Bg */}
      <div className="absolute inset-0 bg-slate-800 -z-10" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6" data-aos="fade-up">
        <div className="py-12 md:py-20">
          <div className="sm:flex sm:flex-col lg:flex-row justify-between items-center">
            {/* CTA content */}
            <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left">
              <p className="text-xl text-blue-500 font-[550] mb-3">Ready to unlock your private status?</p>
              <h2 className="h2 text-slate-100">Prove your spending power. Unlock premium access. Stay private.</h2>
            </div>

            {/* Waitlist Form */}
            <div className="shrink-0 w-full lg:w-auto max-w-md mx-auto lg:mx-0">
              <form
                action="https://formspree.io/f/xzzgojeq"
                method="POST"
                className="flex flex-col sm:flex-row gap-3"
              >
                <input 
                  type="email" 
                  name="email" 
                  required
                  className="flex-1 px-4 py-2 rounded bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
                <button 
                  type="submit"
                  className="btn-sm inline-flex items-center justify-center text-blue-50 bg-blue-500 hover:bg-blue-600 group shadow-xs whitespace-nowrap"
                >
                  Join Waitlist
                  <span className="tracking-normal text-sky-400 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                    <svg className="fill-current" width="12" height="10" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}