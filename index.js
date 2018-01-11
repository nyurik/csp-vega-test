'use strict';

const express = require('express');
const csp = require( "simple-csp" );
const port = 7777;

const app = express();

const csp_headers = {
  'default-src': ["'self'"],
  'object-src': ['none'],
  'base-uri': ["'self'"],
  'form-action': ['none'],
  'sandbox': ['allow-scripts'],

  // Not sure why "self" is not working
  'frame-src': ["'self'", "http://localhost:7777", "http://sophox.org", "https://sophox.org"],
};


app.use( "/sandbox", (req, res, done) => {
  csp.header( csp_headers, res );
  done();
});

app.use( "/", express.static( "./public" ) );


app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`server is listening on ${port}`);
  }
});
