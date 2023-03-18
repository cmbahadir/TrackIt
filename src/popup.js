'use strict';

import './popup.css';

(function () {

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    const url = new URL(tabs[0].url);
    let flight = "flight";
    let paths = url.pathname.split('/');
    flight = paths[paths.length - 1];

    if (url.origin.indexOf("flightradar24") > -1) {
      let json_id = paths[paths.length - 1];
      flight = paths[paths.length - 2];

      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          type: 'GET_FR24_ICAO',
          payload: {
            json_id: json_id,
          },
        },
        function(response) {
          // document.getElementById('icao').textContent = response.icao;
          document.getElementById('ADSBExchange').innerHTML = "<a href='https://globe.adsbexchange.com/?icao=" + response.icao + "' target='_blank'><img src='icons/adsbexchange.png'/></a>";
        }
      );
    }

    if (url.origin.indexOf("adsbexchange") > -1) {
      let paths = paths.split('=');
      icao = paths[paths.length - 1];
    }

    document.getElementById('flight').textContent = flight;
    document.getElementById('RadarBox').innerHTML = "<a href='https://radarbox.com/flight/" + flight + "' target='_blank'><img src='icons/radarbox.png'/></a>";
    document.getElementById('FlightAware').innerHTML = "<a href='https://flightaware.com/live/flight/" + flight + "' target='_blank'><img src='icons/flightaware.png'/></a>";
  })
})();
