import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Icons } from '../../components/Icons';
import { services } from '../../data/services';
import { siteConfig } from '../../data/config';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Garage Door Services | Repair, Installation & More | {siteConfig.name}</title>
        <meta name="description" content="Complete garage door services in Houston: repair, installation, spring replacement, opener service, emergency repairs. Licensed technicians, same-day service." />
      </Head>

      <Header />

      <main>
        <section className="pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Garage Door Services
              </h1>
              <p className="text-xl text-slate-300">
                From emergency repairs to complete installations, our network of skilled technicians provides comprehensive garage door services across Houston.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/`}
                  className="card p-6 hover:shadow-lg transition-all group hover:border-primary-200"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icons.wrench className="w-6 h-6 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h2>
                  <p className="text-slate-600 mb-4">
                    {service.shortDescription}
                  </p>
                  <span className="text-primary-600 font-semibold inline-flex items-center gap-1">
                    Learn More
                    <Icons.arrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-accent-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Need Service Now?</h2>
            <p className="text-accent-100 mb-8 max-w-2xl mx-auto">
              Our technicians are standing by 24/7 for emergency repairs.
            </p>
            <Link href="/contact/" className="btn bg-white text-accent-600 hover:bg-accent-50 font-bold text-lg">
              Request Service
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
