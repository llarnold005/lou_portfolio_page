# Photography as the design foundation

No photographs were supplied with the design enhancement brief. The site deliberately uses an abstract cobalt aperture with a visible “PHOTOGRAPH TO COME” caption. It does not simulate a person. Actual photography is the remaining creative input, not an implemented likeness.

Supply your own approved photographs at these exact paths:

| File                                    | Placement                                             | Suggested dimensions                        |
| --------------------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| `/public/images/profile/hero.webp`      | Homepage, 52% of desktop composition, first on mobile | 1600 × 2000 or larger portrait              |
| `/public/images/profile/about.webp`     | About story image                                     | 1200 × 1500 portrait                        |
| `/public/images/profile/editorial.webp` | The Builders’ Voice introduction                      | 1400 × 1100 landscape or editorial portrait |
| `/public/images/profile/community.webp` | Homepage impact chapter and Impact page               | 1600 × 1200 or larger                       |

Use real photographs you have permission to publish. A community photograph must not imply an unverified partnership or launched initiative. Strip location metadata before publishing. Export sRGB WebP with a useful balance of quality and file size; aim for a few hundred KB per source, inspect the result, and avoid enlarging small originals.

Edit each record in `src/lib/photography.ts`:

- `src`: root-relative local URL; `/public` is omitted from the URL.
- `alt`: describe the actual image once supplied; current alt strings are provisional.
- `focalPoint`: CSS object-position, for example `62% 30%` to keep the face clear of hero typography.
- `mobileFocalPoint`: independent small-screen position, for example `50% 20%`.
- `label`: understated editorial caption.

Use percentages between 0% and 100%. The mobile hero uses `object-fit: contain` so the whole photograph remains visible. Desktop uses `cover` with the configured focal point; a wide face-safe area on the image's right side works best with the left-side typography. Other editorial placements use cover; review their mobile focal points.

`Photograph` checks local file availability on the server and falls back to `placeholder.svg` when missing. Add images before a production build and redeploy afterward: static pages need to be rebuilt to pick up newly available photographs. No UI components need editing. The hero alone is preloaded; noncritical photographs load lazily with explicit `sizes`, fixed containers, and Next Image optimization. Local asset filenames stay consistent across redesigns.

Review desktop, tablet, narrow mobile, light/dark, keyboard focus, and reduced-motion behavior after replacing images. Confirm faces remain visible, captions have contrast, and images don't cause layout shifts. Real-photo cropping and final alt text cannot be validated until the assets are supplied.
