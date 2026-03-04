/*Change cosmetic parameters on multiple Master Controllers at once.
Tested in: Harmony 22 ----- Lola Khattou*/

//THE UI
function LK_BatchCleanMCs(){
  var mainDialog = new Dialog();
  mainDialog.title = "Batch Clean MCs";

  var groupControls = new GroupBox();
  groupControls.title = "Show Controls Mode";
  var radioNormal = new RadioButton();
  radioNormal.text = "Normal";
  var radioOnLoad = new RadioButton();
  radioOnLoad.text = "On Load";
  var radioAlways = new RadioButton();
  radioAlways.text = "Always";
  radioAlways.checked = true;
  groupControls.add(radioNormal);
  groupControls.newColumn();
  groupControls.add(radioOnLoad);
  groupControls.newColumn();
  groupControls.add(radioAlways);

  var groupLabel = new GroupBox();
  groupLabel.title = "Delete label:";
  var radioDeleteLabel = new RadioButton();
  radioDeleteLabel.text = "Yes";
  radioDeleteLabel.checked = true;
  var radioKeepLabel = new RadioButton();
  radioKeepLabel.text = "No";
  groupLabel.add(radioDeleteLabel);
  groupLabel.newColumn();
  groupLabel.add(radioKeepLabel);

  mainDialog.add(groupControls);
  mainDialog.add(groupLabel);

  if (mainDialog.exec()){
  scene.beginUndoRedoAccum("Edit Master Controllers");
    
    if (radioNormal.checked){
      changeControlsMode("Normal");
    }
    else if (radioOnLoad.checked){
      changeControlsMode("On Load");
    }
    else if (radioAlways.checked){
      changeControlsMode("Always");
    }
    else {
      MessageLog.trace("BatchCleanMCs: no option selected.");
    }

    if (radioDeleteLabel.checked){
      deleteLabel();
    }
  scene.endUndoRedoAccum();
  }
}

//Show Controls Mode
function changeControlsMode(controlsMode){
  var theNodes = selection.selectedNodes();
  for (a=0;a<theNodes.length;a++){
    if (node.type(theNodes[a]) == "MasterController"){
      node.setTextAttr(theNodes[a], "showControlsMode", frame.current(), controlsMode);
    }
    else{
      MessageLog.trace(theNodes[a] + " is not a Master Controller.");
    }
  }
}

//Delete labels
function deleteLabel(){
  var theNodes = selection.selectedNodes();
  for (a=0;a<theNodes.length;a++){
    if (node.type(theNodes[a]) == "MasterController"){
      node.setTextAttr(theNodes[a], "label", frame.current(), "");
      node.setTextAttr(theNodes[a], "labelsize", frame.current(), 0);
      node.setTextAttr(theNodes[a], "labelcolor.alpha", frame.current(), 0);
      node.setTextAttr(theNodes[a], "labelbgcolor.alpha", frame.current(), 0);
      node.setTextAttr(theNodes[a], "dynamiclabel", frame.current(), "");
    }
    else{
      MessageLog.trace(theNodes[a] + " is not a Master Controller.");
    }
  }
}