// this code will be executed when the extension's button is clicked
(function() {
  console.log('execute.js executed'); 
})(); 

// Inject `inpage.js` into the webpage of the active tab in Chrome browser
var s = document.createElement('script');
s.src = chrome.runtime.getURL('ext/inpage.js');
s.onload = function() { this.remove(); };
(document.head || document.documentElement).appendChild(s);

console.log("It already injected code into the webpage");
