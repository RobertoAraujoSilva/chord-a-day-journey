# Guide: Generating Clean Base Images for Multilingual Labels

## Overview

To enable the multilingual label system, you need clean base images **without any embedded text**. This guide provides prompts and guidelines for generating these images.

## Why Clean Base Images?

✅ **Language independence** - One image works for all languages  
✅ **Easy updates** - Change label text without regenerating images  
✅ **Professional appearance** - Dynamic labels look polished  
✅ **Maintainability** - Fix typos by editing JSON, not images  

## Image Requirements

### General Guidelines

- **No embedded text** - Images should have NO text labels
- **Clear visual elements** - Parts should be clearly distinguishable
- **Neutral colors** - Use colors that work with orange label badges
- **High resolution** - At least 1200px wide for clarity
- **PNG format** - With transparency or white background
- **Consistent style** - All images should have similar visual style

### Optional: Numbered Indicators

You can include small numbered circles (1, 2, 3...) or dots to indicate where labels should point. This makes positioning easier but is not required.

## AI Image Generation Prompts

### 1. Guitar Anatomy Diagram

**Prompt for ChatGPT/DALL-E, Midjourney, or similar:**

```
Create a clean, professional educational diagram of an acoustic guitar showing all major parts. 
The image should be in a textbook illustration style with clear lines and neutral colors.

Include these parts clearly visible:
- Headstock with tuning pegs
- Nut
- Neck with frets
- Position markers (dots on fretboard)
- Body (upper bout, waist, lower bout)
- Sound hole with rosette
- Bridge with saddle
- Strings (all 6 visible)

IMPORTANT: 
- NO TEXT LABELS on the image
- Use small numbered circles (1-9) with thin lines pointing to each part
- White or light gray background
- Professional, clean illustration style
- Side view showing full guitar
- High contrast for clarity

Style: Educational textbook diagram, vector-art style, clean lines, professional
```

**Alternative simpler prompt:**
```
Clean educational diagram of acoustic guitar anatomy, no text labels, numbered 
indicators only, white background, professional illustration style, textbook quality
```

### 2. Sitting Posture Image

**Prompt:**

```
Create a clean, professional illustration showing correct guitar playing posture 
while sitting. Educational diagram style.

Show:
- Person sitting on chair with straight back
- Relaxed shoulders
- Guitar resting on right leg (for right-handed player)
- Feet flat on floor
- Proper arm positions
- Side or 3/4 view for clarity

IMPORTANT:
- NO TEXT LABELS
- Simple, clean illustration style
- Neutral colors (gray, blue, or earth tones)
- Clear body positioning
- Professional educational diagram
- White or light background

Style: Educational illustration, simple and clear, textbook diagram
```

### 3. Left Hand Position Image

**Prompt:**

```
Create a close-up educational diagram showing correct left hand position on 
guitar neck. Professional illustration style.

Show:
- Left hand on guitar neck
- Thumb positioned behind neck (visible)
- Fingers curved, using fingertips on strings
- Wrist straight (not bent)
- Clear view of hand anatomy and positioning
- Close-up view of neck and hand

IMPORTANT:
- NO TEXT LABELS
- Clean, professional illustration
- Clear hand positioning
- Neutral colors
- White or light background
- Educational diagram style

Style: Educational close-up diagram, clear hand anatomy, professional
```

### 4. Chord Diagram Guide

**Prompt:**

```
Create a clean educational diagram explaining how to read guitar chord diagrams.
Show a blank chord diagram grid with key elements visible.

Include:
- 6 vertical lines (representing strings)
- 5-6 horizontal lines (representing frets)
- Thick line at top (nut)
- Example dots showing finger positions
- "O" symbol above for open string
- "X" symbol above for muted string
- Numbers in dots (1, 2, 3) for finger numbers

IMPORTANT:
- NO TEXT LABELS (except O, X, and finger numbers 1-3 in dots)
- Clean, simple diagram
- Black and white or minimal color
- Professional educational style
- Clear grid lines
- White background

Style: Educational chord diagram, clean and simple, textbook quality
```

## Alternative: Manual Creation

### Using Graphic Design Tools

**Tools:**
- **Figma** (free, web-based)
- **Canva** (free tier available)
- **Adobe Illustrator** (professional)
- **Inkscape** (free, open-source)

**Steps:**
1. Find reference images online
2. Trace or recreate without text
3. Add numbered indicators if desired
4. Export as PNG (1200px+ width)
5. Save to `src/assets/` with correct filename

### Using Photo Editing

**Tools:**
- **Photoshop**
- **GIMP** (free)
- **Photopea** (free, web-based)

**Steps:**
1. Start with existing image
2. Use clone stamp or content-aware fill to remove text
3. Clean up artifacts
4. Export as PNG
5. Save to `src/assets/`

## File Naming and Placement

Save your clean images with these exact filenames in `src/assets/`:

1. `guitar-anatomy.png` - Guitar parts diagram
2. `posture-sitting.png` - Sitting posture illustration
3. `left-hand-position.png` - Hand position close-up
4. `chord-diagram-guide.png` - Chord diagram explanation

## After Generating Images

### Step 1: Replace Files
Copy your new clean images to `src/assets/` (overwrite existing files)

### Step 2: Enable Labels
Open `src/components/GuitarIntro.tsx` and uncomment the label arrays (lines 42-97)

### Step 3: Adjust Positions
Follow the guide in `docs/LABEL_POSITIONING_GUIDE.md` to position labels correctly

### Step 4: Test
1. Run `npm run dev`
2. Open http://localhost:8082
3. Navigate to Lesson 0
4. Check label positions
5. Switch languages to verify translations
6. Test on different screen sizes

## Tips for Best Results

✅ **Keep it simple** - Clean, uncluttered images work best  
✅ **High contrast** - Make sure parts are clearly distinguishable  
✅ **Consistent style** - All images should look like they belong together  
✅ **Test early** - Generate one image, test labels, then do the rest  
✅ **Iterate** - Don't expect perfection on first try  

## Example Workflow

1. **Generate guitar anatomy image** using AI prompt above
2. **Save to `src/assets/guitar-anatomy.png`**
3. **Uncomment anatomyLabels array** in GuitarIntro.tsx
4. **Test in browser** - adjust positions as needed
5. **Repeat for other images** once satisfied with first one

## Need Help?

- See `docs/LABEL_POSITIONING_GUIDE.md` for positioning help
- See `docs/MULTILINGUAL_IMAGE_LABELS.md` for system overview
- Check `docs/LABEL_FIX_SUMMARY.md` for current status

## Quick Start Command

After generating and saving your clean images:

```bash
# 1. Ensure dev server is running
npm run dev

# 2. Open GuitarIntro.tsx and uncomment label arrays

# 3. View in browser
# Navigate to http://localhost:8082 and go to Lesson 0

# 4. Adjust positions as needed
```

That's it! Your multilingual label system will be fully functional.

