import Head from 'next/head';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import LeadForm from '../../../components/LeadForm';
import { Icons } from '../../../components/Icons';
import { cities } from '../../../data/cities';
import { services } from '../../../data/services';
import { siteConfig } from '../../../data/config';

export async function getStaticPaths() {
  const paths = [];
  cities.forEach((city) => {
    services.forEach((service) => {
      paths.push({
        params: { city: city.slug, service: service.slug },
      });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const city = cities.find((c) => c.slug === params.city);
  const service = services.find((s) => s.slug === params.service);
  if (!city || !service) {
    return { notFound: true };
  }
  return { props: { city, service } };
}

export default function CityServicePage({ city, service }) {
  const otherServices = services.filter(s => s.slug !== service.slug).slice(0, 5);

  return (
    <>
      <Head>
        <title>{service.name} {city.name} TX | Fast Service | {siteConfig.name}</title>
        <meta name="description" content={`Professional ${service.name.toLowerCase()} in ${city.name}, TX. Same-day service, licensed technicians, upfront pricing. Call for a free quote!`} />
      </Head>

      <Header />

      <main>
        <section className="pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-primary-300 mb-4">
                <Icons.mapPin className="w-5 h-5" />
                <span className="text-sm uppercase tracking-wider">{city.name}, {city.county} County</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {service.name} in {city.name}, Texas
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                {service.shortDescription} Fast, professional service throughout {city.name} and surrounding areas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#quote" className="btn-accent">
                  Get Free Quote
                </Link>
                <Link href="/contact/" className="btn bg-white/10 text-white hover:bg-white/20">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 bg-accent-600 text-white">
          <div className="container flex flex-wrap justify-center gap-8 text-sm">
            <span className="flex items-center gap-2">
              <Icons.clock className="w-4 h-4" />
              {city.responseTime} Response
            </span>
            <span className="flex items-center gap-2">
              <Icons.checkCircle className="w-4 h-4" />
              Same-Day Service
            </span>
            <span className="flex items-center gap-2">
              <Icons.shield className="w-4 h-4" />
              Licensed & Insured
            </span>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="prose max-w-none">
                  <h2>{service.name} Services in {city.name}</h2>
                  <p>{service.description}</p>
                  <p>{city.localInfo}</p>

                  <h3>Why Choose Us for {service.name}</h3>
                  <ul>
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>

                  <h3>Common Issues We Handle</h3>
                  <ul>
                    {service.commonProblems.map((problem, idx) => (
                      <li key={idx}>{problem}</li>
                    ))}
                  </ul>

                  <h3>Our Process</h3>
                  <ol>
                    {service.process.map((step, idx) => (
                      <li key={idx}><strong>{step.title}:</strong> {step.description}</li>
                    ))}
                  </ol>

                  <h3>{city.name} Neighborhoods We Serve</h3>
                  <p>We provide {service.name.toLowerCase()} throughout {city.name} including:</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {city.neighborhoods.map((neighborhood, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                      {neighborhood}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center gap-2">
                      <Icons.clock className="w-5 h-5" />
                      Emergency Service
                    </h3>
                    <p className="text-red-700 text-sm mb-4">24/7 availability</p>
                    <Link href="/contact/" className="btn bg-red-600 text-white hover:bg-red-700 w-full justify-center">
                      Request Emergency Service
                    </Link>
                  </div>

                  <div id="quote">
                    <LeadForm source={`${city.slug}-${service.slug}`} />
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Other Services in {city.name}</h3>
                    <ul className="space-y-2">
                      {otherServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/locations/${city.slug}/${s.slug}/`}
                            className="flex items-center gap-2 text-slate-600 hover:text-primary-600 transition-colors py-1 text-sm"
                          >
                            <Icons.arrowRight className="w-4 h-4" />
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-900 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Need {service.name} in {city.name}?</h2>
            <p className="text-primary-100 mb-8">Contact us now for fast, professional service.</p>
            <Link href="/contact/" className="btn-accent text-lg">
              Request Service
            </Link>
          </div>
        </section>

        <section className="py-12 bg-slate-50">
          <div className="container">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
              {service.name} in Other Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {cities.filter(c => c.slug !== city.slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/locations/${c.slug}/${service.slug}/`}
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
