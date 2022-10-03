# <img src="public/icons/icon_48.png" width="45" align="left"> Trackit

Chrome extension to easily switch between the plane tracking web apps. 

## Features

- Flightradar24
- ADSBExchange
- Flightaware
- RadarBox

## Install

[**Chrome** extension]()

## Contribution

After you clone the repo run below commands to build the extension in local. 

```sh
npm install
node ./node_modules/webpack/bin/webpack.js --mode=production --config config/webpack.config.js
```

It will be built under /build under folder.

