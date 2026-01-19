/* Just a simple way to recolor many nodes at once.
Tested in: Harmony 20 ----- Lola Khattou (04) */

// THE PALETTE

var cRed = new ColorRGBA(179, 0, 0,255);
var cPink = new ColorRGBA(237, 149, 211,255);
var cYellow = new ColorRGBA(245, 227, 27,255);
var cPurple = new ColorRGBA(106, 63, 191,255);
var cGreen = new ColorRGBA(0, 143, 0,255);
var cBlue = new ColorRGBA(32, 53, 145,255);
var cCyan = new ColorRGBA(124, 224, 230,255);
var cBlack = new ColorRGBA(0,0,0,255);
var namesArray = ["Red", "Pink", "Yellow", "Purple", "Green", "Blue", "Cyan", "Black"];


// THE UI

function LK_RecolorNodes(){

  var colorUI = new Dialog();
  colorUI.title = "Recolor Nodes";

  var radioColor = new RadioButton();
  radioColor.text = "Recolor selected nodes";
  radioColor.checked = true;
  var radioUnColor = new RadioButton();
  radioUnColor.text = "Delete color from selected nodes";

  var colorPicker = new ComboBox();
  colorPicker.label = "Choose a color";
  colorPicker.itemList = namesArray;
  
  colorUI.add(radioColor);
  colorUI.add(colorPicker);
  colorUI.add(radioUnColor);

  if (colorUI.exec()){
    if (radioColor.checked){
      var colorChoice = colorPicker.currentItem;
      colorNodes(colorChoice);
    }
    else if (radioUnColor.checked){
      unColorNodes();
    }
    else {
      MessageLog.trace("LK_RecolorNodes: No option selected.");
    }
  }
}

// COLORING NODES

function colorNodes(colorChoice){

  scene.beginUndoRedoAccum("Color Nodes");

  var theNodes = selection.selectedNodes();


  switch(colorChoice){
    case "Red":
      for (i=0;i<theNodes.length;i++){
        node.setColor(theNodes[i], cRed);
      };
      break;
    case "Pink":
      for (i=0;i<theNodes.length;i++){
        node.setColor(theNodes[i], cPink);
      };
      break;
    case "Yellow":
      for (i=0;i<theNodes.length;i++){
        node.setColor(theNodes[i], cYellow);
      };
      break;
    case "Purple":
      for (i=0;i<theNodes.length;i++){
        node.setColor(theNodes[i], cPurple);
      };
      break;
    case "Blue":
      for (i=0;i<theNodes.length;i++){
        node.setColor(theNodes[i], cBlue);
      };
      break;
    case "Green":
      for (i=0;i<theNodes.length;i++){
        node.setColor(theNodes[i], cGreen);
      };
      break;
    case "Cyan":
      for (i=0;i<theNodes.length;i++){
        node.setColor(theNodes[i], cCyan);
      };
      break;
    case "Black":
      for (i=0;i<theNodes.length;i++){
        node.setColor(theNodes[i], cBlack);
      };
      break;
    default:
       MessageLog.trace("Error: No color selected");
  }
  scene.endUndoRedoAccum();
}

// DELETE ALL COLORS

function unColorNodes(){

  scene.beginUndoRedoAccum("Uncolor Nodes");

  var theNodes = selection.selectedNodes();
  for (i=0;i<theNodes.length;i++){
    node.resetColor(theNodes[i]);
    }

  scene.endUndoRedoAccum();
}