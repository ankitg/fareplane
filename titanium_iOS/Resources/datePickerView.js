var win = Titanium.UI.currentWindow;
var self = Ti.UI.createView();
win.add(self);

var picker = Ti.UI.createPicker({
  top:50
});

var data = [];
data[0]=Ti.UI.createPickerRow({title:'Bananas'});
data[1]=Ti.UI.createPickerRow({title:'Strawberries'});
data[2]=Ti.UI.createPickerRow({title:'Mangos'});
data[3]=Ti.UI.createPickerRow({title:'Grapes'});

picker.add(data);
picker.selectionIndicator = true;

win.add(picker);