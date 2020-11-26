// test/server.js

var expect  = require("chai").expect;
const { ConsoleTranscriptLogger } = require("botbuilder");
var request = require("request");

describe("RGB to Hex conversion", function() {

    var url = "https://https://nteractive.socs.uoguelph.ca/";

    xit("returns status 200", function(done) {
        request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
        });
    });

});