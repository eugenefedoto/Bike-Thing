// Important: must have MongoDB running with seeded data.

const supertest = require("supertest");
const app = require("../../app");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("integration -- /networks route", () => {
  let request;
  beforeEach(() => {
    request = supertest(app).get("/networks");
  });

  it("GET all networks and return all their JSON", done => {
    function hasArrayOfLength(res) {
      expect(res.body).to.be.an("array").and.to.have.lengthOf(1189);
    }

    request.expect(hasArrayOfLength).expect(200).end(done);
  });
});

describe("integration -- /networks/:_id route", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  it("GET a network and return its JSON", done => {
    const network = {
      company: ["Cyacle Bicycle Rental LLC"],
      location: {
        city: "Abu Dhabi",
        country: "AE",
        latitude: 24.450278,
        longitude: 54.39
      },
      name: "ADCB Bikeshare",
      _id: "5993a2be0d43ff1e8c7f72e0"
    };

    request.get("/networks/" + network._id).expect(network).expect(200, done);
  });

  it("GET a non-existing network and return a 500 error", done => {
    const network = {
      _id: "zxzxzxzxxzxxzcacas"
    };

    request.get("/networks/" + network._id).expect(500).end(done);
  });
});
