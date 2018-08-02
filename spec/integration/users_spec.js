const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

  beforeEach((done) => {

    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("GET /users/signup", () => {

    it("should render a view with a sign up form", (done) => {
      request.get(`${base}signup`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign Up");
        done();
      });
    });

  });

  describe("POST /users/signup", () => {

  // #1
      it("should create a new user with valid values and redirect", (done) => {

        const options = {
          url: `${base}signup`,
          form: {
            username: "sampleusername",
            email: "user@example.com",
            password: "123456789"
          }
        }

        request.post(options,
          (err, res, body) => {

  // #2
            User.findOne({where: {username: "sampleusername"}})
            .then((user) => {
              expect(user).not.toBeNull();
              expect(user.email).toBe("user@example.com");
              expect(user.id).toBe(1);
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });




     it ("should create a hashed password", (done) => {
       const options = {
         url: `${base}signup`,
         form: {
           username: "sampleusername",
           email: "user@example.com",
           password: "123456789"
         }
       }

       request.post(options,
         (err, res, body) => {

           User.findOne({where: {username: "sampleusername"}})
              .then((user) => {
                expect(user).not.toBeNull();
                expect(user.email).toBe("user@example.com");
                expect(user.id).toBe(1);
                expect(user.password).not.toBe("123456789");
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });

      it("should not create a new user with invalid attributes and redirect", (done) => {
        request.post(
          {
            url: `${base}sign_up`,
            form: {
              username: "sampleusername",
              email: "no",
              password: "123456789"
            }
          },
          (err, res, body) => {
            User.findOne({where: {email: "no"}})
            .then((user) => {
              expect(user).toBeNull();
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });

    });

    describe("GET /users/signin", () => {
         it("should render a view with a sign in form", (done) => {
           request.get(`${base}signin`, (err, res, body) => {
             expect(err).toBeNull();
             expect(body).toContain("Sign In");
             done();
           });
         });

       });




});
