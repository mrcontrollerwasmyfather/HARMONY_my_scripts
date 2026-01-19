/* Searches the palette for colors that match the RGB value of your currently selected color. Only searches for exact matches by default but you can customize the tolerance (see below). Gives you the list in the Message Log. Will not work on gradients.
Tested in: Harmony 24 ----- Lola Khattou (09)
UPDATE 17/07/25: Added a custom error line in the Message Log if the user tries to use this script on a gradient.*/

function LK_FindColorTwins(){

/*You can set a custom tolerance on the line below, from 0 (exact matches) to 255 (anything goes - I don't know why you would want that but you can have it).*/
  var toleranceVariable = 0;	

  var paletteList = PaletteObjectManager.getScenePaletteList();	
  var paletteId = PaletteManager.getCurrentPaletteId();
  var palette = paletteList.getPaletteById(paletteId);
  var baseId = PaletteManager.getCurrentColorId();

/*Looping through the colors to find the index of the currently selected one because this is the argument that lets you access the rgb.*/

  for (i=0;i<palette.nColors;i++){
    var currentId = PaletteManager.getColorId(i);
    if (baseId == currentId){
      var baseColor = palette.getColorByIndex(i);
    }
  }

  var baseRed = baseColor.colorData.r;
  var baseGreen = baseColor.colorData.g;
  var baseBlue = baseColor.colorData.b;
  var baseName = baseColor.name;

  var loopResults = baseName;

  if (baseColor.colorType == 0){
    for (j=0;j<palette.nColors;j++){

      var comparedColor = palette.getColorByIndex(j);
      var comparedRed = comparedColor.colorData.r;
      var comparedGreen = comparedColor.colorData.g;
      var comparedBlue = comparedColor.colorData.b;
      var comparedName = comparedColor.name;
      var comparedId = PaletteManager.getColorId(j);

      var toleranceRed = Math.abs(baseRed - comparedRed);
      var toleranceGreen = Math.abs(baseGreen - comparedGreen);
      var toleranceBlue = Math.abs(baseBlue - comparedBlue);
      var largestTolerance = Math.max(toleranceRed, toleranceGreen, toleranceBlue);

      if (largestTolerance <= toleranceVariable && baseId != comparedId){
        loopResults += " = " + comparedName;
      }
    }
  }else{ 
    var loopResults = "Find Color Twins will not work on gradients.";
  } 
  if (loopResults == baseName){
    var loopResults = "There is no match in this palette for " + baseName;
  }
  MessageLog.trace(loopResults);
}