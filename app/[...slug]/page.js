import { notFound } from "next/navigation";
import {
  getWordPressPage,
  getWordPressPages,
} from "@/lib/wordpress";

const EXCLUDED_PAGE_URIS = new Set(["/loginpress/"]);
function toRouteSegments(uri) {
  return uri.split("/").filter(Boolean);
}

function getPageMetadata(page) {
  const title = page.seo?.title || page.title;
  const description = page.seo?.metaDesc || page.title;
  const canonicalPath = page.seo?.canonical
    ? new URL(page.seo.canonical).pathname
    : undefined;

  const robotsValue = page.seo?.metaRobotsNoindex;

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
      title: page.seo?.opengraphTitle || title,
      description: page.seo?.opengraphDescription || description,
      type: "website",
      images: page.seo?.opengraphImage?.sourceUrl
        ? [page.seo.opengraphImage.sourceUrl]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const pages = await getWordPressPages();

  return pages
    .filter(
      (page) => page.uri && !EXCLUDED_PAGE_URIS.has(page.uri) && page.uri !== "/",
    )
    .map((page) => ({ slug: toRouteSegments(page.uri) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getWordPressPage(`/${slug.join("/")}/`);

  if (!page) {
    notFound();
  }

  return getPageMetadata(page);
}

export default async function WordPressPage({ params }) {
  const { slug } = await params;
  const page = await getWordPressPage(`/${slug.join("/")}/`);

  if (!page) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <article
        className="wordpress-content"
        dangerouslySetInnerHTML={{ __html: page.content ?? "" }}
      />
    </main>
  );
}
