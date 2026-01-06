import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Icons } from '../../components/Icons';
import { cities } from '../../data/cities';
import { siteConfig } from '../../data/config';

export default function LocationsPage() {
  return (
    <>
      <Head>
        <title>Service Areas | Garage Door Repair Across Houston | {siteConfig.name}</title>
        <meta name="description" content="Garage door repair service throughout Houston metro: Sugar Land, Katy, The Woodlands, Pearland, Cypress, and more. Fast response times, 24/7 emergency service." />
      </Head>

      <Header />

      <main>
        <section className="pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Service Areas
              </h1>
              <p className="text-xl text-slate-300">
                Fast, reliable garage door service throughout the Greater Houston metropolitan area. Our network of technicians provides quick response times across all locations.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}/`}
                  className="card p-6 hover:shadow-lg transition-all group hover:border-primary-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icons.mapPin className="w-5 h-5 text-primary-600" />
                    <span className="text-sm text-slate-500">{city.county} County</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {city.name}
                  </h2>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {city.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      <Icons.clock className="w-4 h-4 inline mr-1" />
                      {city.responseTime}
                    </span>
                    <span className="text-primary-600 font-medium text-sm inline-flex items-center gap-1">
                      View Services
                      <Icons.arrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container text-center">
            <h2 className="section-title mb-4">Don't See Your Area?</h2>
            <p className="section-subtitle mx-auto mb-8">
              We serve the entire Greater Houston area. Contact us to confirm service in your location.
            </p>
            <Link href="/contact/" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
