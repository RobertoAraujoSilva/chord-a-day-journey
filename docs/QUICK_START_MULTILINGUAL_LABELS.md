# Quick Start: Multilingual Image Labels

## 🎯 Goal

Enable dynamic, translatable labels on educational images that automatically switch between Portuguese and English.

## 📊 Current Status

✅ **Label system implemented** - All code is ready  
✅ **Translations complete** - 38 labels in Portuguese and English  
✅ **Documentation complete** - All guides available  
⏸️ **Labels disabled** - Waiting for clean base images  

## 🚀 Quick Start (3 Steps)

### Step 1: Generate Clean Images (30-60 minutes)

**Option A: Use AI Image Generator (Recommended)**

1. Open **Microsoft Copilot** (copilot.microsoft.com) - FREE
2. Open `docs/AI_IMAGE_PROMPTS_READY_TO_USE.md`
3. Copy and paste each prompt (4 total)
4. Download the generated images
5. Save to `src/assets/` with correct filenames

**Option B: Hire a Designer**

1. Go to Fiverr.com
2. Search "educational diagram illustration"
3. Share the prompts from `docs/AI_IMAGE_PROMPTS_READY_TO_USE.md`
4. Cost: $5-20 per image

**Option C: Create Manually**

1. Use Canva.com or Figma.com
2. Follow guidelines in `docs/GENERATE_CLEAN_IMAGES.md`
3. Export as PNG (1200px+ width)

### Step 2: Enable Labels (5 minutes)

1. Save images to `src/assets/` with these exact names:
   - `guitar-anatomy.png`
   - `posture-sitting.png`
   - `left-hand-position.png`
   - `chord-diagram-guide.png`

2. Open `src/components/GuitarIntro.tsx`

3. Find lines 42-97 (label definitions)

4. Remove `//` from all commented label lines

5. Save the file

### Step 3: Test and Adjust (10-20 minutes)

1. Open http://localhost:8082
2. Navigate to Lesson 0
3. Check label positions
4. Switch languages to verify translations
5. Adjust positions if needed (see positioning guide)

**Done!** 🎉

## 📚 Documentation Reference

| Document | Purpose |
|----------|---------|
| `AI_IMAGE_PROMPTS_READY_TO_USE.md` | Copy-paste prompts for AI generators |
| `GENERATE_CLEAN_IMAGES.md` | Detailed image generation guide |
| `ENABLE_LABELS_CHECKLIST.md` | Step-by-step checklist for enabling |
| `LABEL_POSITIONING_GUIDE.md` | How to adjust label positions |
| `MULTILINGUAL_IMAGE_LABELS.md` | System architecture and overview |
| `LABEL_FIX_SUMMARY.md` | Why labels are currently disabled |

## 🎨 What You Need

### Required Images (4 total)

1. **Guitar Anatomy** - Full guitar with all parts visible
2. **Sitting Posture** - Person sitting with guitar
3. **Left Hand Position** - Close-up of hand on neck
4. **Chord Diagram** - Blank chord grid

### Critical Requirements

✅ **NO embedded text** (except O, X, numbers in chord diagram)  
✅ **High resolution** (1200px+ width)  
✅ **Clean, professional style**  
✅ **White or light background**  
✅ **PNG format**  

## 🔧 Technical Details

### Where Labels Are Defined

- **Code**: `src/components/GuitarIntro.tsx` (lines 42-97)
- **Portuguese**: `src/i18n/locales/pt-BR/lessons.json`
- **English**: `src/i18n/locales/en-US/lessons.json`

### How It Works

1. `LabeledImage` component overlays labels on images
2. Labels use CSS absolute positioning (percentages)
3. `useTranslation()` hook provides translated text
4. Labels update automatically when language changes

### Label Counts

- **Guitar Anatomy**: 9 labels
- **Sitting Posture**: 4 labels
- **Left Hand Position**: 3 labels
- **Chord Diagram**: 6 labels
- **Total**: 22 active labels (38 translations available)

## 💡 Tips for Success

✅ **Start with one image** - Test the system before doing all 4  
✅ **Emphasize "no text"** - AI tools often add text by default  
✅ **Test both languages** - Make sure switching works  
✅ **Check mobile view** - Labels should work on all screen sizes  
✅ **Iterate positions** - Adjust until labels point correctly  

## ⚡ Fast Track (If You Have ChatGPT Plus)

1. Open ChatGPT
2. Paste: "Generate 4 educational guitar images without text labels using the prompts in this file: [paste AI_IMAGE_PROMPTS_READY_TO_USE.md]"
3. Download all 4 images
4. Save to `src/assets/`
5. Uncomment labels in `GuitarIntro.tsx`
6. Done in 15 minutes!

## 🐛 Common Issues

**Issue**: AI adds text labels anyway  
**Fix**: Regenerate with emphasis on "absolutely no text"

**Issue**: Labels don't appear after uncommenting  
**Fix**: Check browser console for errors, verify file saved

**Issue**: Labels in wrong position  
**Fix**: Adjust percentages in position objects (see positioning guide)

**Issue**: Labels overlap  
**Fix**: Spread them out by adjusting top/left/right/bottom values

## 📞 Need Help?

1. **Check documentation** - See reference table above
2. **Check browser console** - Look for error messages
3. **Review examples** - See commented code in GuitarIntro.tsx
4. **Ask for help** - Provide specific error messages

## 🎯 Success Criteria

You'll know it's working when:

✅ All 4 images display with labels  
✅ Labels are in correct positions  
✅ Switching to Portuguese changes all labels  
✅ Switching to English changes all labels back  
✅ No overlapping or mispositioned labels  
✅ Works on desktop, tablet, and mobile  

## 🏁 Next Steps After Success

Once the system is working:

1. **Add more languages** - Create new translation files
2. **Add more images** - Use same pattern for other lessons
3. **Refine positions** - Fine-tune for perfect placement
4. **Share feedback** - Help improve the system

## 📈 Benefits You'll Get

✅ **One image, all languages** - No need for separate images  
✅ **Easy updates** - Fix typos in JSON, not images  
✅ **Professional appearance** - Clean, modern design  
✅ **Scalable** - Add new languages easily  
✅ **Maintainable** - Centralized translation management  

---

**Ready to start?** Open `docs/AI_IMAGE_PROMPTS_READY_TO_USE.md` and begin generating images!

