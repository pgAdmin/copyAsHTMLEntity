function copyWorkAround(data) {
  document.body.innerHTML = "<input id='inp'>"
  document.getElementById('inp').value = data;
  document.getElementById('inp').select();
  document.execCommand('copy');
}

var clickTo = {
  ASCII: function (info) {
    console.log(translate(info.selectionText, { }));
    copyWorkAround(translate(info.selectionText, { }));
  },
  Hex: function (info) {
    console.log(translate(info.selectionText, { hex: true }));
  }
};

function translate(str, options) {
  var result = '';
  var length = str.length;
  for (var i = 0; i < length; i++) {
    result += '&#' + (options.hex ? 'x' + str.charCodeAt(i).toString(16) : str.charCodeAt(i)) + ';';
  }
  return result;
}

chrome.contextMenus.create({ "title": "To ASCII", "contexts":["selection"], "onclick": clickTo['ASCII']});
chrome.contextMenus.create({ "title": "To Hex", "contexts":["selection"], "onclick": clickTo['Hex']});
