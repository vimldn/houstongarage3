import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';
import { Icons } from '../../components/Icons';
import { cities } from '../../data/cities';
import { services } from '../../data/services';
import { siteConfig } from '../../data/config';

export async function getStaticPaths() {
  const paths = cities.map((city) => ({
    params: { city: city.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const city = cities.find((c) => c.slug === params.city);
  if (!city) {
    return { notFound: true };
  }
  return { props: { city } };
}

export default function CityPage({ city }) {
  return (
    <>
      <Head>
        <title>Garage Door Repair {city.name} TX | 24/7 Service | {siteConfig.name}</title>
        <meta name="description" content={`Fast garage door repair in ${city.name}, TX. Same-day service, spring replacement, opener repair, new installations. Licensed technicians. Call now!`} />
      </Head>

      <Header />

      <main>
        <section className="pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-primary-300 mb-4">
                <Icons.mapPin className="w-5 h-5" />
                <span className="text-sm uppercase tracking-wider">{city.county} County, Texas</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Garage Door Repair in {city.name}
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                {city.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact/" className="btn-accent">
                  Get Free Quote
                </Link>
                <Link href="#services" className="btn bg-white/10 text-white hover:bg-white/20">
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 bg-accent-600 text-white">
          <div className="container flex flex-wrap justify-center gap-8 text-sm">
            <span className="flex items-center gap-2">
              <Icons.clock className="w-4 h-4" />
              Response Time: {city.responseTime}
            </span>
            <span className="flex items-center gap-2">
              <Icons.checkCircle className="w-4 h-4" />
              24/7 Emergency Service
            </span>
            <span className="flex items-center gap-2">
              <Icons.shield className="w-4 h-4" />
              Licensed & Insured
            </span>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="section-title mb-6">About {city.name} Service</h2>
                <p className="text-slate-600 mb-6">{city.localInfo}</p>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4">Neighborhoods We Serve</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {city.neighborhoods.map((neighborhood, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      {neighborhood}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4">ZIP Codes Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {city.zipCodes.map((zip, idx) => (
                    <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                      {zip}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <LeadForm source={`city-${city.slug}`} />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-slate-50">
          <div className="container">
            <h2 className="section-title mb-8 text-center">Services in {city.name}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/locations/${city.slug}/${service.slug}/`}
                  className="card p-6 hover:shadow-lg transition-all group hover:border-primary-200"
                >
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-slate-600">{service.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-900 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Need Service in {city.name}?</h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Our technicians are ready to help with any garage door problem.
            </p>
            <Link href="/contact/" className="btn-accent text-lg">
              Request Service
            </Link>
          </div>
        </section>

        <section className="py-12 bg-slate-50">
          <div className="container">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Other Service Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {cities.filter(c => c.slug !== city.slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/locations/${c.slug}/`}
                  className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-slate-700 hover:text-primary-600"
                >
                  {c.name}
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
