# Tably — Landing page

Landing page SaaS B2B anti no-show pour les restaurants de Suisse romande.
Next.js 14 (App Router) · TypeScript · Tailwind CSS v3 · Framer Motion · shadcn-style UI.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Typographie — Helvetica Now Display

La police de marque (**Helvetica Now Display**, Bold + Regular) n'est pas sur Google
Fonts. Tant que les fichiers ne sont pas fournis, le projet utilise **Inter** (400/500/700)
comme fallback de développement, donc `npm run dev` fonctionne immédiatement.

Pour activer la vraie police :

1. Déposez les fichiers dans `public/fonts/` :
   - `HelveticaNowDisplay-Regular.woff2`
   - `HelveticaNowDisplay-Bold.woff2`
2. Dans [app/layout.tsx](app/layout.tsx), remplacez le bloc `Inter(...)` par le bloc
   `localFont(...)` déjà documenté en commentaire juste au-dessus.

Aucun autre changement n'est nécessaire : la variable CSS `--font-display` est consommée
par `font-display` dans [tailwind.config.ts](tailwind.config.ts).

## Palette & design

Couleurs (cf. `tailwind.config.ts`) : `jaune-vif #fcf376`, `creme #fffee7`,
`blanc #ffffff`, `noir #000000`, `gris-fonce #555553`, `gris-clair #bcbcbc`.

Détails : surligneur « Stabilo » (`.stabilo`), grain SVG global, bordures fines
`border-hair`, ombres teintées (`shadow-lift`), animations Framer `fadeUp` + stagger.

## Structure

```
app/
  layout.tsx        # fonts, SEO/OpenGraph, grain global
  page.tsx          # assemblage des sections
  globals.css       # base Tailwind, .stabilo, .kicker, grain
  signup/page.tsx   # cible des CTA (placeholder)
components/
  ui/button.tsx     # bouton shadcn re-stylé (variants primary/invert/ghost/outline)
  motion/reveal.tsx # variants Framer partagés (fadeUp, stagger)
  sections/         # navbar, hero, ... (une section = un fichier)
lib/utils.ts        # cn()
```

## Réservation multi-restaurants (démo, sans base de données)

Chaque restaurant a un lien unique style Linktree avec son branding, et le gérant
dispose de son calendrier de réservations. Données mock dans
[lib/restaurants.ts](lib/restaurants.ts) ; disponibilités déterministes (SSR-safe)
et store `localStorage` dans [lib/availability.ts](lib/availability.ts).

| Route | Rôle |
|-------|------|
| `/[slug]` | Page publique : logo, liens, **calendrier + créneaux**, réservation (branding du resto) |
| `/[slug]/dashboard` | Espace gérant : **calendrier des réservations**, stats, détail du jour |

Restaurants de démo : `/le-comptoir`, `/brasserie-vaudoise`, `/osteria-vino`
(chacun avec `/dashboard`). Un slug inconnu renvoie un 404. Une réservation faite
sur la page publique est stockée en `localStorage` et **apparaît dans le dashboard**
du même restaurant (badge « nouveau »).

Pour ajouter un restaurant : ajoutez une entrée au tableau `RESTAURANTS`
(slug, branding, horaires) — la page et le dashboard sont générés automatiquement.

Brancher un vrai backend plus tard : remplacez les helpers de `lib/availability.ts`
(lecture/écriture) par des appels Supabase/Prisma ; l'UI reste inchangée.

## Déploiement

Compatible Vercel sans configuration (`npm run build`).
