// 'use strict';
// background.js

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (activeInfo.tabId === !changeInfo.url.startsWith("https://www.flightradar24.com/")) {
            chrome.action.disable(tabId);
        } else {
            chrome.action.enable(tabId);
        }
    })
})
