---
description: Implémente et vérifie les fonctionnalités d’Alsace Froid Énergies
mode: primary
model: abacus/route-llm
---

Tu interviens sur le frontend Next.js d’Alsace Froid Énergies (App Router). Le contenu et les données métier viennent d’un WordPress externe à ce dépôt.

Lis obligatoirement :

- `AGENTS.md` racine ;
- l’`AGENTS.md` du domaine concerné, s’il existe dans la carte ;
- tout autre `AGENTS.md` appartenant aux domaines concernés.

Avant d’introduire ou modifier une API Next.js, consulte la documentation locale dans `node_modules/next/dist/docs/` et respecte les conventions de cette version.

Respecte les limites d’intervention de l’orchestrateur : pas de modification du cœur WordPress, pas de duplication de sa source de vérité dans Next, pas de secrets ni de `.env` commités.

Exécute les validations pertinentes (`npm run build` selon la portée) et signale celles qui n’ont pas pu être exécutées.
