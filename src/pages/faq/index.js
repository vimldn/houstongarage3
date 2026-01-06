import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';
import { Icons } from '../../components/Icons';
import { faqContent } from '../../data/content';
import { siteConfig } from '../../data/config';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <Head>
        <title>FAQ | Garage Door Questions Answered | {siteConfig.name}</title>
        <meta name="description" content="Common questions about garage door repair, costs, and service in Houston. Get answers from the experts." />
      </Head>

      <Header />

      <main>
        <section className="pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-slate-300">
                Get answers to common garage door questions from our experts.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {faqContent.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-200">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                    className="w-full py-6 flex items-center justify-between text-left"
                  >
                    <span className="text-lg font-semibold text-slate-900 pr-8">{faq.question}</span>
                    <Icons.chevronDown 
                      className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openIndex === idx && (
                    <div className="pb-6 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-title mb-6">Still Have Questions?</h2>
                <p className="text-lg text-slate-600 mb-6">
                  Our friendly technicians are happy to answer any questions about your garage door.
                </p>
                <div className="space-y-4">
                  <Link href="/contact/" className="flex items-center gap-3 text-slate-700 hover:text-primary-600">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icons.clock className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Request Service</div>
                      <div className="text-sm text-slate-500">24/7 Emergency Available</div>
                    </div>
                  </Link>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-slate-700 hover:text-primary-600">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icons.email className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Email Us</div>
                      <div className="text-sm text-slate-500">{siteConfig.email}</div>
                    </div>
                  </a>
                </div>
              </div>
              <div>
                <LeadForm source="faq-page" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
