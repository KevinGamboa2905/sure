import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PublicHeader } from "@/components/marketing/public-header";
import { Footer } from "@/components/sections/footer";
import { FinalCTA } from "@/components/sections/final-cta";
import { BLOG_POSTS, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Article introuvable" };
  return { title: post.title, description: post.excerpt };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="bg-creme">
      <PublicHeader />

      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 lg:py-16">
        <a href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gris-fonce hover:text-noir">
          <ArrowLeft className="h-4 w-4" /> Tous les articles
        </a>

        <p className="mt-8 text-xs font-bold uppercase tracking-label text-gris-fonce">
          {post.category} · {post.date} · {post.readingTime}
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-noir md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-gris-fonce">{post.excerpt}</p>

        {/* Visuel de tête (CSS, pas d'image externe) */}
        <div className="mt-8 aspect-[16/7] rounded-3xl" style={{ backgroundColor: post.tone }} />

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-gris-fonce">
          {post.content.map((para, i) => (
            <p key={i} className={i === 0 ? "text-noir" : undefined}>{para}</p>
          ))}
        </div>
      </article>

      <FinalCTA />
      <Footer />
    </div>
  );
}
