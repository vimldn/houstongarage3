import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LeadForm from '../../components/LeadForm';
import { Icons } from '../../components/Icons';
import { blogPosts } from '../../data/content';
import { siteConfig } from '../../data/config';

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { notFound: true };
  }
  const otherPosts = blogPosts.filter(p => p.slug !== params.slug);
  return { props: { post, otherPosts } };
}

export default function BlogPostPage({ post, otherPosts }) {
  // Extract first image from content as featured image
  const imgMatch = post.content?.match(/<img[^>]+src="([^"]+)"[^>]*>/);
  const featuredImage = imgMatch ? imgMatch[1] : null;
  
  return (
    <>
      <Head>
        <title>{post.metaTitle || post.title} | {siteConfig.name}</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/blog/${post.slug}/`} />
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteConfig.siteUrl}/blog/${post.slug}/`} />
        {featuredImage && <meta property="og:image" content={featuredImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle || post.title} />
        <meta name="twitter:description" content={post.metaDescription || post.excerpt} />
        {featuredImage && <meta name="twitter:image" content={featuredImage} />}
      </Head>

      <Header />

      <main>
        <section className="pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white">
          <div className="container">
            <Link href="/blog/" className="inline-flex items-center text-primary-300 hover:text-white mb-6 transition-colors">
              <Icons.arrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 text-primary-300 text-sm mb-4">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                {post.tags && (
                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-32 space-y-6">
                  <div className="bg-accent-50 border border-accent-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Need Garage Door Service?</h3>
                    <p className="text-slate-600 text-sm mb-4">Our technicians are ready to help.</p>
                    <Link href="/contact/" className="btn-accent w-full justify-center">
                      Get Free Quote
                    </Link>
                  </div>

                  {otherPosts.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">More Articles</h3>
                      <div className="space-y-4">
                        {otherPosts.map((p) => (
                          <Link key={p.slug} href={`/blog/${p.slug}/`} className="block group">
                            <h4 className="font-medium text-slate-900 group-hover:text-primary-600 transition-colors">
                              {p.title}
                            </h4>
                            <span className="text-sm text-slate-500">{p.date}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-900 text-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Ready to Fix Your Garage Door?</h2>
                <p className="text-primary-100 text-lg">Get fast, professional service from our network of technicians.</p>
              </div>
              <div>
                <LeadForm variant="compact" source={`blog-${post.slug}`} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
