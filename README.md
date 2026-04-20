# Solbound — Landing

Static landing page for [solbound.dev](https://solbound.dev). Single-page HTML + Tailwind.

## Structure

```
├── index.html            # the landing
├── output.css            # Tailwind build (generated)
├── input.css             # Tailwind source (@tailwind directives)
├── tailwind.config.js    # Tailwind config
├── assets/               # images, logos, fonts
├── llms.txt              # LLM-directive metadata
├── robots.txt
├── sitemap.xml
└── ORBIT-SPEC.md         # internal spec for the 3D client orbit component
```

## Local development

```bash
# install Tailwind CLI + test tooling
npm install

# rebuild output.css on change (recommended)
npx tailwindcss -i ./input.css -o ./output.css --watch

# serve locally (any static server works)
python3 -m http.server 8765
# open http://localhost:8765
```

## Deploy

Pushed to GitHub. CI/CD auto-deploys on merge to `main`.

## Notes

- All styling via Tailwind utility classes in `index.html`. No separate component files.
- 3D client-orbit component implementation is documented in `ORBIT-SPEC.md` for rollback/replication reference.
- Tailwind, Google Fonts (Inter, Syne), and Iconify are loaded via CDN — no build step required to run the page.
