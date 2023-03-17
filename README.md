# <img src="public/icons/icon_48.png" width="45" align="left"> TrackIt

# TrackIt Extension

The TrackIt Extension is a browser extension that allows you to track flights on various flight tracking websites.

## Installation

1. Download the latest release of the FlightTracker Extension from the [releases page](https://github.com/cmbahadir/trackit/releases).

2. Extract the downloaded file to a folder on your computer.

3. Open your browser's extensions page:

    - Chrome: [chrome://extensions/](chrome://extensions/)

4. Enable developer mode.

5. Click on "Load unpacked" or "Load unpacked extension" and select the folder where you extracted the downloaded file.

6. The extension is now installed and ready to use!

## Usage

1. Navigate to flightradar24.com.

2. Click on a flight on the map to view its information.

3. The TrackIt will automatically detect the callsign and icao address and provide links to track the flight on other flight tracking websites.

## Contributing

Contributions are always welcome! Please create a pull request with your changes.

To build the extension: 

```sh
npm install
node ./node_modules/webpack/bin/webpack.js --mode=production --config config/webpack.config.js
```

It will be built under /build under folder.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


