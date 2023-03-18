// background.js

chrome.runtime.onInstalled.addListener(() => {
    // disable the action by default
    chrome.action.disable();
  
    // remove existing rules so only ours are applied
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      // add a custom rule
      chrome.declarativeContent.onPageChanged.addRules([
        {
          // define the rule's conditions
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { hostSuffix: "flightradar24.com" },
            }),
          ],
          // show the action when conditions are met
          actions: [new chrome.declarativeContent.ShowAction()],
        },
      ]);
    });
  });