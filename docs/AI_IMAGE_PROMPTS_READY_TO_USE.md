# Ready-to-Use AI Image Generation Prompts

Copy and paste these prompts directly into ChatGPT, Microsoft Copilot, or other AI image generators.

---

## Image 1: Guitar Anatomy Diagram

**Copy this prompt:**

```
Create a clean, professional educational diagram of an acoustic guitar showing all major parts. The image should be in a textbook illustration style with clear lines and neutral colors.

Include these parts clearly visible:
- Headstock with tuning pegs at the top
- Nut (where neck meets headstock)
- Neck with visible frets (metal bars)
- Position markers (dots on fretboard)
- Body (the large hollow part)
- Sound hole (circular opening in body)
- Bridge (where strings attach to body)
- All 6 strings running from headstock to bridge

CRITICAL REQUIREMENTS:
- NO TEXT LABELS anywhere on the image
- NO words, NO letters, NO annotations
- Clean, professional illustration
- White or very light gray background
- Side view showing the full guitar
- High contrast and clarity
- Educational textbook style
- Vector-art or clean illustration style

The image should look like a professional textbook diagram but completely blank of any text - labels will be added digitally later.
```

**Save as:** `guitar-anatomy.png` in `src/assets/`

---

## Image 2: Sitting Posture

**Copy this prompt:**

```
Create a clean, professional educational illustration showing correct guitar playing posture while sitting.

Show a person sitting on a chair demonstrating proper technique:
- Sitting upright with straight back
- Shoulders relaxed and level
- Acoustic guitar resting on right leg (right-handed player)
- Both feet flat on the floor
- Right arm resting naturally on guitar body
- Left hand on guitar neck
- 3/4 view or side view for clarity

CRITICAL REQUIREMENTS:
- NO TEXT LABELS anywhere
- NO words, NO arrows with text, NO annotations
- Simple, clean illustration style
- Neutral colors (blues, grays, or earth tones)
- White or light background
- Professional educational diagram style
- Clear body positioning visible
- Person should be gender-neutral or simplified

Style: Educational illustration, clean and professional, textbook diagram quality.
```

**Save as:** `posture-sitting.png` in `src/assets/`

---

## Image 3: Left Hand Position

**Copy this prompt:**

```
Create a close-up educational diagram showing the correct left hand position on a guitar neck.

Show:
- Left hand gripping guitar neck from the side
- Thumb positioned behind the neck (visible from side)
- Four fingers curved over the fretboard
- Fingertips pressing on strings (not flat fingers)
- Wrist straight and relaxed (not bent)
- Clear view of hand anatomy and finger positioning
- Close-up view focusing on hand and neck area

CRITICAL REQUIREMENTS:
- NO TEXT LABELS anywhere
- NO words, NO annotations, NO arrows with text
- Clean, professional illustration
- Neutral colors
- White or light background
- Educational diagram style
- Clear hand positioning
- Side or angled view showing thumb behind neck

Style: Educational close-up diagram, clear hand anatomy, professional textbook quality.
```

**Save as:** `left-hand-position.png` in `src/assets/`

---

## Image 4: Chord Diagram Guide

**Copy this prompt:**

```
Create a clean educational diagram showing a blank guitar chord diagram grid.

The diagram should show:
- 6 vertical lines representing the 6 guitar strings
- 5 horizontal lines representing frets
- A thick horizontal line at the very top representing the nut
- 2-3 black dots on the grid showing example finger positions
- An "O" symbol above one string (meaning open/play without pressing)
- An "X" symbol above another string (meaning don't play this string)
- Small numbers "1", "2", "3" inside the black dots (representing which finger to use)

CRITICAL REQUIREMENTS:
- NO TEXT LABELS except: the letters "O" and "X" above strings, and numbers "1", "2", "3" inside dots
- NO other words, NO explanatory text, NO annotations
- Clean, simple black and white diagram
- White background
- Professional educational style
- Clear, thick grid lines
- Minimalist design

This should look like a blank chord diagram template that teachers use, with just the basic symbols (O, X, and finger numbers) but no other text.

Style: Simple educational chord diagram, clean and minimal, textbook quality.
```

**Save as:** `chord-diagram-guide.png` in `src/assets/`

---

## How to Use These Prompts

### Step 1: Choose an AI Image Generator

**Free Options:**
- **Microsoft Copilot** (copilot.microsoft.com) - Free, uses DALL-E
- **Leonardo.ai** - Free tier available
- **Bing Image Creator** - Free

**Paid Options:**
- **ChatGPT Plus** with DALL-E - $20/month
- **Midjourney** - Subscription required

### Step 2: Generate Each Image

1. Copy the prompt for Image 1
2. Paste into your chosen AI tool
3. Generate the image
4. Download the result
5. If not satisfied, regenerate or adjust the prompt
6. Repeat for Images 2, 3, and 4

### Step 3: Save Images

Save each downloaded image with the exact filename to:
```
src/assets/guitar-anatomy.png
src/assets/posture-sitting.png
src/assets/left-hand-position.png
src/assets/chord-diagram-guide.png
```

### Step 4: Enable Labels

After saving all images, run this command to enable labels:

```bash
# The labels are currently commented out in GuitarIntro.tsx
# You'll need to uncomment them manually or I can help with that
```

---

## Tips for Best Results

✅ **Be patient** - May need 2-3 attempts per image  
✅ **Emphasize "NO TEXT"** - AI tools often add text by default  
✅ **Request regeneration** - If text appears, ask to remove it  
✅ **Adjust if needed** - You can modify prompts for better results  
✅ **Check resolution** - Make sure images are at least 1200px wide  

---

## Troubleshooting

**Problem: AI adds text labels anyway**
- Regenerate and emphasize "absolutely no text"
- Try: "The image must be completely blank of any words or letters"

**Problem: Image quality is low**
- Request: "high resolution, at least 1200 pixels wide"
- Try different AI tool

**Problem: Style doesn't match**
- Adjust style keywords: "textbook diagram", "educational illustration", "vector art"

**Problem: Wrong perspective**
- Specify: "side view", "3/4 view", "close-up", etc.

---

## Alternative: Manual Creation

If AI generation doesn't work well, you can:

1. **Use Canva** (canva.com) - Free templates
2. **Use Figma** (figma.com) - Free design tool
3. **Hire on Fiverr** - $5-20 per image
4. **Use existing images** - Find copyright-free images and edit out text

---

## Need Help?

After generating images, I can help you:
- ✅ Save them to the correct location
- ✅ Uncomment the label definitions
- ✅ Adjust label positions
- ✅ Test the multilingual system

