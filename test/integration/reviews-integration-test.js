// Important: must have MongoDB running

const supertest = require("supertest");
const app = require("../../app");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("integration -- /reviews", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  it("GET all reviews given a station id", done => {
    const reviews = [
      {
        station_id: "5993a2bf0d43ff1e8c7f72e1",
        network_id: "5993a2be0d43ff1e8c7f72e0",
        author: "Bill Gates",
        star_rating: 5,
        content:
          "This is the greatest station I've ever seen. Bikes are always available. Everything is so clean. I get amazing service. I feel so great. I want to give $10b to the owner!"
      },
      {
        station_id: "5993a2bf0d43ff1e8c7f72e1",
        network_id: "5993a2be0d43ff1e8c7f72e0",
        author: "Hibiki Tachibana",
        star_rating: 5,
        content:
          "So great. So amazing. I come here every day, and it's very convenient to get a bike to get me to school."
      }
    ];
    request
      .get("/reviews/5993a2bf0d43ff1e8c7f72e1")
      .expect(res => {
        expect(res.body[0].station_id).to.equal(reviews[0].station_id);
        expect(res.body[0].network_id).to.equal(reviews[0].network_id);
        expect(res.body[0].author).to.equal(reviews[0].author);
        expect(res.body[0].star_rating).to.equal(reviews[0].star_rating);
        expect(res.body[0].content).to.equal(reviews[0].content);
        expect(res.body[1].station_id).to.equal(reviews[1].station_id);
        expect(res.body[1].network_id).to.equal(reviews[1].network_id);
        expect(res.body[1].author).to.equal(reviews[1].author);
        expect(res.body[1].star_rating).to.equal(reviews[1].star_rating);
        expect(res.body[1].content).to.equal(reviews[1].content);
      })
      .expect(200)
      .end(done);
  });

  it("POST a review with valid data", done => {
    const review = {
      station_id: "5993a2bf0d43ff1e8c7f72e1",
      network_id: "5993a2be0d43ff1e8c7f72e0",
      author: "Chris Yukine",
      star_rating: 5,
      content:
        "Amazing service. Clean bikes. A+++++. Would use again. This stations makes every day brighter, and every journey better. No problems ever encountered. High availability."
    };
    request
      .post("/reviews/")
      .send(review)
      .expect(res => {
        expect(res.body.station_id).to.equal(review.station_id);
        expect(res.body.network_id).to.equal(review.network_id);
        expect(res.body.author).to.equal(review.author);
        expect(res.body.star_rating).to.equal(review.star_rating);
        expect(res.body.content).to.equal(review.content);
      })
      .expect(200)
      .end(done);
  });

  it("reject POST with a review === author > 50 chars length", done => {
    const review = {
      station_id: "5993a2bf0d43ff1e8c7f72e1",
      network_id: "5993a2be0d43ff1e8c7f72e0",
      author:
        "bikesbikesbikesbikesbikesbikesbikesbikesbikesbikesbikesbikesbikesbikesbikesbikesbikesbikesbikes",
      star_rating: 5,
      content:
        "Amazing service. Clean bikes. A+++++. Would use again. This stations makes every day brighter, and every journey better. No problems ever encountered. High availability."
    };
    request.post("/reviews/").send(review).expect(500).end(done);
  });

  it("reject POST with a review === negative rating", done => {
    const review = {
      station_id: "5993a2bf0d43ff1e8c7f72e1",
      network_id: "5993a2be0d43ff1e8c7f72e0",
      author: "Mark Zuck",
      star_rating: -1,
      content:
        "Amazing service. Clean bikes. A+++++. Would use again. This stations makes every day brighter, and every journey better. No problems ever encountered. High availability."
    };
    request.post("/reviews/").send(review).expect(500).end(done);
  });

  it("reject POST with a non-integer rating", done => {
    const review = {
      station_id: "5993a2bf0d43ff1e8c7f72e1",
      network_id: "5993a2be0d43ff1e8c7f72e0",
      author: "Mark Zuck",
      star_rating: 1.5,
      content:
        "Amazing service. Clean bikes. A+++++. Would use again. This stations makes every day brighter, and every journey better. No problems ever encountered. High availability."
    };
    request.post("/reviews/").send(review).expect(500).end(done);
  });

  it("reject POST with a review < 140 chars length", done => {
    const review = {
      station_id: "5993a2bf0d43ff1e8c7f72e1",
      network_id: "5993a2be0d43ff1e8c7f72e0",
      author: "Mark Zuck",
      star_rating: -1,
      content: "a"
    };
    request.post("/reviews/").send(review).expect(500).end(done);
  });
});
