# Enable Labels Checklist

Follow this checklist after generating clean base images.

## ✅ Pre-requisites

- [ ] All 4 clean base images generated (no embedded text)
- [ ] Images saved to `src/assets/` with correct filenames
- [ ] Development server is running (`npm run dev`)

## 📋 Step-by-Step Process

### Step 1: Verify Image Files

Check that these files exist in `src/assets/`:

- [ ] `guitar-anatomy.png` - Clean guitar diagram (no text)
- [ ] `posture-sitting.png` - Posture illustration (no text)
- [ ] `left-hand-position.png` - Hand position close-up (no text)
- [ ] `chord-diagram-guide.png` - Chord diagram grid (only O, X, numbers)

### Step 2: Open GuitarIntro.tsx

- [ ] Open `src/components/GuitarIntro.tsx` in your editor
- [ ] Navigate to lines 42-97 (label definitions section)

### Step 3: Uncomment Guitar Anatomy Labels

Find this section (around line 57):

```tsx
const anatomyLabels: ImageLabel[] = [
  // { key: 'lessons.intro.anatomy_labels.headstock', position: { top: '5%', right: '15%' } },
  // { key: 'lessons.intro.anatomy_labels.tuning_pegs', position: { top: '10%', right: '5%' } },
  // ... more commented lines
];
```

Remove the `//` from each line:

```tsx
const anatomyLabels: ImageLabel[] = [
  { key: 'lessons.intro.anatomy_labels.headstock', position: { top: '5%', right: '15%' } },
  { key: 'lessons.intro.anatomy_labels.tuning_pegs', position: { top: '10%', right: '5%' } },
  // ... uncomment all lines
];
```

- [ ] Uncommented all anatomyLabels

### Step 4: Uncomment Posture Sitting Labels

Find and uncomment the `postureSittingLabels` array:

- [ ] Uncommented all postureSittingLabels

### Step 5: Uncomment Left Hand Labels

Find and uncomment the `leftHandLabels` array:

- [ ] Uncommented all leftHandLabels

### Step 6: Uncomment Chord Diagram Labels

Find and uncomment the `chordDiagramLabels` array:

- [ ] Uncommented all chordDiagramLabels

### Step 7: Save and Test

- [ ] Save `GuitarIntro.tsx`
- [ ] Check browser (should auto-reload)
- [ ] Navigate to Lesson 0 in the app
- [ ] Verify labels appear on all 4 images

### Step 8: Test Language Switching

- [ ] Switch to Portuguese (pt-BR)
- [ ] Verify all labels change to Portuguese
- [ ] Switch back to English (en-US)
- [ ] Verify all labels change to English

### Step 9: Check Label Positions

For each image, verify:

#### Guitar Anatomy
- [ ] Headstock label points to headstock
- [ ] Tuning pegs label points to tuning pegs
- [ ] Nut label points to nut
- [ ] Neck label points to neck
- [ ] Frets label points to frets
- [ ] Body label points to body
- [ ] Sound hole label points to sound hole
- [ ] Bridge label points to bridge
- [ ] Strings label points to strings

#### Sitting Posture
- [ ] Back straight label positioned correctly
- [ ] Relaxed shoulders label positioned correctly
- [ ] Guitar on leg label positioned correctly
- [ ] Feet flat label positioned correctly

#### Left Hand Position
- [ ] Thumb behind label positioned correctly
- [ ] Fingertips label positioned correctly
- [ ] Wrist straight label positioned correctly

#### Chord Diagram
- [ ] Nut label positioned correctly
- [ ] Strings label positioned correctly
- [ ] Frets label positioned correctly
- [ ] Finger position label positioned correctly
- [ ] Open string label positioned correctly
- [ ] Muted string label positioned correctly

### Step 10: Adjust Positions (if needed)

If any labels are mispositioned:

- [ ] Open `docs/LABEL_POSITIONING_GUIDE.md`
- [ ] Follow the positioning guide to adjust
- [ ] Test changes in browser
- [ ] Repeat until all labels are correctly positioned

### Step 11: Test Responsive Design

Check labels on different screen sizes:

- [ ] Desktop (1920px+)
- [ ] Laptop (1366px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

Adjust if labels overlap or are cut off on any size.

### Step 12: Final Verification

- [ ] All labels visible and readable
- [ ] No overlapping labels
- [ ] Labels don't cover important image content
- [ ] Language switching works perfectly
- [ ] Responsive design works on all screen sizes
- [ ] No console errors in browser

## 🎉 Success!

If all checkboxes are checked, your multilingual label system is fully functional!

## 📝 Notes

- Label positions are in percentages for responsive design
- Adjust positions in `src/components/GuitarIntro.tsx`
- Translations are in `src/i18n/locales/*/lessons.json`
- See `docs/LABEL_POSITIONING_GUIDE.md` for detailed positioning help

## 🐛 Troubleshooting

**Labels don't appear:**
- Check that you uncommented the lines (removed `//`)
- Verify translation keys exist in both language files
- Check browser console for errors

**Labels in wrong position:**
- Adjust percentage values in position objects
- See positioning guide for help

**Labels overlap:**
- Adjust positions to spread them out
- Consider reducing number of labels
- Check on different screen sizes

**Language switching doesn't work:**
- Verify translation keys match in both language files
- Check that `useTranslation()` hook is working
- Clear browser cache and reload

## 🆘 Need Help?

If you encounter issues:

1. Check browser console for errors
2. Review `docs/LABEL_POSITIONING_GUIDE.md`
3. Review `docs/MULTILINGUAL_IMAGE_LABELS.md`
4. Ask for assistance with specific error messages

