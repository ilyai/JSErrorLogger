# JS Error Logger

A simple JavaScript library for tracking errors (unhandled exceptions) on clients by logging them via AJAX to the server.
It uses [TraceKit](https://github.com/csnover/TraceKit/) if avalable to get additional information about exception.

## Usage

1. Build concatenated and minified version with `make` *(make sure you have [UglifyJS](https://github.com/mishoo/UglifyJS) installed)*.
2. Include the `errorlogger.min.js` script at the very top of the page in header.
3. Implement server-side part that recieves JSON encoded message.
