var state = {};

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({ file: "content.js" });
});

function updateIcon(tabId) {
  var text;
  if (tabId in state) {
    text = state[tabId] ? "" + state[tabId] : "";
  } else {
    text = "";
  }
  chrome.browserAction.setBadgeText({tabId: tabId, text: text});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if ('state' in request) {
    state[sender.tab.id] = request.state;
    updateIcon(sender.tab.id);
  } else if ('setting' in request) {
    chrome.storage.sync.get({
      defaultMode: "1"
    }, function(items) {
      sendResponse(items.defaultMode);
    });
    return true;
  }
});

chrome.tabs.onActivated.addListener(function(e) {
  updateIcon(e.tabId);
});
