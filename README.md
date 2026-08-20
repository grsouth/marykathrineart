# Mary Kathrine Art

A lightweight, one-page portfolio for [marykathrineart.com](https://marykathrineart.com), built with plain HTML, CSS, and JavaScript for GitHub Pages.

## Preview locally

From this directory, run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Replace the placeholders

1. In `script.js`, set `siteConfig.etsyUrl` and `siteConfig.instagramUrl` to the final HTTPS URLs.
2. Add optimized artwork images under `assets/artwork/`.
3. Update the `galleryItems` manifest in `script.js`. Each entry has a source, title, descriptive alt text, card ratio, and desktop width.
4. Replace the `.wordmark` markup in `index.html` with the finished logo. Preserve the link's accessible label and set a useful image `alt` value.
5. Replace the temporary artist introduction in the `#story` section.
6. Replace `assets/social-preview.png` after the final logo or signature artwork is available. Keep it at 1200 × 630 pixels.

For production artwork, export JPEG or WebP files near their largest displayed size, keep individual images reasonably small, and write alt text describing what is visibly distinctive about each piece.

## Publish with GitHub Pages

1. Push these files to the default branch of a GitHub repository.
2. In **Settings → Pages**, choose **Deploy from a branch**, select the default branch, and select the repository root (`/`).
3. In the Pages settings, add `marykathrineart.com` as the custom domain and enable HTTPS when GitHub makes it available.
4. At the DNS provider, point the apex domain to GitHub Pages using the records from GitHub's current custom-domain documentation. Configure `www` as well if it should redirect to the apex domain.
5. Verify the domain in GitHub before changing DNS to reduce takeover risk.

The included `CNAME` records the intended hostname, but it does not configure the GitHub repository or DNS provider by itself. DNS updates can take time to propagate.

- [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)

## Fonts and artwork

The bundled Cormorant Garamond and Source Sans 3 fonts are open source; their licenses are included beside the font files. All placeholder botanical SVG artwork in this repository is original and intended to be replaced with Mary Kathrine's work.
