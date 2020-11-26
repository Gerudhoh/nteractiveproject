// test/server.js

const expect = require('chai').expect;
const request = require('request');

describe('Test bot connection', function() {
  const url = 'https://https://nteractive.socs.uoguelph.ca/';

  xit('returns status 200', function(done) {
    request(url, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
