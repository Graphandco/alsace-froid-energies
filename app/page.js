import { getHomepage } from "@/lib/wordpress";

export async function generateMetadata() {
  const homepage = await getHomepage();
  const title = homepage?.seo?.title || homepage?.title;
  const description = homepage?.seo?.metaDesc;

  return {
    title,
    description,
    alternates: homepage?.seo?.canonical
      ? { canonical: new URL(homepage.seo.canonical).pathname }
      : undefined,
    openGraph: {
      title: homepage?.seo?.opengraphTitle || title,
      description: homepage?.seo?.opengraphDescription || description,
      images: homepage?.seo?.opengraphImage?.sourceUrl
        ? [homepage.seo.opengraphImage.sourceUrl]
        : undefined,
    },
  };
}

export default async function Home() {
  const homepage = await getHomepage();

  if (!homepage) {
    throw new Error("La page d’accueil n’a pas été trouvée dans WordPress.");
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <article
        className="wordpress-content"
        dangerouslySetInnerHTML={{ __html: homepage.content ?? "" }}
      />
    </main>
  );
}
