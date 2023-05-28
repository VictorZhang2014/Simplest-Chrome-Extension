
//   1.Fires when user clicks the extension icon
// chrome.action.onClicked.addListener(execScript);

// or 2.Fires when the active tab in a window changes
// chrome.tabs.onActivated.addListener((r) => executeScript(r.tabId)); 

// or 3.Fires when the extension installed firstly or updated new version
// chrome.runtime.onInstalled.addListener(async function(details){ 
//     const tabId = await getTabId();
//     if(details.reason == "install"){

//     }else if(details.reason == "update"){
//         var thisVersion = chrome.runtime.getManifest().version;
//         console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
//     }
//     executeScript(tabId);
// });

// or 4.Fires when a tab is updated
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) { 
  if (changeInfo.status == 'complete' && tab.active) {
    executeScript(tabId);
  }
})


async function executeScript(tabId_) {
  const tabId = tabId_ ? tabId_ : await getTabId();
  chrome.scripting.executeScript({
    target: {tabId: tabId, allFrames: true},
    files: ['ext/execute.js']
  }) 
  .then(() => console.log("window.ethereum injected into webpage"))
  .catch((err) => console.log("window.ethereum injection error which is ", err));
}

async function getTabId() {
  const tabs = await chrome.tabs.query({active: true, currentWindow: true});
  return (tabs.length > 0) ? tabs[0].id : null;
}