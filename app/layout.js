import { Roboto, Roboto_Slab } from "next/font/google";
import { getWordPressPages } from "@/lib/wordpress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const roboto = Roboto({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
   variable: "--font-roboto",
   display: "swap",
});

const robotoSlab = Roboto_Slab({
   subsets: ["latin"],
   weight: ["400", "600", "700"],
   variable: "--font-roboto-slab-loaded",
   display: "swap",
});

export const metadata = {
   metadataBase: new URL("https://alsace-froid-energies.com"),
   title: {
      default: "Alsace Froid Energies | Frigoriste dans le Haut-Rhin",
      template: "%s | Alsace Froid Energies",
   },
   description:
      "Installation, entretien et dépannage en réfrigération, climatisation et pompes à chaleur en Alsace.",
   openGraph: {
      siteName: "Alsace Froid Energies",
      locale: "fr_FR",
      type: "website",
   },
};

export default async function RootLayout({ children }) {
   const pages = await getWordPressPages();

   return (
      <html lang="fr" className={`${roboto.variable} ${robotoSlab.variable}`}>
         <body
            suppressHydrationWarning
            className="flex min-h-screen flex-col overflow-x-clip bg-white font-sans text-afe-text antialiased"
         >
            <a
               className="sr-only z-50 rounded bg-white p-3 text-afe-text focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
               href="#main-content"
            >
               Aller au contenu
            </a>

            <Header pages={pages} />

            <div id="main-content" className="w-full flex-1">
               {children}
            </div>

            <Footer pages={pages} />
         </body>
      </html>
   );
}
