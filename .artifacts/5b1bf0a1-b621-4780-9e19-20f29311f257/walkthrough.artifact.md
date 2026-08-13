# Viewport-Triggered Directional Card Reveal Animation

I've implemented a high-performance, scroll-triggered reveal system for the home page. This effect makes the site feel more dynamic and polished by having sections and cards "settle" into place as they enter the viewport.

## Key Implementation Details

### 1. `ScrollReveal` Component
A reusable React component that handles the logic of detecting when an element is visible and applying the necessary CSS classes.

- **IntersectionObserver**: Used for high-performance viewport detection (no scroll listeners).
- **Directional Support**: Supports `left`, `right`, `top`, and `bottom` origins.
- **Customizable**: Adjustable `delay`, `duration`, `distance`, and `threshold`.
- **Accessibility**: Automatically respects `prefers-reduced-motion`.

### 2. CSS-Driven Animations
The actual movement is handled by CSS transitions on the `transform` and `opacity` properties, which are GPU-accelerated for maximum smoothness.

```css
.scroll-reveal {
  opacity: 0;
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

.scroll-reveal.is-visible {
  opacity: 1;
}
```

## Changes Across Sections

| Section | Reveal Pattern | Staggering |
| :--- | :--- | :--- |
| **Hero** | Image (Left) / Text (Right) | 200ms delay for text |
| **Typing Practice** | Text (Left) / Image (Right) | 150ms delay for image |
| **Podcast** | Text (Left) / Image (Right) | 150ms delay for image |
| **Flashcards** | Image (Left) / Text (Right) | 150ms delay for text |
| **Offline** | Image (Left) / Text (Right) | 150ms delay for text |
| **Featured Modules** | Bottom (Header then Carousel) | 200ms delay for carousel |
| **Video Grid** | Bottom (Left video then Right) | 150ms stagger |
| **Call To Action** | Bottom (Whole collage) | - |

## Extension to Other Pages

### Modules Page
- **Notice Board**: Smooth bottom-to-top reveal.
- **Module Grid**: The first three modules reveal immediately with a quick stagger (`index * 100ms`), while remaining modules reveal on scroll.

### Typing Practice Page
- **Typing Hero**: The whole card slides up, with internal image (Left) and text (Right) sliding in from the sides.
- **Selection Gates**: Staggered reveal for the duration, test type, and unit mode selection gates.
- **Module Grid**: Fast staggered reveal (`index * 50ms`) for the searchable module cards.
- **Results**: Final results card settles into position from the bottom.

### Flashcards Page
- **Flashcards Hero**: Similar to Typing Hero, the card assembles with side reveals, and bottom-staggered controls.
- **Main Layout**: The flashcard area and its navigation buttons reveal together from the bottom.

### Support Page
- **Support Hero**: Smooth bottom-to-top reveal for the header content.
- **Support Cards**: Staggered entrance for each card (`Buy Me a Coffee`, `Report Correction`, `Suggest Idea`).
- **Security Disclaimer**: Settles in at the bottom.

### My Progress Page
- **Header & Stats**: The page header, streak card, and promo cards reveal sequentially.
- **Metric Cards**: The four main stat cards (`Assessments`, `Completion`, `Score`, `Tracked`) use a staggered reveal.
- **Module Breakdown**: Each module progress card reveals as the student scrolls down.

### Weeks Page
- **Roadmap Card**: Slides up from the bottom with a short delay.
- **Block Headers & Week Cards**: Staggered reveal for the first few items in each block, followed by scroll-triggered reveals for the rest.

## Performance & Best Practices
- **Observe Once**: Elements are "unobserved" as soon as they animate, reducing background workload.
- **Efficient Properties**: Only `transform` and `opacity` are animated to avoid layout shifts.
- **Modest Distances**: Movement is kept to ~60px to ensure the cards feel like they are settling, not flying in from off-screen.
