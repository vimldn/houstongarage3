import Link from 'next/link';
import { Icons } from './Icons';
import { siteConfig } from '../data/config';
import { services } from '../data/services';
import { cities } from '../data/cities';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Emergency CTA */}
      <div className="bg-accent-600 py-4">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icons.clock className="w-6 h-6" />
            <span className="font-semibold">Need Emergency Repair? Available 24/7</span>
          </div>
          <Link 
            href="/contact/"
            className="btn bg-white text-accent-600 hover:bg-slate-100 font-bold"
          >
            Get Free Quote
          </Link>
        </div>
      </div>

      <div className="container py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                <Icons.garage className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Connecting Houston homeowners with trusted garage door repair professionals since 2010.
            </p>
            <div className="space-y-2">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-slate-400 hover:text-white">
                <Icons.email className="w-4 h-4" />
                <span className="text-sm">{siteConfig.email}</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link 
                    href={`/services/${service.slug}/`}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/services/"
                  className="text-accent-400 hover:text-accent-300 text-sm transition-colors"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {cities.slice(0, 8).map((city) => (
                <li key={city.slug}>
                  <Link 
                    href={`/locations/${city.slug}/`}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/locations/"
                  className="text-accent-400 hover:text-accent-300 text-sm transition-colors"
                >
                  All Locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq/" className="text-slate-400 hover:text-white text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-slate-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icons.shield className="w-5 h-5 text-accent-400" />
                <span className="font-semibold text-sm">Our Guarantee</span>
              </div>
              <p className="text-slate-400 text-xs">
                Licensed, insured technicians. Upfront pricing. Satisfaction guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="container py-6">
          <p className="text-slate-500 text-xs leading-relaxed mb-4">
            {siteConfig.legalDisclosure}
          </p>
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
