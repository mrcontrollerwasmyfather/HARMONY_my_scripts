/* Convert a node into a blank node of any other type. Can be used to quickly name/create a lot of specialized nodes that don't have keyboard shortcuts associated with them.
There is also a preset to convert pegs into statics while keeping their current position. More advanced presets to come later.

Tested in: Harmony 22 ----- Lola Khattou*/

function LK_SwapNodeType(){

  var sntUI = new Dialog();
  sntUI.title = "Swap node type";

  var radioBasic = new RadioButton();
  radioBasic.text = "Swap to empty node";
  radioBasic.checked = true;
  var radioStatic = new RadioButton();
  radioStatic.text = "Convert Peg to Static";

  var typeInput = new LineEdit();
  typeInput.label = "new type:";

  var typeError = new Label();
  typeError.text = "Enter valid node type.";

  sntUI.add(radioBasic);
  sntUI.add(typeError);
  sntUI.add(typeInput);
  sntUI.add(radioStatic);

  var typeProceed = true;

  while (typeProceed == true){

    if (sntUI.exec()){
      if (radioBasic.checked){
      // quickest way to my knowledge to test if the input is a valid node type:
        var placeholderName = "LK_SWAPNODETYPE_PLACEHOLDER_NODE_" + typeInput.text;
        var testTypeNode = node.add(node.root(),placeholderName,typeInput.text,0,0,0);
        var testType = node.type(testTypeNode);
        scene.undo();

        if (testType == "PLACEHOLDER" && typeInput.text != "PLACEHOLDER"){
          typeError.text = "Invalid node type.";
        }
        else if (typeInput.text == "READ"){
          typeError.text = "LK_SwapNodeType doesn't work on READs yet.";
        }
        else {
          var typeProceed = false;
          _swapNodeType(typeInput.text,"default");
        }
      }
      else if (radioStatic.checked){
        var typeProceed = false;
        _swapNodeType("StaticConstraint","static");
      }
    }
    else{
      var typeProceed = false;
    }

  }

}

function _swapNodeType(newType,preset){

  scene.beginUndoRedoAccum("Swap node types");

  var selectedNodes = selection.selectedNodes();
  var selectedGroups = 0;
  var staticExceptions = 0;
 
  for (a=0;a<selectedNodes.length;a++){

    var ogNode = selectedNodes[a];
    var ogName = node.getName(ogNode);
    var ogPath = node.parentNode(ogNode);
    var ogX = node.coordX(ogNode);
    var ogY = node.coordY(ogNode) + node.height(ogNode);
    var ogZ = node.coordZ(ogNode);

    var ogPosX = node.getAttr(ogNode,frame.current(),"position.x").doubleValue();
    var ogPosY = node.getAttr(ogNode,frame.current(),"position.y").doubleValue();
    var ogPosZ = node.getAttr(ogNode,frame.current(),"position.z").doubleValue();
    var ogScaleX = node.getAttr(ogNode,frame.current(),"scale.x").doubleValue();
    var ogScaleY = node.getAttr(ogNode,frame.current(),"scale.y").doubleValue();
    var ogRot = node.getAttr(ogNode,frame.current(),"rotation.anglez").doubleValue();
    var ogSkew = node.getAttr(ogNode,frame.current(),"skew").doubleValue();

    if (node.type(ogNode) != "PEG"){
      staticExceptions += 1;
    }

    var ogInputs = [];
    for (b=0;b<node.numberOfInputPorts(ogNode);b++){
      ogInputs.push(node.srcNodeInfo(ogNode,b));
    }
    var ogOutputs = [];
    for (e=0;e<node.numberOfOutputPorts(ogNode);e++){
      var subOutputs = [];
      for (f=0;f<node.numberOfOutputLinks(ogNode,e);f++){
        subOutputs.push(node.dstNodeInfo(ogNode,e,f));
      }
      ogOutputs.push(subOutputs);
    }

    if (node.type(ogNode) != "GROUP"){

      for (d=0;d<ogInputs.length;d++){
        node.unlink(ogNode,d);
      }

      node.deleteNode(ogNode,true,true);
      var newNode = node.add(ogPath,ogName,newType,ogX,ogY,ogZ);
      
      for (c=0;c<ogInputs.length;c++){
        if (typeof ogInputs[c] == "object"){
          node.link(ogInputs[c].node,ogInputs[c].port,newNode,c,true,true);
        }
      }
      for (g=0;g<ogOutputs.length;g++){
        var linkSubOutputs = ogOutputs[g];
        for (h=0;h<linkSubOutputs.length;h++){
          if (typeof linkSubOutputs[h] == "object"){
            node.link(newNode,g,linkSubOutputs[h].node,linkSubOutputs[h].port,true,true);
          }
        }
      }

      var newInputs = node.numberOfInputPorts(newNode);
      var newOutputs = node.numberOfOutputPorts(newNode);
      if (ogInputs.length > newInputs || ogOutputs.length > newOutputs){
        MessageLog.trace("LK_SwapNodeType: Some node view links had to be deleted due to the new node type not supporting the same amount or type of ports as the former node type.");
      }

      //SPECIAL PRESETS
      if (preset == "static"){
        node.setTextAttr(newNode,"active",frame.current(),"true");
        node.setTextAttr(newNode,"translate.x",frame.current(),ogPosX);
        node.setTextAttr(newNode,"translate.y",frame.current(),ogPosY);
        node.setTextAttr(newNode,"translate.z",frame.current(),ogPosZ);
        node.setTextAttr(newNode,"scale.x",frame.current(),ogScaleX);
        node.setTextAttr(newNode,"scale.y",frame.current(),ogScaleY);
        node.setTextAttr(newNode,"rotate.anglez",frame.current(),ogRot);
        node.setTextAttr(newNode,"skewx",frame.current(),ogSkew);
      }
      //END OF PRESETS

    }
    else {
      selectedGroups += 1;
    }

  }

  if (selectedGroups > 0){
    MessageBox.information("Skipped " + selectedGroups + " group nodes.");
  }

  if (staticExceptions > 0 && preset == "static"){
    MessageBox.information("Some of the selected nodes were not pegs. The baking of the position into the new Static may have unpredictable results.");
  }

  scene.endUndoRedoAccum();

}

