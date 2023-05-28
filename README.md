# The Simplest Chrome Extension

### Introduction

The project introduced several javascript files that are important to the extension and played different roles.
  - `before.js`, will be running at the start of the webpage (Note that, it is the active webpage you're accessing instead of the extension page. This is before the `DOMContentLoaded` event).
  - `after.js`, will be running at end of the webpage (Note that, the scripts run after the window's load event. This means the scripts run after the entire page has finished loading, including all synchronous and asynchronous scripts.)
  - `background.js`, is the tasks that you want to run in the background. For instance, add clicking listeners etc., so we add a listener `chrome.action.onClicked.addListener` for the clicking that user clicks on the top right corner of the browser. 
  - `execute.js`, is the file that is executed when user clicks the Extension icon on the top right corner of the browser. 
  - `inpage.js`, is the javascript file that will inject into the webpage.

<br/>

### CAUTION! Injecting code into the active tab of the webpage
[Reference Link](https://stackoverflow.com/questions/9515704/access-variables-and-functions-defined-in-page-context-using-a-content-script/9517879#9517879)
Inject a javascript file rather than just a snippet of code, and it's compatible in Manifest V3.

In `content_script.js` file, the code like below:
```
var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject-script.js');
s.onload = function() { this.remove(); };
(document.head || document.documentElement).appendChild(s);
```

The `inject-script.js` must be defined in the manifest.json
```
"web_accessible_resources": [{
  "resources": ["inject-script.js"],
  "matches": ["<all_urls>"]
}]
```

<br/>

To learn more examples on how to develop Chrome extension, referred to the [Github repo](https://github.com/GoogleChrome/chrome-extensions-samples).



