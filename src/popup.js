'use strict';

import './popup.css';

(function () {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  const counterStorage = {
    get: cb => {
      chrome.storage.sync.get(['count'], result => {
        cb(result.count);
      });
    },
    set: (value, cb) => {
      chrome.storage.sync.set(
        {
          count: value,
        },
        () => {
          cb();
        }
      );
    },
  };

  function setupCounter(initialValue = 0) {
    document.getElementById('counter').innerHTML = initialValue;

    document.getElementById('incrementBtn').addEventListener('click', () => {
      updateCounter({
        type: 'INCREMENT',
      });
    });

    document.getElementById('decrementBtn').addEventListener('click', () => {
      updateCounter({
        type: 'DECREMENT',
      });
    });
  }

  function updateCounter({ type }) {
    counterStorage.get(count => {
      let newCount;

      if (type === 'INCREMENT') {
        newCount = count + 1;
      } else if (type === 'DECREMENT') {
        newCount = count - 1;
      } else {
        newCount = count;
      }

      counterStorage.set(newCount, () => {
        document.getElementById('counter').innerHTML = newCount;

        // Communicate with content script of
        // active tab by sending a message
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          const tab = tabs[0];

          chrome.tabs.sendMessage(
            tab.id,
            {
              type: 'COUNT',
              payload: {
                count: newCount,
              },
            },
            response => {
              console.log('Current count value passed to contentScript file');
            }
          );
        });
      });
    });
  }

  function restoreCounter() {
    // Restore count value
    counterStorage.get(count => {
      if (typeof count === 'undefined') {
        // Set counter value as 0
        counterStorage.set(0, () => {
          setupCounter(0);
        });
      } else {
        setupCounter(count);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', restoreCounter);

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
    let icao = "ICAO";
    let flight = "flight";
    if (url.origin.indexOf("flightradar24") > -1) {
      let paths = url.pathname.split('/');
      icao = paths[paths.length - 1];
      flight = paths[paths.length - 2];
      document.getElementById('RadarBox').innerHTML = "<a href='https://radarbox.com/flight/" + flight + "'>YES</a>";
      document.getElementById('FlightAware').innerHTML = "<a href='https://flightaware.com/live/flight/" + flight + "'>YES</a>";
      document.getElementById('ADSBExchange').innerHTML = "<a href='https://globe.adsbexchange.com/?icao=" + icao + "'>YES</a>";
      document.getElementById('Flightradar24').innerHTML = "<a href='https://flightradar24.com/" + flight + "/" + icao + "'>YES</a>";
    }
    if (url.origin.indexOf("radarbox") > -1) {
      let paths = url.pathname.split('/');
      flight = paths[paths.length - 1];
    }
    if (url.origin.indexOf("adsbexchange") > -1) {
      let paths = url.pathname.split('/').split('=');
      icao = paths[paths.length - 1];
    }
    if (url.origin.indexOf("flightaware") > -1) {
      let paths = url.pathname.split('/');
      flight = paths[paths.length - 1];
    }
    // use `url` here inside the callback because it's asynchronous!
    console.log("CURRENT URL:" + url);
    document.getElementById('ICAO').textContent = icao;
    
  })
})();
