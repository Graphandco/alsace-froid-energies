import Image from "next/image";
import Link from "next/link";

const legalNavigation = [
  { slug: "mentions-legales", href: "/mentions-legales.html", label: "Mentions légales" },
  {
    slug: "politique-de-confidentialite",
    href: "/politique-de-confidentialite.html",
    label: "Politique de confidentialité",
  },
  {
    slug: "conditions-generales-de-vente",
    href: "/conditions-generales-de-vente.html",
    label: "Conditions générales de vente",
  },
  { slug: "plan-du-site", href: "/plan-du-site.html", label: "Plan du site" },
];

function resolveHref(pages, item) {
  if (!item.slug) return item.href;
  const match = pages.find((p) => p.slug === item.slug);
  return match?.uri ?? item.href;
}

export default function Footer({ pages = [] }) {
  const legalLinks = legalNavigation.map((item) => ({
    ...item,
    href: resolveHref(pages, item),
  }));

  return (
    <footer className="relative isolate mt-16 overflow-hidden bg-gradient-to-br from-afe-text to-afe-primary text-white before:absolute before:-left-32 before:-top-28 before:-z-10 before:aspect-square before:w-96 before:rounded-full before:border-[2rem] before:border-white/5 before:content-['']">
      <div className="mx-auto grid w-[calc(100%-3rem)] max-w-[1200px] grid-cols-2 gap-12 py-14 max-sm:w-[calc(100%-2rem)] max-sm:grid-cols-1 max-sm:gap-8 max-sm:py-10">
        <section aria-labelledby="footer-contact-title">
          <h2
            className="mb-5 font-serif text-[1.4rem] font-medium text-white max-sm:text-xl"
            id="footer-contact-title"
          >
            Nous contacter
          </h2>
          <address className="not-italic leading-relaxed">
            <p className="mb-3">
              11A rue Principale
              <br />
              68130 Obermorschwiller
            </p>
            <p className="mb-3">
              <a
                className="text-white no-underline transition-colors hover:text-afe-secondary"
                href="tel:0389075599"
              >
                03 89 07 55 99
              </a>
            </p>
            <p className="mb-3">
              <a
                className="break-all text-white no-underline transition-colors hover:text-afe-secondary"
                href="mailto:g.fettig@alsace-froid-energies.com"
              >
                g.fettig@alsace-froid-energies.com
              </a>
            </p>
          </address>
          <Link
            className="mt-6 block w-[180px] rounded bg-white p-2"
            href="/"
            aria-label="Alsace Froid Energies — accueil"
          >
            <Image
              src="https://alsace-froid-energies.com/wp-content/uploads/2024/05/logo.png"
              width={588}
              height={277}
              alt="Alsace Froid Energies"
              unoptimized
              className="block h-auto w-full"
            />
          </Link>
        </section>

        <section aria-labelledby="footer-links-title">
          <h2
            className="mb-5 font-serif text-[1.4rem] font-medium text-white max-sm:text-xl"
            id="footer-links-title"
          >
            Liens
          </h2>
          <ul className="m-0 list-none space-y-3 p-0">
            {legalLinks.map((item) => (
              <li key={item.slug}>
                <Link
                  className="text-white no-underline transition-colors hover:text-afe-secondary"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3" aria-label="Réseaux et avis">
            <a
              className="grid size-10 place-items-center rounded-full border border-white/60 transition-colors hover:bg-white/10"
              href="https://www.facebook.com/p/Alsace-froid-%C3%A9nergies-61573746803179"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook (nouvel onglet)"
            >
              <Image src="/brands/facebook.svg" alt="" width={20} height={20} />
            </a>
            <a
              className="grid size-10 place-items-center rounded-full border border-white/60 transition-colors hover:bg-white/10"
              href="https://www.linkedin.com/in/ga%C3%ABtan-fettig-460248182"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn (nouvel onglet)"
            >
              <Image src="/brands/linkedin.svg" alt="" width={20} height={20} />
            </a>
            <a
              className="grid size-10 place-items-center rounded-full border border-white/60 transition-colors hover:bg-white/10"
              href="https://g.co/kgs/uy8Te18"
              target="_blank"
              rel="noreferrer"
              aria-label="Avis Google (nouvel onglet)"
            >
              <Image src="/brands/google.svg" alt="" width={20} height={20} />
            </a>
          </div>
        </section>
      </div>
      <div className="border-t border-white/20 px-6 py-4 text-center text-sm">
        <p className="m-0">© 2026 Alsace Froid Energies</p>
      </div>
    </footer>
  );
}
