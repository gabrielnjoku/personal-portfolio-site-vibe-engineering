# How this was built

## Prompt Sequence (as actually used)

These are the exact prompts used to produce the delivered site, in order, each followed by the engineering pass done on top of the raw output.

### Prompt 1 — Architecture, no code yet
```
I'm building a personal portfolio site for a single developer (Gabriel Njoku).
Before writing any code, propose a sitemap: what sections should exist,
in what order, and why. The site should include a hero with a photo,
an About section, a Projects section with card-based layout, a Resume
section linking to a downloadable ATS-friendly CV, a Contact section,
and a sticky top nav + sticky footer. Do not write code yet — just the
outline and reasoning.
```
**Engineering notes:**
- Kept the proposed order (Hero → About → Projects → Resume → Contact → Footer) as-is — it matched how I'd naturally want a recruiter to read the page.
- Decided against a multi-page split here: with only 4 projects and a short bio, a single scrollable page with anchor links was less friction than routing between pages.
- Added the `id` attributes (`#hero`, `#about`, `#projects`, `#resume`, `#contact`) myself once the outline was agreed, since the model's proposal was prose, not markup.

### Prompt 2 — Design direction (locks the light theme)
```
Propose a light-themed visual style for this portfolio: background should
be white or off-white, text dark charcoal/navy, one accent color for
buttons/tags. No dark backgrounds anywhere on the page, including the
hero and project cards. Give me a small style guide: background color,
text color, accent color, heading font, body font, and card
background/border colors.
```
**Engineering notes:**
- This prompt exists specifically to prevent the typical dark theme usually defaulted to by the model — I stated the constraint ("no dark backgrounds anywhere") explicitly rather than trusting the model to infer it.
- Swapped the model's first font suggestion for the **Fraunces / Inter** pairing by hand — Fraunces for headings gives the hero some personality without leaning corporate, Inter keeps body text and skill tags legible at small sizes.
- Added the `<link rel="preconnect">` before the Google Fonts stylesheet myself; the model's first pass only included the stylesheet link, which is a minor but real performance miss.

### Prompt 3 — Hero section
```
Build the hero section in HTML/CSS using the style guide above. Include
my photo on the right, my name and title on the left, a short one-line
value proposition, and two buttons: "Download Resume" (links to
resume.pdf) and "View Projects" (anchors to the projects section).
Comment the CSS to explain the layout technique used (flex or grid).
```
**Engineering notes:**
- Model defaulted to Flexbox for the two-column layout; I switched it to CSS Grid (`.hero__inner`) so the text and photo columns could be sized independently without the wrapping quirks Flex introduced at tablet widths — and left a comment explaining the choice for whoever reads the CSS next.
- Added explicit `width`/`height` attributes on the `<img>` tag myself to prevent layout shift while the photo loads — the raw output left these off.
- Rewrote the alt text from a generic placeholder to `"Portrait of Gabriel Njoku"`.

### Prompt 4 — Sticky nav + sticky footer
```
Add a sticky top navigation bar with links to each section, and a
sticky footer with copyright and social links. Both should remain
visible on scroll without overlapping page content. Add code comments
explaining the position/z-index approach.
```
**Engineering notes:**
- The first draft only handled a desktop nav bar — I added the mobile hamburger overlay (`.nav__mobile`, `#navMobile`) and `script.js` myself, since the model's output wasn't touch-friendly below the breakpoint.
- Added `aria-label` and `aria-expanded` to the hamburger button by hand for screen-reader support — not present in the initial generation.
- Verified the sticky footer doesn't clip content on short viewports by testing at 375×667 and adjusting section bottom padding.

### Prompt 5 — Projects section
```
Build a Projects section as a responsive card grid (2 columns desktop,
1 column mobile) using the light style guide — white/off-white card
backgrounds, dark text, colored tag pills for tech stack. Populate it
with these four projects, each card showing: a project image showing the
attached image for each project, a title, tag pills for tech used, a
one-line "what it solved" summary, and a short paragraph on the process
from design to build to delivery:

1. MamaPutOnline — A complete Nigerian food delivery website UI built
   with hand-written HTML and CSS — no frameworks. Warm cultural design
   system with sticky nav, hero, menu grid, and footer, fully integrated
   into a single page.

2. Restaurante Peak — A multi-page fictitious restaurant website built
   with semantic HTML5 and vanilla CSS3. No frameworks, no JavaScript
   dependencies.

3. Nexus — Landing Page — A HTML/CSS project done as part of the Enugu
   Turing Tech Program. The goal was to take a UI design mockup and
   build it out using HTML and Tailwind CSS as closely as possible.

4. This Portfolio — the site you're looking at, fully responsive,
   vibe engineered with semantic HTML5, CSS Grid & Flexbox, and JS.

Comment the CSS grid logic.
```
**Engineering notes:**
- The four projects cards here were built in the light palette: white card backgrounds, charcoal text, colored tag pills instead of the old gold-on-dark pills.
- Cropped each project screenshot to a consistent 16:9 ratio with `object-fit: cover` by hand so the grid doesn't jump around when image aspect ratios differ.
- Rewrote each `project-card__summary` line myself to lead with the outcome ("Brought a Nigerian food delivery brand to life…") rather than the model's more generic first draft ("This project is about…").
- Fixed a stray leading-space indentation issue in the raw HTML output for this section during cleanup.

### Prompt 6 — About + Resume section
```
Create the content for the About section (two short bio paragraphs plus
a themed skills breakdown) and an on-page Resume summary — not the full
CV, just a scannable highlights list (roles, core skills, certifications,
education) with a "Download Full Resume" button linking to resume.pdf.
Keep the full resume content separately in plain, ATS-parseable text
(no tables, no graphics, no columns).
```
**Engineering notes:**
- Split the skills into four themed groups (Web Development, Cloud & DevOps, Cybersecurity, Systems & Languages) myself rather than the single flat comma-separated list the model first produced — much easier to scan.
- Deliberately kept the on-page Resume section short and pointed people to the PDF for the full version, so the page doesn't duplicate the entire CV inline.
- Built the actual `resume.pdf` separately from this content and linked it from three places (nav, hero, resume section) — the model gave me the text, the file production and wiring-up was manual.

**Further Engineering notes:**
- Trimmed a handful of comments that just restated the HTML tag name with no added information (e.g. "this is a paragraph").
- Added a few of my own where the model's comments didn't explain *why* — for example, noting sticky (not fixed) positioning was chosen for the footer so it clears the document flow instead of overlapping short pages.
- Left the section-divider comments (`<!-- ============ HERO ============ -->` style) as-is since they make the file easy to navigate.

---

