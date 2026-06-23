import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PublicHeader } from "@/components/marketing/public-header";
import { Footer } from "@/components/sections/footer";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Conseils, tactiques et retours d'expérience pour remplir votre salle et éliminer les no-shows.",
};

export default function BlogPage() {
  const [lead, ...rest] = BLOG_POSTS;

  return (
    <div className="bg-creme">
      <PublicHeader />

      <section className="px-5 pb-10 pt-16 sm:px-8 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker">Le blog</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-[0.95] tracking-tight text-noir md:text-6xl">
            Remplir sa salle, <span className="stabilo">sans jargon.</span>
          </h1>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Article à la une */}
          <Reveal>
            <a href={`/blog/${lead.slug}`} className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-hair bg-blanc lg:grid-cols-2">
              <div className="flex aspect-[16/10] items-end p-6" style={{ backgroundColor: lead.tone }}>
                <span className="rounded-full bg-noir/85 px-3 py-1 text-xs font-bold text-creme">{lead.category}</span>
              </div>
              <div className="flex flex-col justify-center p-7 lg:p-10">
                <p className="text-xs text-gris-fonce">{lead.date} · {lead.readingTime}</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-noir">{lead.title}</h2>
                <p className="mt-3 text-gris-fonce">{lead.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-noir">
                  Lire l&apos;article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </Reveal>

          {/* Grille */}
          <RevealGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Reveal key={p.slug}>
                <a href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-hair bg-blanc">
                  <div className="flex aspect-[16/10] items-end p-4" style={{ backgroundColor: p.tone }}>
                    <span className="rounded-full bg-noir/85 px-2.5 py-1 text-[11px] font-bold text-creme">{p.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs text-gris-fonce">{p.date} · {p.readingTime}</p>
                    <h3 className="mt-1.5 text-lg font-bold tracking-tight text-noir">{p.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-gris-fonce">{p.excerpt}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Footer />
    </div>
  );
}
