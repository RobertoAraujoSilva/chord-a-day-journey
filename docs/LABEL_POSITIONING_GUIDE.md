# Label Positioning Guide

## Quick Reference for Adjusting Image Labels

This guide helps you adjust the position of labels on educational images in the guitar learning application.

## ⚠️ Current Status

**Labels are currently DISABLED** because the existing images have embedded English text. The label definitions in `GuitarIntro.tsx` are commented out to avoid visual clutter and overlap.

**To enable labels**: First generate clean base images without embedded text, then uncomment and adjust the label positions following this guide.

## Where to Edit

All label positions are defined in `src/components/GuitarIntro.tsx` inside the component function (lines 42-97).

## How to Enable Labels

### Step 1: Generate Clean Base Images

Create new images WITHOUT any embedded text labels. See `docs/MULTILINGUAL_IMAGE_LABELS.md` for AI generation prompts and guidelines.

### Step 2: Replace Image Files

Save your clean base images to `src/assets/` with the same filenames:
- `guitar-anatomy.png`
- `posture-sitting.png`
- `left-hand-position.png`
- `chord-diagram-guide.png`

### Step 3: Uncomment Label Definitions

Open `src/components/GuitarIntro.tsx` and uncomment the label arrays:

```tsx
// Change this:
const anatomyLabels: ImageLabel[] = [
  // { key: 'lessons.intro.anatomy_labels.headstock', position: { top: '5%', right: '15%' } },
];

// To this:
const anatomyLabels: ImageLabel[] = [
  { key: 'lessons.intro.anatomy_labels.headstock', position: { top: '5%', right: '15%' } },
];
```

### Step 4: Adjust Positions

Follow the positioning guide below to fine-tune label positions for your specific images.

## Label Position Format

```tsx
const labelArray: ImageLabel[] = [
  { 
    key: 'lessons.intro.section.label_name',  // Translation key
    position: { 
      top: '10%',     // Distance from top (optional)
      left: '20%',    // Distance from left (optional)
      right: '15%',   // Distance from right (optional)
      bottom: '25%'   // Distance from bottom (optional)
    } 
  },
];
```

### Position Properties

- Use **percentages** (e.g., `'50%'`) for responsive positioning
- You can use any combination of:
  - `top` + `left`
  - `top` + `right`
  - `bottom` + `left`
  - `bottom` + `right`
- Avoid using conflicting properties (e.g., both `top` and `bottom`)

## Current Label Arrays

### 1. Guitar Anatomy Labels (`anatomyLabels`)

```tsx
const anatomyLabels: ImageLabel[] = [
  { key: 'lessons.intro.anatomy_labels.headstock', position: { top: '8%', left: '12%' } },
  { key: 'lessons.intro.anatomy_labels.tuning_pegs', position: { top: '12%', left: '5%' } },
  { key: 'lessons.intro.anatomy_labels.nut', position: { top: '18%', left: '15%' } },
  { key: 'lessons.intro.anatomy_labels.neck', position: { top: '35%', left: '25%' } },
  { key: 'lessons.intro.anatomy_labels.frets', position: { top: '28%', left: '40%' } },
  { key: 'lessons.intro.anatomy_labels.position_markers', position: { top: '42%', left: '35%' } },
  { key: 'lessons.intro.anatomy_labels.body', position: { top: '65%', right: '8%' } },
  { key: 'lessons.intro.anatomy_labels.sound_hole', position: { top: '58%', left: '35%' } },
  { key: 'lessons.intro.anatomy_labels.bridge', position: { top: '75%', left: '45%' } },
  { key: 'lessons.intro.anatomy_labels.strings', position: { top: '50%', left: '50%' } },
];
```

### 2. Posture Sitting Labels (`postureSittingLabels`)

```tsx
const postureSittingLabels: ImageLabel[] = [
  { key: 'lessons.intro.posture_labels.back_straight', position: { top: '15%', right: '10%' } },
  { key: 'lessons.intro.posture_labels.relaxed_shoulders', position: { top: '25%', left: '10%' } },
  { key: 'lessons.intro.posture_labels.guitar_on_leg', position: { top: '60%', right: '15%' } },
  { key: 'lessons.intro.posture_labels.feet_flat', position: { bottom: '10%', left: '20%' } },
];
```

