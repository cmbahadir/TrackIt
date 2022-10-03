'use strict';

import './popup.css';

(function () {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions

  function contentLoaded() {
    // TODO: While Pop-Up DOM loaded.
  }

  document.addEventListener('DOMContentLoaded', contentLoaded);

  // Communicate with background file by sending a message
  chrome.runtime.sendMessage(
    {
      type: 'GREETINGS',
      payload: {
        message: 'Hello, my name is Pop. I am from Popup.',
      },
    },
    response => {
      console.log(response.message);
    }
  );

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
          document.getElementById('icao').textContent = response.icao;
          document.getElementById('ADSBExchange').innerHTML = "<a href='https://globe.adsbexchange.com/?icao=" + response.icao + "'>GO</a>";
        }
      );
    }

    if (url.origin.indexOf("adsbexchange") > -1) {
      let paths = paths.split('=');
      icao = paths[paths.length - 1];
    }

    document.getElementById('flight').textContent = flight;
    document.getElementById('RadarBox').innerHTML = "<a href='https://radarbox.com/flight/" + flight + "'>GO</a>";
    document.getElementById('FlightAware').innerHTML = "<a href='https://flightaware.com/live/flight/" + flight + "'>GO</a>";
    //TODO: json_id should be fetched fwith content_script.js
    document.getElementById('Flightradar24').innerHTML = "<a href='https://flightradar24.com/" + flight + "/" + "json_id" + "'>GO</a>";

  })
})();
