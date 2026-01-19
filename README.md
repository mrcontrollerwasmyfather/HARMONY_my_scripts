# HARMONY_my_scripts
Harmony scripts I made that I consider "done". I will still update them to fix any bug or flaw but I am happy with their features.

**CustomSaveState**
Writte little notes in your Harmony history to easily know where to undo.
Sometimes I want to fudge with some things in a rig to test out different options without creating a whole new version, but Harmony's undo history gets very bloated very fast. I made this to create little checkpoints in my undo history that I can click to get back to where I was before testing my stuff. There are probably other uses to this.
Script icon is the save point from Etrian Odyssey I.

**FillExposureGaps**
Fill every frame in which any drawing is unexposed with a substitution of your choice.
Currently fills them with a substitution named "Zero" but this is easy to customize even for someone with very little knowledge of scripting. 
Select the frames you want filled for the layers you want filled in your timeline and run this. If an element doesn't already have a substitution named "Zero" an empty one will be created.
🍔 This script suffers from the sandwich problem.

**FindColorTwins**
Tells you in the Message Log if there's another colour in your palette with the same RGB values as the selected colour.
*HOW TO USE:* simply select your color and run the script with your Message Log open. By default, tolerance is set to 0 (the script will only look for exact matches), but this should be easy to customize even for someone without scripting knowledge. Purposefully ignores the Alpha value but could be customized to take it into account with a bit of scripting knowledge. Doesn't work on gradients.

**RecolorNodes**
Change the color of all selected nodes based on a predetermined palette.
Should be pretty easy to customize to fit the color scheme of your current project even with minimal scripting knowledge.

**SetAntiAlias**
Change antialiasing quality attribute on the selected nodes.
