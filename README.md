# 0to100-hub — le hub de la team

**URL** : https://cds-fleurier.github.io/0to100-hub/ — le lien unique à diffuser.

Deux choses :

1. `index.html` — page d'accueil avec les 4 tuiles (Calendrier, Carte, Qui court où, Séances).
2. `nav.js` — **barre d'onglets partagée**, chargée par chacune des 4 apps via
   ```html
   <script src="https://cds-fleurier.github.io/0to100-hub/nav.js" defer></script>
   ```
   Elle s'injecte en bas d'écran (pill flottante sur desktop), détecte l'onglet actif par l'URL,
   ajoute un `padding-bottom` au `body` et expose `--hub-nav-h` pour les éléments fixes des apps
   (toasts…). Masquée si `<body class="focus-mode">` (séance en cours dans le player).

## Ajouter un outil

Une ligne dans `TOOLS` (nav.js) + une tuile dans `index.html`. Rien à toucher dans les apps
(elles rechargent `nav.js` depuis ici — cache GitHub Pages ≈ 10 min).

## Apps qui chargent la barre

| App | Repo |
|---|---|
| Calendrier | `cds-fleurier/calendar-0-to-100-app` |
| Carte | `cds-fleurier/carte-participants-0to100` |
| Qui court où | `cds-fleurier/qui-court-ou-0to100` |
| Séances | `cds-fleurier/0to100-session-player-app` |
| AntoninGPT (bonus, tuile seule, pas d'onglet) | `cds-fleurier/antonin-gpt` |

## Journal

- 2026-11-24 : accueil — titre et description des tuiles sur deux lignes (`display:block`, ils étaient
  collés sur mobile), `--text-muted` #44505f → #7a8798 (contraste lisible), favicon. `nav.js` inchangé.
- 2026-09-21 : création du hub, barre partagée, bouton accueil, tuile bonus AntoninGPT.

- 24/11/2026 : préchauffage — l'accueil récupère en arrière-plan les choix de courses (Apps Script de Qui court où) et les range dans le cache partagé `team_choices_cache` ({at, choices}, même format que le calendrier et Qui court où v1.11.0) ; preconnect vers Google. ⚠️ L'URL de l'Apps Script est recopiée ici : à mettre à jour si le déploiement change d'URL.
