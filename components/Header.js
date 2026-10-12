import Image from "next/image";
import Link from "next/link";

const leftNavigation = [
   { slug: "", href: "/", label: "Accueil" },
   {
      slug: "qui-sommes-nous",
      href: "/qui-sommes-nous.html",
      label: "Qui sommes-nous ?",
   },
   { slug: "prestations", href: "/prestations.html", label: "Prestations" },
];

const rightNavigation = [
   { slug: "realisations", href: "/realisations.html", label: "Réalisations" },
   { slug: "", href: "/conseils", label: "Conseils" },
   { slug: "contact", href: "/contact.html", label: "Contact" },
];

function resolveHref(pages, item) {
   if (!item.slug) return item.href;
   const match = pages.find((p) => p.slug === item.slug);
   return match?.uri ?? item.href;
}

export default function Header({ pages = [] }) {
   const servicePages = pages.filter((page) =>
      page.uri?.startsWith("/prestations/"),
   );

   const leftMenu = leftNavigation.map((item) => ({
      ...item,
      href: resolveHref(pages, item),
   }));

   const rightMenu = rightNavigation.map((item) => ({
      ...item,
      href: resolveHref(pages, item),
   }));

   const fullMobileMenu = [...leftMenu, ...rightMenu];

   return (
      <header className="sticky top-0 z-40 bg-white">
         {/* Barre supérieure d'accroche */}
         <div className="flex items-center justify-center bg-afe-primary px-4 py-1 text-center  font-roboto-slab tracking-wide text-white">
            Installation - entretien - dépannage
         </div>

         {/* Coordonnées à gauche, réseaux sociaux à droite, menu mobile sur petit écran */}
         <div className="mx-auto flex w-[calc(100%-3rem)] max-w-[1200px] items-center justify-between py-2 max-md:w-[calc(100%-2rem)]">
            <div className="flex items-center gap-5 text-[0.85rem] font-medium max-lg:hidden">
               <a
                  href="tel:0389075599"
                  className="font-bold text-afe-primary no-underline transition-colors hover:text-afe-secondary"
               >
                  03 89 07 55 99
               </a>
               <a
                  href="mailto:contact@alsace-froid-energies.com"
                  className="text-[0.8rem] text-afe-text no-underline hover:text-afe-secondary"
               >
                  contact@alsace-froid-energies.com
               </a>
            </div>

            <div
               className="ml-auto flex items-center gap-2 max-lg:hidden"
               aria-label="Réseaux sociaux et avis"
            >
               <a
                  className="grid size-8 place-items-center rounded-full border border-afe-primary/40 transition-colors hover:bg-afe-primary/10"
                  href="https://www.facebook.com/p/Alsace-froid-%C3%A9nergies-61573746803179"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook (nouvel onglet)"
               >
                  <Image src="/brands/facebook.svg" alt="" width={16} height={16} />
               </a>
               <a
                  className="grid size-8 place-items-center rounded-full border border-afe-primary/40 transition-colors hover:bg-afe-primary/10"
                  href="https://www.linkedin.com/in/ga%C3%ABtan-fettig-460248182"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn (nouvel onglet)"
               >
                  <Image src="/brands/linkedin.svg" alt="" width={16} height={16} />
               </a>
               <a
                  className="grid size-8 place-items-center rounded-full border border-afe-primary/40 transition-colors hover:bg-afe-primary/10"
                  href="https://g.co/kgs/uy8Te18"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Avis Google (nouvel onglet)"
               >
                  <Image src="/brands/google.svg" alt="" width={16} height={16} />
               </a>
            </div>

            {/* Menu mobile (hamburger via <details>) */}
            <details className="group relative ml-auto hidden max-md:block">
               <summary
                  aria-label="Ouvrir le menu de navigation"
                  className="grid size-10 cursor-pointer list-none place-items-center rounded border border-afe-primary/25 text-xl text-afe-text marker:hidden [&::-webkit-details-marker]:hidden"
               >
                  <span aria-hidden="true">☰</span>
                  <span className="sr-only">Menu</span>
               </summary>
               <nav
                  aria-label="Navigation principale mobile"
                  className="absolute right-0 top-[calc(100%+0.5rem)] z-50 max-h-[calc(100vh-90px)] w-[min(88vw,320px)] overflow-y-auto rounded-lg border border-afe-text/10 bg-white py-2 shadow-2xl"
               >
                  <ul className="m-0 list-none p-0">
                     {fullMobileMenu.map((item) => (
                        <li key={item.label}>
                           <Link
                              href={item.href}
                              className="block px-4 py-3 font-medium text-afe-text no-underline hover:bg-afe-primary/10"
                           >
                              {item.label}
                           </Link>
                        </li>
                     ))}
                     {servicePages.length > 0 && (
                        <li className="border-t border-afe-text/10 bg-afe-primary/5">
                           <span className="block px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-afe-primary">
                              Nos métiers
                           </span>
                           <ul className="m-0 list-none p-0">
                              {servicePages.map((page) => (
                                 <li key={page.uri}>
                                    <Link
                                       href={page.uri}
                                       className="block px-6 py-2 text-sm text-afe-text no-underline hover:bg-afe-primary/10"
                                    >
                                       {page.title}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                        </li>
                     )}
                     <li className="mt-2 border-t border-afe-text/10 p-4 text-xs font-medium text-afe-text">
                        <p className="mb-1 font-bold text-afe-primary">
                           Contact direct :
                        </p>
                        <p className="mb-1">
                           <a
                              href="tel:0389075599"
                              className="text-afe-text no-underline hover:text-afe-primary"
                           >
                              03 89 07 55 99
                           </a>
                        </p>
                        <p className="m-0 break-all">
                           <a
                              href="mailto:contact@alsace-froid-energies.com"
                              className="text-afe-text no-underline hover:text-afe-primary"
                           >
                              contact@alsace-froid-energies.com
                           </a>
                        </p>
                     </li>
                  </ul>
               </nav>
            </details>
         </div>

         {/* Barre principale : Desktop (Left Nav - Logo - Right Nav) + Coordonnées / Mobile */}
         <div className="border-b border-afe-primary/15 bg-white shadow-[0_2px_12px_rgb(24_60_99_/_8%)]">
            <div className="relative mx-auto grid w-[calc(100%-3rem)] max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center gap-4 py-3 max-md:w-[calc(100%-2rem)] max-md:py-2">
               {/* Menu gauche (Desktop) */}
               <nav
                  aria-label="Navigation principale gauche"
                  className="flex flex-1 items-center justify-end max-md:hidden"
               >
                  <ul className="m-0 flex list-none items-center gap-[clamp(1rem,2vw,2.2rem)] p-0">
                     {leftMenu.map((item) => (
                        <li
                           key={item.label}
                           className="group relative flex items-center"
                        >
                           <Link
                              href={item.href}
                              className="text-[0.95rem] font-semibold text-afe-text no-underline transition-colors hover:text-afe-secondary"
                           >
                              {item.label}
                           </Link>

                           {/* Mega-menu déroulant pour Prestations */}
                           {item.slug === "prestations" &&
                              servicePages.length > 0 && (
                                 <div className="invisible absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                                    <ul className="m-0 min-w-[240px] list-none rounded-lg border border-afe-text/10 bg-white p-2">
                                       {servicePages.map((page) => (
                                          <li key={page.uri}>
                                             <Link
                                                href={page.uri}
                                                className="block rounded px-3 py-2 text-sm font-medium text-afe-text no-underline hover:bg-afe-primary/10 hover:text-afe-secondary"
                                             >
                                                {page.title}
                                             </Link>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                              )}
                        </li>
                     ))}
                  </ul>
               </nav>

               {/* Logo central (Desktop & Mobile) */}
               <div className="flex shrink-0 items-center justify-center px-4 max-md:col-start-2 max-md:px-0 relative">
                  <Link
                     href="/"
                     className="block w-[clamp(140px,16vw,190px)] shrink-0 leading-none max-md:w-[150px] max-sm:w-[135px]"
                     aria-label="Alsace Froid Energies — retour à l'accueil"
                  >
                     <Image
                        src="https://alsace-froid-energies.com/wp-content/uploads/2024/05/logo.png"
                        width={588}
                        height={277}
                        alt="Alsace Froid Energies"
                        priority
                        unoptimized
                        className="block h-auto w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                     />
                  </Link>
               </div>

               {/* Menu droit (Desktop) */}
               <nav
                  aria-label="Navigation principale droite"
                  className="flex flex-1 items-center justify-start max-md:hidden"
               >
                  <ul className="m-0 flex list-none items-center gap-[clamp(1rem,2vw,2.2rem)] p-0">
                     {rightMenu.map((item) => (
                        <li key={item.label} className="flex items-center">
                           <Link
                              href={item.href}
                              className="text-[0.95rem] font-semibold text-afe-text no-underline transition-colors hover:text-afe-secondary"
                           >
                              {item.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </nav>
            </div>
         </div>
      </header>
   );
}
