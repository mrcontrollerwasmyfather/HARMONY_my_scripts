/* Fills all the unexposed frames with the "Zero" substitution on the selected frames.
Tested in: Harmony 24 ----- Lola Khattou (13)*/

function LK_FillExposureGaps(){

  scene.beginUndoRedoAccum("Fill Exposure Gaps");

// On the next line put the usual name you have for empty drawings in your current production.
  var emptySub = "Zero";

  var firstFrame = Timeline.firstFrameSel;
  var lastFrame = firstFrame + Timeline.numFrameSel - 1;
  var numLayers = Timeline.numLayerSel;

// Loop through columns to get the exposure ones
  for (var a=0;a<numLayers;a++){
    var thisColumn = Timeline.selToColumn(a);
    if (Timeline.selIsColumn(a) && column.type(thisColumn)=="DRAWING"){
// Loop through the frames to see which ones have no exposure
      for (var b=firstFrame;b<=lastFrame;b++){
        var currentSub = column.getEntry(thisColumn,1,b);
        if (currentSub == ""){
          var fillAction = column.setEntry(thisColumn,1,b,emptySub);
        }
      }
    }
  }

  scene.endUndoRedoAccum();

}