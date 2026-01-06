import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Icons } from '../../components/Icons';
import { blogPosts } from '../../data/content';
import { siteConfig } from '../../data/config';

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Garage Door Tips & Advice | {siteConfig.name}</title>
        <meta name="description" content="Expert garage door tips, maintenance advice, and repair guides for Houston homeowners. Learn how to care for your garage door." />
      </Head>

      <Header />

      <main>
        <section className="pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Garage Door Tips & Advice
              </h1>
              <p className="text-xl text-slate-300">
                Expert guides, maintenance tips, and helpful information for Houston homeowners.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => {
                // Extract first image from content as featured image
                const imgMatch = post.content?.match(/<img[^>]+src="([^"]+)"[^>]*>/);
                const featuredImage = imgMatch ? imgMatch[1] : null;
                
                return (
                <article key={post.slug} className="card overflow-hidden group">
                  {featuredImage ? (
                    <div className="aspect-video bg-slate-100 overflow-hidden">
                      <img 
                        src={featuredImage} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <Icons.garage className="w-16 h-16 text-primary-400" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                      <Link href={`/blog/${post.slug}/`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}/`}
                      className="text-primary-600 font-semibold inline-flex items-center gap-1 hover:text-primary-700"
                    >
                      Read More
                      <Icons.arrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container text-center">
            <h2 className="section-title mb-4">Have a Question?</h2>
            <p className="section-subtitle mx-auto mb-8">
              Our technicians are happy to answer your garage door questions.
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
