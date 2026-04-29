/* Super simple batch rename cells.
Tested in: Harmony 22 ----- Lola Khattou
UPDATE 06/06/25: Made it so that no exposure cells would not trigger an error message. 
UPDATE 29/04/26: Completely changed the script to solve the sandwich problem.*/

function LK_RenameSubs(){

// THE UI
  var nameDialog = new Dialog();
  nameDialog.title = "Rename drawing substitution";

  var userInput = new LineEdit();
  userInput.label = "new name of current drawing substitution:";
  nameDialog.add(userInput);

// THE RENAMING
  if (nameDialog.exec()){
    scene.beginUndoRedoAccum("Rename Substituions");
    var newName = userInput.text;
    var selectedNodes = selection.selectedNodes();

    for(var i=0;i<selectedNodes.length;i++){
      var currentNode = _getDrawingInfoFromRead(selectedNodes[i]);
      var oldName = column.getEntry(currentNode.column,1,frame.current());
      column.renameDrawing(currentNode.column,oldName,newName);

/*Error message if the renaming failed.*/

      var currentName = column.getEntry(currentNode.column,1,frame.current());
      if (currentName != newName && currentName !=""){
       errorMessage = "Failed to rename " + column.getDisplayName(currentNode.column) + ". There may already be a cell with this name for this Drawing.";
       MessageBox.information(errorMessage);
      }
    }
  scene.endUndoRedoAccum();
  }
}

//UTILITIES

function _getDrawingInfoFromRead(readNode){

  var getElement = node.getElementId(readNode);
  var getColumn = "";

  var allColumns = column.getDrawingColumnList();
  for (j=0;j<allColumns.length;j++){
    var currentElement = column.getElementIdOfDrawing(allColumns[j]);
    if (currentElement == getElement && column.type(allColumns[j])=="DRAWING"){
      var getColumn = allColumns[j];
    }
   }

  if (getColumn == ""){
    MessageLog.trace("RenameSubs: cannot find a valid column for node " + readNode);
  }

  var getSubs = column.getDrawingTimings(getColumn);
  var currentSub = column.getEntry(getColumn,1,frame.current());

  return{
    node: readNode,
    element: getElement,
    column: getColumn,
    subs: getSubs,
    currentSub: currentSub
  }
}