import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';
import { Icons } from '../../components/Icons';
import { cities } from '../../data/cities';
import { siteConfig } from '../../data/config';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Get a Free Quote | {siteConfig.name}</title>
        <meta name="description" content="Contact Houston Garage Door Pros for fast service. Call 24/7 for emergencies or request a free quote online. Licensed, insured technicians." />
      </Head>

      <Header />

      <main>
        <section className="pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-slate-300">
                Get a free quote or schedule service. We're available 24/7 for emergencies.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="section-title mb-6">Get in Touch</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Need garage door service? We're here to help. Call us for immediate assistance or fill out the form for a free quote.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4 p-4 bg-accent-50 rounded-xl">
                    <div className="w-12 h-12 bg-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icons.clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">24/7 Emergency Service</h3>
                      <p className="text-accent-600 font-semibold">Fast Response Times</p>
                      <p className="text-sm text-slate-500">Fill out the form for immediate assistance</p>
                    </div>
                  </div>
                  
                  <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icons.email className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Email Us</h3>
                      <p className="text-primary-600">{siteConfig.email}</p>
                      <p className="text-sm text-slate-500">We'll respond within 24 hours</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icons.mapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Service Area</h3>
                      <p className="text-slate-600">Greater Houston Metropolitan Area</p>
                      <p className="text-sm text-slate-500">12+ cities served</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icons.clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Hours</h3>
                      <p className="text-slate-600">Mon-Fri: 7am - 8pm</p>
                      <p className="text-slate-600">Sat-Sun: 8am - 6pm</p>
                      <p className="text-sm text-accent-600 font-medium">24/7 Emergency Service</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Request a Free Quote</h2>
                  <p className="text-slate-600 mb-6">Fill out the form and we'll get back to you quickly.</p>
                  <LeadForm source="contact-page" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Service Areas</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {cities.map((city) => (
                <Link 
                  key={city.slug}
                  href={`/locations/${city.slug}/`}
                  className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-slate-700 hover:text-primary-600"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
