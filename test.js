var supertest = require("supertest");
var app = require("./app");
var chai = require("chai");
var expect = chai.expect;

describe("homepage", function() {
  var request;
  beforeEach(function() {
    request = supertest(app)
      .get("/")
  });

  it("returns a 200 response", function(done) {
    request.expect(200).end(done);
  });
});
