// background.js

chrome.declarativeContent.onPageChanged.removeRules(async () => {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostPrefix: '*flightradar24.*' },
      }),
    ],
    actions: [
      new chrome.declarativeContent.SetIcon({
        imageData: {
          16: await loadImageData('icons/icon_16.png'),
          32: await loadImageData('icons/icon_32.png'),
        },
      }),
      chrome.declarativeContent.ShowAction
        ? new chrome.declarativeContent.ShowAction()
        : new chrome.declarativeContent.ShowPageAction(),
    ],
  }]);
});

// SVG icons aren't supported yet
async function loadImageData(url) {
  const img = await createImageBitmap(await (await fetch(url)).blob());
  const {width: w, height: h} = img;
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  return ctx.getImageData(0, 0, w, h);
}