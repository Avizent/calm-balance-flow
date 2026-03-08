

## Plan: Create Branded OG Image and Update References

### Approach
Use Lovable AI image generation (google/gemini-3-pro-image-preview) to create a professional 1200x630px branded OG image featuring the Cintia portrait with "Spessirits Pilates" text overlay and "Physio-led Pilates in Schilde" tagline. Then upload the generated image to backend storage and update all OG image references.

### Steps

1. **Create an edge function** (`supabase/functions/generate-og-image/index.ts`) that:
   - Calls the AI image generation API with a prompt describing a 1200x630 branded graphic: warm/earthy tones, "Spessirits Pilates" text, "Physio-led Pilates in Schilde" tagline, elegant Pilates studio aesthetic
   - Uploads the resulting image to a storage bucket (`og-images`)
   - Returns the public URL

2. **Create a storage bucket** (`og-images`, public) via database migration

3. **Build a small admin utility page** or one-time script component that triggers the edge function, displays the result, and confirms the URL

4. **Update OG image references** once the image is generated:
   - `src/components/SEO.tsx` — update `OG_IMAGE` constant to the new storage URL
   - `index.html` — update `og:image` and `twitter:image` meta tags

### Simpler alternative (recommended)
Since AI image generation produces unpredictable results for branded graphics with specific text placement, a more reliable approach:

1. **Create a static OG image component** rendered as a page (`/og-preview`) — a 1200x630 div with the Cintia portrait as background, brand name overlay, and tagline, styled with Tailwind
2. **Screenshot it** using browser tools to capture the exact design
3. **Save to `public/og-image.png`** and update all references

### Files to create/modify
| File | Change |
|------|--------|
| `src/pages/OgPreview.tsx` | Temporary page rendering the OG card at 1200x630 |
| `src/App.tsx` | Add temp route `/og-preview` |
| `src/components/SEO.tsx` | Update `OG_IMAGE` to `/og-image.png` (after capture) |
| `index.html` | Update `og:image` and `twitter:image` |

After capturing, the temp page/route will be removed.

