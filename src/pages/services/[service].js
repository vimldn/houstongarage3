import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';
import { Icons } from '../../components/Icons';
import { services } from '../../data/services';
import { cities } from '../../data/cities';
import { siteConfig } from '../../data/config';

export async function getStaticPaths() {
  const paths = services.map((service) => ({
    params: { service: service.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const service = services.find((s) => s.slug === params.service);
  if (!service) {
    return { notFound: true };
  }
  return { props: { service } };
}

export default function ServicePage({ service }) {
  const otherServices = services.filter(s => s.slug !== service.slug).slice(0, 5);

  return (
    <>
      <Head>
        <title>{service.name} Houston | Same-Day Service | {siteConfig.name}</title>
        <meta name="description" content={`${service.shortDescription} Fast, reliable service in Houston. Licensed technicians, upfront pricing. Call now!`} />
      </Head>

      <Header />

      <main>
        <section className="pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-accent-400 mb-4">
                <Icons.wrench className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Professional Service</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {service.name} in Houston
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                {service.description}
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

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="prose max-w-none">
                  <h2>Why Choose Us for {service.name}</h2>
                  <ul>
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>

                  <h2>Common Issues We Fix</h2>
                  <ul>
                    {service.commonProblems.map((problem, idx) => (
                      <li key={idx}>{problem}</li>
                    ))}
                  </ul>

                  <h2>Our {service.name} Process</h2>
                  <ol>
                    {service.process.map((step, idx) => (
                      <li key={idx}>
                        <strong>{step.title}:</strong> {step.description}
                      </li>
                    ))}
                  </ol>

                  <h2>Service Areas</h2>
                  <p>We provide {service.name.toLowerCase()} throughout the Houston metro area including:</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/locations/${city.slug}/${service.slug}/`}
                      className="px-3 py-1 bg-slate-100 hover:bg-primary-100 text-slate-700 hover:text-primary-700 rounded-full text-sm transition-colors"
                    >
                      {city.name}
                    </Link>
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
                    <p className="text-red-700 text-sm mb-4">
                      Available 24/7 for urgent repairs
                    </p>
                    <Link href="/contact/" className="btn bg-red-600 text-white hover:bg-red-700 w-full justify-center">
                      Request Emergency Service
                    </Link>
                  </div>

                  <div id="quote" className="bg-primary-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Get a Free Quote
                    </h3>
                    <LeadForm variant="compact" source={`service-${service.slug}`} />
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                      Other Services
                    </h3>
                    <ul className="space-y-2">
                      {otherServices.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}/`}
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
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Contact us today for fast, professional {service.name.toLowerCase()} service.
            </p>
            <Link href="/contact/" className="btn-accent text-lg">
              Request Service
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
