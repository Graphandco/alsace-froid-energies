import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-800">
        Erreur 404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
        Cette page est introuvable
      </h1>
      <p className="mt-4 max-w-xl leading-7 text-slate-600">
        Le lien est peut-être incorrect ou la page n’est plus disponible.
      </p>
      <Link
        className="mt-8 inline-flex rounded-full bg-cyan-800 px-6 py-3 font-semibold text-white hover:bg-cyan-950"
        href="/"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
