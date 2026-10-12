import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAdviceArticle,
  getAdviceArticles,
} from "@/lib/wordpress";

export async function generateStaticParams() {
  const articles = await getAdviceArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

function plainText(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function createMetadata(article) {
  const title = article.seo?.title || article.title;
  const description =
    article.seo?.metaDesc || plainText(article.excerpt) || article.title;
  const image = article.seo?.opengraphImage?.sourceUrl || article.featuredImage?.node?.sourceUrl;
  const robotsValue = article.seo?.metaRobotsNoindex;
  const canonicalUrl = article.seo?.canonical
    ? new URL(article.seo.canonical)
    : null;
  const canonicalPath = canonicalUrl?.pathname || article.uri;

  return {
    title,
    description,
    alternates: canonicalPath ? { canonical: canonicalPath } : undefined,
    robots: robotsValue
      ? {
          index: robotsValue === "index",
          follow: !robotsValue.startsWith("noindex"),
        }
      : undefined,
    openGraph: {
      title: article.seo?.opengraphTitle || title,
      description: article.seo?.opengraphDescription || description,
      type: "article",
      publishedTime: article.date,
      images: image ? [image] : undefined,
    },
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getAdviceArticle(slug);

  if (!article) {
    notFound();
  }

  return createMetadata(article);
}

export default async function AdviceArticlePage({ params }) {
  const { slug } = await params;
  const article = await getAdviceArticle(slug);

  if (!article) {
    notFound();
  }

  const image = article.featuredImage?.node;

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
      <Link
        href="/conseils"
        className="font-semibold text-cyan-800 hover:text-cyan-950"
      >
        ← Tous les conseils
      </Link>
      <article className="mt-8">
        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-800">
            Conseil ·{" "}
            {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(
              new Date(article.date),
            )}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mt-5 text-xl leading-8 text-slate-600">
              {plainText(article.excerpt)}
            </p>
          ) : null}
        </header>

        {image?.sourceUrl ? (
          <Image
            src={image.sourceUrl}
            alt={image.altText || ""}
            width={image.mediaDetails?.width || 1200}
            height={image.mediaDetails?.height || 800}
            priority
            className="mb-12 max-h-[34rem] w-full rounded-2xl object-cover"
          />
        ) : null}

        <div
          className="wordpress-content"
          dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
        />
      </article>
    </main>
  );
}
