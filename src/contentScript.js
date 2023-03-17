'use strict';

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_FR24_ICAO') {
    const url = "https://data-live.flightradar24.com/clickhandler/?version=1.5&flight="
    let icao = "ICAO"

    fetch(url + request.payload.json_id)
      .then(res => res.json())
      .then(data => {
        icao = data["aircraft"]["hex"];
        console.log("ICAO: " + icao);
        sendResponse({
          icao,
        });
      });
  }
  return true;
});
