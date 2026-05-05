/* Find and replace Drawing Names in the Xsheet. Case-sensitive.
I can only figure out how to make it work when selecting drawings with Maj so far. If you select something from a far-away column with Ctrl the inbuilt xSheet methods don't take it into account.
This is only for Drawing columns but I didn't put a safeguard to stop you from using this on other kind of columns. Maybe some freaks can find a use for it on other column types.
Tested in Harmony 22 - Lola Khattou*/

function LK_XFindAndReplace(){

  scene.beginUndoRedoAccum("Find and replace Sub names");
  var xSelect = xsheet.getCursorPosition();

  //UI

  var frDialog = new Dialog();
  frDialog.title = "Find and Replace in the Xsheet";

  var dInstructions = new Label();
  dInstructions.text = "Make sure that you selected your subs using MAJ, and not CTRL.";
  frDialog.add(dInstructions);

  var findInput = new LineEdit();
  findInput.label = "FIND:";
  frDialog.add(findInput);

  var replaceInput = new LineEdit();
  replaceInput.label = "REPLACE:";
  frDialog.add(replaceInput);

  var rOptions = new GroupBox();
  var rRename = new RadioButton();
  rRename.text = "RENAME";
  rRename.checked = true;
  var rExpose = new RadioButton();
  rExpose.text = "EXPOSE";
  var rDuplicate = new RadioButton();
  rDuplicate.text = "DUPLICATE";
  rOptions.add(rRename);
  rOptions.newColumn();
  rOptions.add(rExpose);
  rOptions.newColumn();
  rOptions.add(rDuplicate);
  frDialog.add(rOptions);

  if (frDialog.exec()){
  //LOOP THROUGH DRAWINGS SELECTED IN THE XSHEET
    for(a=xSelect[0];a<=xSelect[2];a++){
      var columnID = xsheet.visibleLinkedColumn(a);
      for(b=xSelect[1];b<=xSelect[3];b++){
        var frameNumber = b + 1;
        var oldName = column.getEntry(columnID,1,frameNumber);
        var newName = _fAndR(oldName,findInput.text,replaceInput.text);
        if (rRename.checked){
          column.renameDrawing(columnID,oldName,newName);
        }
        else if (rExpose.checked){
          column.setEntry(columnID,1,frameNumber,newName);
        }
        else if (rDuplicate.checked){
          column.duplicateDrawingAt(columnID,frameNumber);
          var duplicateName = column.getEntry(columnID,1,frameNumber);
          column.renameDrawing(columnID,duplicateName,newName);
        }
        else {MessageLog.trace("LK_XFindAndReplace: no option selected.");}
      }
    }
  }

  scene.endUndoRedoAccum();

}

// UTILITIES

function _fAndR(source,find,replace){
  var findEx = new RegExp(find, "g");
  var newText = source.replace(findEx,replace);
  return newText;
}