/* ────────────────────────────────────────────────────────────────────────────
   Barre d'onglets partagée — team 0 to 100 / 0 to 40
   ────────────────────────────────────────────────────────────────────────────
   Chargée par chaque outil via :
     <script src="https://cds-fleurier.github.io/0to100-hub/nav.js" defer></script>

   - injecte une barre fixe en bas (4 onglets), onglet actif détecté par l'URL
   - ajoute un padding-bottom au <body> pour ne rien masquer
   - expose --hub-nav-h (hauteur de la barre) pour les éléments fixes des apps
   - masquée si <body class="focus-mode"> (session player en séance)

   Ajouter un outil = une ligne dans TOOLS, rien à toucher dans les apps.
   ──────────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";
  if (document.getElementById("hub-nav")) return;

  var BASE = "https://cds-fleurier.github.io/";
  var TOOLS = [
    { id: "calendrier", label: "Calendrier",   icon: "📅", path: "calendar-0-to-100-app/" },
    { id: "carte",      label: "Carte",        icon: "🗺️", path: "carte-participants-0to100/" },
    { id: "courses",    label: "Qui court où", icon: "🏃", path: "qui-court-ou-0to100/" },
    { id: "seances",    label: "Séances",      icon: "🎧", path: "0to100-session-player-app/" }
  ];
  var NAV_H = 62;

  var CSS = [
    ":root{--hub-nav-h:" + NAV_H + "px}",
    "body{padding-bottom:calc(var(--hub-nav-h) + env(safe-area-inset-bottom,0px)) !important}",
    "body.focus-mode{padding-bottom:0 !important}",
    "body.focus-mode #hub-nav{display:none}",
    "#hub-nav{position:fixed;left:0;right:0;bottom:0;z-index:40;height:calc(var(--hub-nav-h) + env(safe-area-inset-bottom,0px));",
      "padding:6px 6px calc(6px + env(safe-area-inset-bottom,0px));",
      "background:rgba(10,14,22,.88);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);",
      "border-top:1px solid rgba(255,255,255,.09);box-shadow:0 -8px 30px rgba(0,0,0,.35);",
      "font-family:'Inter',system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}",
    "#hub-nav ul{list-style:none;margin:0 auto;padding:0;max-width:560px;height:100%;display:flex;align-items:stretch;gap:2px}",
    "#hub-nav li{flex:1;min-width:0}",
    "#hub-nav a{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;height:100%;",
      "border-radius:12px;text-decoration:none;color:#8a97a8;font-size:10.5px;font-weight:600;letter-spacing:.2px;",
      "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:background .15s,color .15s;-webkit-tap-highlight-color:transparent}",
    "#hub-nav a:hover{color:#e8edf5;background:rgba(255,255,255,.05)}",
    "#hub-nav a.is-active{color:#ff6b00;background:rgba(255,107,0,.12)}",
    "#hub-nav a.is-active .hub-ico{transform:translateY(-1px) scale(1.08)}",
    "#hub-nav .hub-ico{font-size:20px;line-height:1;transition:transform .15s}",
    "#hub-nav .hub-lbl{max-width:100%;overflow:hidden;text-overflow:ellipsis}",
    "@media (min-width:720px){#hub-nav{left:50%;right:auto;transform:translateX(-50%);width:min(560px,calc(100% - 32px));",
      "bottom:14px;border-radius:18px;border:1px solid rgba(255,255,255,.1);height:var(--hub-nav-h);padding:6px}}"
  ].join("");

  var here = location.pathname;
  function isActive(t) {
    return here.indexOf("/" + t.path.replace(/\/$/, "")) === 0;
  }

  var style = document.createElement("style");
  style.id = "hub-nav-style";
  style.textContent = CSS;
  document.head.appendChild(style);

  var nav = document.createElement("nav");
  nav.id = "hub-nav";
  nav.setAttribute("aria-label", "Outils de la team");
  var ul = document.createElement("ul");
  TOOLS.forEach(function (t) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = BASE + t.path;
    a.className = isActive(t) ? "is-active" : "";
    if (isActive(t)) a.setAttribute("aria-current", "page");
    a.innerHTML = '<span class="hub-ico" aria-hidden="true">' + t.icon + '</span><span class="hub-lbl">' + t.label + "</span>";
    li.appendChild(a);
    ul.appendChild(li);
  });
  nav.appendChild(ul);

  function mount() { document.body.appendChild(nav); }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);
})();
