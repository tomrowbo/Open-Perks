export default function Faqs() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20" data-aos="fade-up">
          {/* Section header */}
          <div className="pb-12">
            <h2 className="h2">FAQs</h2>
          </div>

          {/* Columns */}
          <div className="md:flex md:space-x-12 space-y-8 md:space-y-0">
            {/* Column */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-bold">What is a zero-knowledge (ZK) credential?</h4>
                <p className="text-slate-500">
                  A ZK credential lets you prove you meet a requirement (like spending over $100k) without revealing your identity or raw data. It's cryptographically secure and privacy-preserving.
                </p>
              </div>

              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-bold">How do I use OpenPerks at a venue?</h4>
                <p className="text-slate-500">
                  Just tap your phone at a participating venue's terminal. Your ZK credential proves you qualify for access or perks without needing to join individual loyalty programmes.
                </p>
              </div>

              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-bold">What does the merchant see?</h4>
                <p className="text-slate-500">
                  Merchants only see a yes/no answer to "Does this person qualify?" They never see your name, account, or spending details.
                </p>
              </div>
            </div>

            {/* Column */}
            <div className="w-full md:w-1/2 space-y-8">
              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-bold">How do I get started?</h4>
                <p className="text-slate-500">
                  Connect your bank and card accounts, generate your ZK credential, and you're ready to unlock perks at premium venues.
                </p>
              </div>

              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-bold">Is my data safe with OpenPerks?</h4>
                <p className="text-slate-500">
                  Yes. Your raw data gets verified once and the proof is stored securely on the blockchain. From this point, you have full control over your data and what cryptographic proofs are shared.
                </p>
              </div>

              {/* Item */}
              <div className="space-y-2">
                <h4 className="text-xl font-bold">Can I use OpenPerks internationally?</h4>
                <p className="text-slate-500">
                  Yes! OpenPerks is designed to work across borders and with any participating venue or merchant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}