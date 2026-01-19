/*Super simple script that lets you write something down in your undo history.
Tested in Harmony 20 & 24 . Lola Khattou (11) 
UPDATE 17/07/25: Added the if exec condition so the script wouldn't create an empty undo note upon the use clicking CANCEL. Also saved the initial selection before fudging with the nodes so that the user wouldn't loose their current selection.*/

function LK_CustomSaveState(){

  var nameDialog = new Dialog();
  nameDialog.title = "Create a checkpoint";
  var enterName = new LineEdit();
  enterName.label = "Name your save state:";
  enterName.text = "CHECKPOINT";
  nameDialog.add(enterName);


  if (nameDialog.exec()){

    var saveName = enterName.text;

    scene.beginUndoRedoAccum(saveName);

/*the undo/redo accum doesn't register if no change has happened to the scene so here I create a composite node and delete it immediately*/

/*but first let's save the current selection so that the script doesn't reset it*/

    var resetSelection = selection.selectedNodes();

    selection.selectAll();
    var startNodes = selection.selectedNodes();
    var startLength = startNodes.length;

    var ghostParent = startNodes[0];
    var ghostNode = node.add(node.parentNode(ghostParent), "SaveStateGhostNode", "COMPOSITE", 0, 0, 0);
    node.deleteNode(ghostNode,true,true);

/*I don't know how the code above could possibly malfunction but the code below is for if it does, so that you don't end up with an extra composite node in your scene unwittingly.*/

    selection.selectAll();
    var endNodes = selection.selectedNodes();
    var endLength = endNodes.length;
    if (startLength != endLength){
      MessageBox.information("ERROR: an extra composite node has been accidentally created.");
    }

    selection.clearSelection();
    selection.addNodesToSelection(resetSelection);
    scene.endUndoRedoAccum();
  }
}
