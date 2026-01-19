/* Lets you set the antialiasing quality on many drawing nodes at once.
Tested in: Harmony 20 ----- Lola Khattou (06) */

// THE ARRAY OF CHOICES

var allQualities = ["Do Not Change", "High", "Medium", "Medium Low", "Low", "None - No Transparency"];

// THE UI

function LK_SetAntiAlias(){

  var antialiasUI = new Dialog();
  antialiasUI.title = "Set antialiasing";

  var aaPicker = new ComboBox();
  aaPicker.label = "Antialisaing Quality";
  aaPicker.itemList = allQualities;
  
  antialiasUI.add(aaPicker);

  if (antialiasUI.exec()){
    var aaChoice = aaPicker.currentItem;
    applyAA(aaChoice);
  }else{
    MessageLog.trace("SetAntiAlias cancelled");
  }

}

// APPLYING THE CHANGES

function applyAA(aaChoice){

scene.beginUndoRedoAccum("Change Antialiasing");

  var theNodes = selection.selectedNodes();

  if (aaChoice == "Do Not Change"){
    MessageLog.trace("Antialiasing unchanged.");
  }else{
    for (i=0;i<theNodes.length;i++){
      var currentNode = theNodes[i];
      if (node.type(currentNode) == "READ"){
        node.setTextAttr(currentNode, "antialiasingQuality", frame.current(), aaChoice);
      }
    }
  }

scene.endUndoRedoAccum();

}