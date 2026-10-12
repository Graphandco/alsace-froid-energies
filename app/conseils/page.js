import Image from "next/image";
import Link from "next/link";
import { getAdviceArticles } from "@/lib/wordpress";

export const metadata = {
  title: "Conseils | Alsace Froid Energies",
  description:
    "Retrouvez les conseils et actualités de nos spécialistes en réfrigération, climatisation et pompes à chaleur.",
  alternates: { canonical: "/conseils/" },
};

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

export default async function AdvicePage() {
  const articles = await getAdviceArticles();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-800">
          Alsace Froid Energies
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Conseils
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Des actualités et des conseils pratiques pour optimiser vos
          installations et votre confort.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="rounded-2xl bg-slate-50 p-8 text-slate-600">
          Aucun conseil n’est disponible pour le moment.
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const image = article.featuredImage?.node;

            return (
              <li
                key={article.databaseId}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <Link
                  href={article.uri || `/conseils/${article.slug}/`}
                  className="group block h-full"
                >
                  {image?.sourceUrl ? (
                    <Image
                      src={image.sourceUrl}
                      alt={image.altText || ""}
                      width={image.mediaDetails?.width || 800}
                      height={image.mediaDetails?.height || 600}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-slate-100" aria-hidden="true" />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold leading-snug text-slate-950 group-hover:text-cyan-800">
                      {article.title}
                    </h2>
                    <p className="mt-3 leading-7 text-slate-600">
                      {plainText(article.excerpt)}
                    </p>
                    <span className="mt-5 inline-flex font-semibold text-cyan-800">
                      Lire le conseil <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
