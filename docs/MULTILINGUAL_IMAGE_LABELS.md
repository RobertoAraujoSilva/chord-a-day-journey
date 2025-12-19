# Multilingual Image Labeling System

## Overview

The multilingual image labeling system allows educational images to have dynamic, translatable labels that update automatically when the user switches languages. This eliminates the need to create separate images for each language and makes it easy to fix label text without regenerating images.

## Architecture

### Components

#### `LabeledImage` Component
Located at `src/components/LabeledImage.tsx`

**Purpose**: Displays an image with dynamic, translatable labels overlaid using CSS absolute positioning.

**Props**:
- `src`: Image source path
- `alt`: Alt text for accessibility (should use `t()` for translation)
- `labels`: Array of `ImageLabel` objects defining label positions and translation keys
- `containerClassName`: Optional custom class for the container
- `imageClassName`: Optional custom class for the image

**Example Usage**:
```tsx
<LabeledImage 
  src={guitarAnatomyImg} 
  alt={t('lessons.intro.anatomy_title')}
  imageClassName="w-full rounded-lg shadow-lg"
  labels={[
    { key: 'lessons.intro.anatomy_labels.body', position: { top: '60%', right: '5%' } },
    { key: 'lessons.intro.anatomy_labels.neck', position: { top: '30%', left: '40%' } },
  ]}
/>
```

### Translation Structure

Labels are defined in the i18n translation files under `lessons.intro`:

**Portuguese** (`src/i18n/locales/pt-BR/lessons.json`):
```json
{
  "intro": {
    "anatomy_labels": {
      "body": "Corpo",
      "neck": "Braço",
      "bridge": "Cavalete",
      ...
    },
    "posture_labels": {
      "back_straight": "Costas Retas",
      ...
    },
    "diagram_labels": {
      "strings": "Cordas",
      ...
    }
  }
}
```

**English** (`src/i18n/locales/en-US/lessons.json`):
```json
{
  "intro": {
    "anatomy_labels": {
      "body": "Body",
      "neck": "Neck",
      "bridge": "Bridge",
      ...
    },
    "posture_labels": {
      "back_straight": "Back Straight",
      ...
    },
    "diagram_labels": {
      "strings": "Strings",
      ...
    }
  }
}
```

## Current Implementation Status

### ⚠️ Labels Currently Disabled

The dynamic labels are **currently disabled** (commented out in `GuitarIntro.tsx`) because the existing images have embedded English text labels. Enabling dynamic labels on top of embedded labels creates visual clutter and overlap.

### Ready for Clean Base Images

The label system is fully implemented and ready to use. Once you generate clean base images without embedded text, simply:

1. Replace the image files in `src/assets/`
2. Uncomment the label definitions in `src/components/GuitarIntro.tsx`
3. Adjust positions as needed using the positioning guide

### Prepared Label Definitions

Labels are defined and ready for these images:

1. **Guitar Anatomy** (`guitar-anatomy.png`)
   - 9 labels ready: headstock, tuning pegs, nut, neck, frets, body, sound hole, bridge, strings
   - Currently: **Disabled** (embedded English labels present)

2. **Posture - Sitting** (`posture-sitting.png`)
   - 4 labels ready: back straight, relaxed shoulders, guitar on leg, feet flat
   - Currently: **Disabled** (waiting for clean base image)

3. **Left Hand Position** (`left-hand-position.png`)
   - 3 labels ready: thumb behind, fingertips, wrist straight
   - Currently: **Disabled** (waiting for clean base image)

4. **Chord Diagram Guide** (`chord-diagram-guide.png`)
   - 6 labels ready: nut, strings, frets, finger position, open string, muted string
   - Currently: **Disabled** (waiting for clean base image)

## Benefits

✅ **Language Independence**: Base images contain no text, work for all languages
✅ **Easy Updates**: Fix label text by editing JSON files, no image regeneration needed
✅ **Dynamic Switching**: Labels update instantly when user changes language
✅ **Precise Positioning**: CSS positioning allows pixel-perfect label placement
✅ **Maintainability**: Centralized translation management
✅ **Scalability**: Easy to add new languages by adding translation files

## Future Improvements

### Generate Clean Base Images

For optimal results, generate new base images WITHOUT any embedded text:

**Recommended Approach**:
1. Use AI image generation or graphic design tools
2. Include numbered indicators (1, 2, 3...) or small circles where labels should point
3. Keep images clean and professional
4. Save as PNG with transparent or white backgrounds

**AI Image Generation Prompt Example**:
```
Clean educational diagram of an acoustic guitar showing labeled parts with thin 
lines pointing to: body, neck, bridge, headstock/tuners, frets, sound hole, nut, 
strings, position markers. Use small numbered circles (1-9) at end of each line 
where labels would go. NO TEXT LABELS. White background, professional illustration 
style. Similar to textbook diagram.
```

### Adjust Label Positions

After generating new base images, update the label positions in `GuitarIntro.tsx`:

```tsx
const anatomyLabels: ImageLabel[] = [
  { key: 'lessons.intro.anatomy_labels.headstock', position: { top: '8%', left: '12%' } },
  // Adjust percentages based on actual image layout
];
```

### Add More Languages

To add a new language (e.g., Spanish):

1. Create `src/i18n/locales/es-ES/lessons.json`
2. Add the same label structure with Spanish translations
3. Update `src/i18n/types.ts` to include the new locale
4. Labels will automatically work for the new language

## Technical Notes

- Labels use `absolute` positioning relative to the image container
- Position values are percentages for responsive scaling
- Labels have hover effects for better UX
- `pointer-events: none` prevents labels from interfering with interactions
- Responsive text sizing using Tailwind's responsive classes (2xl, 3xl)

