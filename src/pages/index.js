import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import { Icons } from '../components/Icons';
import { cities } from '../data/cities';
import { services } from '../data/services';
import { siteConfig } from '../data/config';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Garage Door Repair Houston | 24/7 Emergency Service | {siteConfig.name}</title>
        <meta name="description" content="Fast, reliable garage door repair in Houston. 24/7 emergency service, spring replacement, opener repair, new installations. Licensed & insured technicians. Call now!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-32 lg:pt-40 pb-16 lg:pb-24 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-accent-500/20 text-accent-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></span>
                  24/7 Emergency Service Available
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Houston's Trusted
                  <span className="text-accent-400"> Garage Door</span> Repair Experts
                </h1>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Fast, reliable service from licensed professionals. Same-day repairs, upfront pricing, and satisfaction guaranteed.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <Link href="/contact/" className="btn-accent text-lg">
                    Get Free Quote
                  </Link>
                  <Link href="/blog/" className="btn bg-white/10 text-white hover:bg-white/20 backdrop-blur">
                    Read Our Blog
                  </Link>
                </div>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Icons.checkCircle className="w-5 h-5 text-accent-400" />
                    <span>Same-Day Service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.checkCircle className="w-5 h-5 text-accent-400" />
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.checkCircle className="w-5 h-5 text-accent-400" />
                    <span>Upfront Pricing</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <LeadForm source="homepage-hero" />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 bg-slate-100 border-b">
          <div className="container">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">15+</div>
                <div className="text-sm text-slate-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">50,000+</div>
                <div className="text-sm text-slate-600">Doors Repaired</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">4.9</div>
                <div className="text-sm text-slate-600 flex items-center justify-center gap-1">
                  <Icons.star className="w-4 h-4 text-yellow-500" />
                  Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">30 min</div>
                <div className="text-sm text-slate-600">Avg Response</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title mb-4">Our Garage Door Services</h2>
              <p className="section-subtitle mx-auto">
                From emergency repairs to new installations, our network of skilled technicians handles it all.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/`}
                  className="card p-6 hover:shadow-lg transition-all group hover:border-primary-200"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icons.wrench className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {service.shortDescription}
                  </p>
                  <span className="text-primary-600 font-medium text-sm inline-flex items-center gap-1">
                    Learn More
                    <Icons.arrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/services/" className="btn-outline">
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* Emergency CTA */}
        <section className="py-12 bg-red-600 text-white">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Icons.clock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Garage Door Emergency?</h3>
                  <p className="text-red-100">We're available 24/7 for urgent repairs</p>
                </div>
              </div>
              <Link 
                href="/contact/"
                className="btn bg-white text-red-600 hover:bg-red-50 font-bold text-lg px-8"
              >
                Request Emergency Service
              </Link>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title mb-4">Service Areas</h2>
              <p className="section-subtitle mx-auto">
                Providing fast garage door service across the Greater Houston metropolitan area.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}/`}
                  className="card p-4 hover:shadow-md transition-all group hover:border-primary-200"
                >
                  <div className="flex items-center gap-2">
                    <Icons.mapPin className="w-4 h-4 text-primary-600" />
                    <span className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {city.name}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{city.county} County</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title mb-4">Why Choose Us</h2>
              <p className="section-subtitle mx-auto">
                Houston homeowners trust our network for reliable, professional garage door service.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icons.clock className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Fast Response</h3>
                <p className="text-slate-600 text-sm">
                  Same-day service with typical arrival in 30-60 minutes for emergencies.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icons.shield className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Licensed & Insured</h3>
                <p className="text-slate-600 text-sm">
                  All technicians are licensed, bonded, and carry full liability insurance.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icons.checkCircle className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Upfront Pricing</h3>
                <p className="text-slate-600 text-sm">
                  Know the cost before work begins. No hidden fees or surprise charges.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icons.star className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Satisfaction Guaranteed</h3>
                <p className="text-slate-600 text-sm">
                  We stand behind our work with labor warranties on all repairs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary-900 text-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Fix Your Garage Door?
                </h2>
                <p className="text-primary-100 text-lg mb-8">
                  Get connected with a trusted local technician today. Free quotes, fast service, and quality repairs guaranteed.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Icons.checkCircle className="w-6 h-6 text-accent-400" />
                    <span>Free, no-obligation quotes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.checkCircle className="w-6 h-6 text-accent-400" />
                    <span>Same-day service available</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.checkCircle className="w-6 h-6 text-accent-400" />
                    <span>All work guaranteed</span>
                  </li>
                </ul>
              </div>
              <div>
                <LeadForm source="homepage-cta" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
