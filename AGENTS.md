<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Alsace Froid Énergies — orchestrateur agent

Site **Next.js 16** (App Router, JavaScript, Tailwind 4). Le contenu et les données métier viennent d’un **WordPress externe** à ce dépôt : ce repo est le frontend, pas le CMS.

Avant de modifier un domaine, lire l’`AGENTS.md` du dossier concerné lorsqu’il existe.

## Tenue des AGENTS.md

Avant de modifier un domaine, lire son `AGENTS.md` lorsqu’il existe.

Mettre à jour l’`AGENTS.md` seulement lorsqu’une intervention apporte une
information durable et réutilisable :

- invariant métier découvert ou modifié ;
- nouvelle dépendance ou nouveau service externe ;
- nouvelle commande de validation ;
- changement d’architecture ou de source de vérité ;
- piège récurrent susceptible d’affecter les prochaines interventions.

Ne pas y enregistrer :

- le journal détaillé d’une intervention ;
- des informations temporaires ;
- une liste exhaustive des fichiers modifiés ;
- des secrets, jetons, mots de passe ou valeurs de `.env`.

Lorsqu’un nouveau domaine important apparaît, créer son `AGENTS.md` dans
le dossier concerné et l’ajouter à la carte des domaines.

## Carte des domaines

Aucun guide de domaine n’existe encore. Les ajouter ici dès qu’ils sont créés.

| Domaine | Lire |
|---------|------|
| Agents OpenCode | [`.opencode/agents/`](.opencode/agents/) — ask (plan) / build (implémentation) / review |
| App Router | `app/` |

## Portée et priorité des instructions

- Ce fichier contient les règles communes à tout le dépôt.
- Les `AGENTS.md` de domaine complètent ces règles pour leur périmètre.
- En cas de conflit, la règle la plus proche du code concerné prévaut,
  sauf pour la sécurité, les secrets et les contraintes globales.
- Une intervention couvrant plusieurs domaines doit lire tous les
  `AGENTS.md` concernés avant de proposer des changements.
- En cas d’ambiguïté entre deux domaines, demander confirmation avant
  de modifier une source de vérité.

## Limites d’intervention

- Ne pas modifier le cœur WordPress depuis ce dépôt.
- WordPress reste la source de vérité du contenu : ne pas la dupliquer
  dans Next.
- Ne pas committer ni afficher secrets / `.env` (URL, jetons, application
  passwords WordPress).
- Conserver le bloc `nextjs-agent-rules` en tête de ce fichier.

## Déroulement d’une intervention

1. Identifier les domaines concernés.
2. Lire leurs `AGENTS.md` lorsqu’ils existent.
3. Examiner les implémentations existantes.
4. Pour une modification importante, présenter un plan avant d’écrire.
5. Réutiliser les patterns existants.
6. Effectuer la modification minimale cohérente.
7. Exécuter les validations pertinentes.
8. Mettre à jour la documentation seulement si une connaissance durable
   a changé.
9. Résumer les changements, validations et risques restants.

## Règles globales

- **npm** (`package-lock.json`) — ne pas introduire un second lockfile.
- JavaScript, App Router, alias `@/*`.
- Avant d’introduire ou modifier une API Next.js, lire
  `node_modules/next/dist/docs/` et respecter les conventions de cette version.
- L’accès à WordPress passe par des variables d’environnement, jamais par
  des identifiants en dur.

## Commandes du projet

Les commandes viennent de `package.json`. Exécuter uniquement les
validations pertinentes au changement.

- Dev : `npm run dev`
- Build : `npm run build`
- Démarrage prod : `npm run start`

Il n’y a pas encore de script de lint ni de tests.

Avant de terminer une intervention :

1. exécuter les contrôles pertinents ;
2. signaler les contrôles non exécutés et leur raison ;
3. résumer les changements et risques résiduels.

## Flux critiques (rappel)

1. **Contenu** — WordPress est la source ; le front Next le consomme,
   il ne réimplémente pas le CMS.
2. **Secrets** — URL et authentification WordPress restent dans `.env`.
