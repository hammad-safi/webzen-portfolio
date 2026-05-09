"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-on-surface p-gutter md:p-stack-lg">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-stack-md transition-all">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Portfolio
        </Link>
        
        <h1 className="font-h1 text-4xl md:text-5xl font-extrabold mb-stack-md">
          Privacy <span className="text-primary">Policy</span>
        </h1>
        
        <div className="glass-card rounded-2xl p-stack-md space-y-6 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-on-surface text-xl font-bold mb-2">1. Data Collection</h2>
            <p>We collect information you provide directly through our contact form, including your name, email address, WhatsApp number, and any project files or messages you send.</p>
          </section>

          <section>
            <h2 className="text-on-surface text-xl font-bold mb-2">2. Use of Information</h2>
            <p>Your data is used solely to respond to your inquiries, provide consultations, and manage project communications. We do not sell or share your personal information with third parties.</p>
          </section>

          <section>
            <h2 className="text-on-surface text-xl font-bold mb-2">3. Data Security</h2>
            <p>We implement technical measures to protect your data. Messages sent via our contact form are processed securely via encrypted channels.</p>
          </section>

          <section>
            <h2 className="text-on-surface text-xl font-bold mb-2">4. Contact</h2>
            <p>If you have questions about your data, contact us at <span className="text-primary">support.webzen.tech@gmail.com</span>.</p>
          </section>
        </div>
        
        <p className="mt-8 text-xs text-on-surface-variant/50 text-center uppercase tracking-widest">
          Last Updated: May 2026 | WebZen Digital Agency
        </p>
      </div>
    </main>
  );
}
