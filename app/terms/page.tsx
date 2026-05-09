"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-on-surface p-gutter md:p-stack-lg">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-secondary hover:underline mb-stack-md transition-all">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Portfolio
        </Link>
        
        <h1 className="font-h1 text-4xl md:text-5xl font-extrabold mb-stack-md">
          Terms of <span className="text-secondary">Service</span>
        </h1>
        
        <div className="glass-card rounded-2xl p-stack-md space-y-6 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-on-surface text-xl font-bold mb-2">1. Engagement</h2>
            <p>By contacting WebZen for digital services, you agree to a professional consultation process. Project timelines and deliverables will be formally agreed upon in a separate Statement of Work (SOW).</p>
          </section>

          <section>
            <h2 className="text-on-surface text-xl font-bold mb-2">2. Payments</h2>
            <p>Standard project engagements require a 50% upfront deposit. Final delivery and source code handover occur upon receipt of the remaining balance.</p>
          </section>

          <section>
            <h2 className="text-on-surface text-xl font-bold mb-2">3. Intellectual Property</h2>
            <p>Upon final payment, full ownership and intellectual property rights of the custom-developed software are transferred to the client, unless otherwise specified.</p>
          </section>

          <section>
            <h2 className="text-on-surface text-xl font-bold mb-2">4. Liability</h2>
            <p>WebZen is committed to high-performance development but is not liable for third-party hosting failures, API deprecations, or client-side data loss post-delivery.</p>
          </section>
        </div>
        
        <p className="mt-8 text-xs text-on-surface-variant/50 text-center uppercase tracking-widest">
          WebZen | Precision Digital Solutions
        </p>
      </div>
    </main>
  );
}