### 3. Left Hand Position Labels (`leftHandLabels`)

```tsx
const leftHandLabels: ImageLabel[] = [
  { key: 'lessons.intro.posture_labels.thumb_behind', position: { top: '40%', left: '15%' } },
  { key: 'lessons.intro.posture_labels.fingertips', position: { top: '30%', right: '20%' } },
  { key: 'lessons.intro.posture_labels.wrist_straight', position: { bottom: '20%', left: '25%' } },
];
```

### 4. Chord Diagram Labels (`chordDiagramLabels`)

```tsx
const chordDiagramLabels: ImageLabel[] = [
  { key: 'lessons.intro.diagram_labels.nut', position: { top: '8%', left: '10%' } },
  { key: 'lessons.intro.diagram_labels.strings', position: { top: '15%', right: '10%' } },
  { key: 'lessons.intro.diagram_labels.frets', position: { top: '40%', left: '5%' } },
  { key: 'lessons.intro.diagram_labels.finger_position', position: { top: '35%', right: '15%' } },
  { key: 'lessons.intro.diagram_labels.open_string', position: { top: '5%', left: '30%' } },
  { key: 'lessons.intro.diagram_labels.muted_string', position: { top: '5%', left: '50%' } },
];
```

## How to Adjust Positions

### Step 1: Open the Application
Run `npm run dev` and open http://localhost:8082 in your browser.

### Step 2: Navigate to Lesson 0
Click on "Lesson 0: Guitar Fundamentals" to see the labeled images.

### Step 3: Identify Misaligned Labels
Look at each image and note which labels need adjustment.

### Step 4: Edit the Position Values
1. Open `src/components/GuitarIntro.tsx`
2. Find the appropriate label array (anatomyLabels, postureSittingLabels, etc.)
3. Adjust the percentage values:
   - **Increase `top`** → moves label DOWN
   - **Decrease `top`** → moves label UP
   - **Increase `left`** → moves label RIGHT
   - **Decrease `left`** → moves label LEFT
   - **Increase `right`** → moves label LEFT (from right edge)
   - **Decrease `right`** → moves label RIGHT (from right edge)

### Step 5: Save and Test
The application will hot-reload automatically. Check if the label is now in the correct position.

## Tips for Perfect Positioning

1. **Start with rough positioning**: Get labels in the general area first
2. **Fine-tune in 5% increments**: Adjust by 5% at a time for precision
3. **Test on different screen sizes**: Check mobile, tablet, and desktop views
4. **Use browser DevTools**: Inspect the label elements to see exact positions
5. **Consider label width**: Longer text labels need more space
6. **Avoid overlapping**: Make sure labels don't cover important image details

## Adding New Labels

To add a new label to an existing image:

```tsx
const anatomyLabels: ImageLabel[] = [
  // ... existing labels ...
  { 
    key: 'lessons.intro.anatomy_labels.new_part',  // Add translation first!
    position: { top: '50%', left: '50%' } 
  },
];
```

**Important**: Make sure to add the translation key to both:
- `src/i18n/locales/pt-BR/lessons.json`
- `src/i18n/locales/en-US/lessons.json`

## Removing Labels

Simply delete or comment out the label object from the array:

```tsx
const anatomyLabels: ImageLabel[] = [
  { key: 'lessons.intro.anatomy_labels.headstock', position: { top: '8%', left: '12%' } },
  // { key: 'lessons.intro.anatomy_labels.tuning_pegs', position: { top: '12%', left: '5%' } }, // Removed
  { key: 'lessons.intro.anatomy_labels.nut', position: { top: '18%', left: '15%' } },
];
```

## Custom Styling

You can add custom CSS classes to individual labels:

```tsx
{ 
  key: 'lessons.intro.anatomy_labels.body',
  position: { top: '65%', right: '8%' },
  className: 'bg-orange-100 text-orange-900 border-orange-400'  // Custom colors
}
```

## Troubleshooting

**Label is cut off at edge of image**:
- Move it away from the edge (adjust position values)
- Or use `right`/`bottom` instead of `left`/`top`

**Label overlaps with image content**:
- Adjust position to find empty space
- Consider making the label text shorter in translation files

**Label doesn't appear**:
- Check that the translation key exists in both language files
- Verify the position values are valid percentages
- Check browser console for errors

