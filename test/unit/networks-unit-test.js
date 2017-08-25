const sinon = require("sinon");
const mongoose = require("mongoose");
require("../../app");
const Network = mongoose.model("Network");
const NetworkMock = sinon.mock(Network);
const networks = [
  {
    _id: "5993a2be0d43ff1e8c7f72e0",
    name: "ADCB Bikeshare",
    location: {
      latitude: 24.450278,
      city: "Abu Dhabi",
      longitude: 54.39,
      country: "AE"
    },
    company: ["Cyacle Bicycle Rental LLC"]
  },
  {
    _id: "5993a2bf0d43ff1e8c7f730f",
    name: "Alba",
    location: {
      latitude: 44.716667,
      city: "Alba",
      longitude: 8.083333,
      country: "IT"
    },
    company: ["Comunicare S.r.l."]
  },
  {
    _id: "5993a2bf0d43ff1e8c7f7319",
    name: "Andria in Bici",
    location: {
      latitude: 41.224346932834,
      city: "Andria",
      longitude: 16.296983922753956,
      country: "IT"
    },
    company: ["Comunicare S.r.l."]
  }
];

describe.only("unit -- /networks route", done => {
  it("returns a JSON response", function(done) {
    const arg1 = {};
    const arg2 = function(err, networks) {
      if (err) {
        console.log(err);
      } else {
        res.json(networks);
      }
    };
    NetworkMock.expects("find").withArgs(arg1, arg2).resolves(networks);

    Network.find(arg1, arg2);

    NetworkMock.verify();
    NetworkMock.restore();
    done();
  });
});
