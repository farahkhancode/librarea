const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

//#1
  describe("GET /", () => {

//#2
    it("should return status code 200 and have 'Welcome to Blocipedia' in the body of the response", (done) => {
console.log('starting');
//#3

      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Blocipedia");
//#4
        done();
      });
    });

  });
});
