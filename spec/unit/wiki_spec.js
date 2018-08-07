const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Wiki = require("../../src/db/models").Wiki;



describe("Wiki", () => {
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


describe("#create()", () => {
  it("should create a public wiki object with valid title and body", (done) => {
    Wiki.create({
       title: "Wiki title 1",
       body: "Wiki body",
       private: false
    })
    .then((wiki) => {
             expect(wiki.title).toBe("Wiki title 1");
             expect(wiki.body).toBe("Wiki body");
             expect(wiki.private).toBe(false);
             done();
      })
      .catch((err) => {
                console.log(err);
                done();
            });
    });
    it("should not create a wiki with a title already taken", (done) => {
          Wiki.create({
               title: "Wiki title 1",
               body: "Wiki body.",
               private: false
            })
            .then((wiki) => {
               Wiki.create({
                   title: "Wiki title 1",
                   body: "Body of duplicate Wiki",
                   private: false
               })
               .then((wiki) => {
                  // the code in this block will not be evaluated since the validation error
                  // will skip it. Instead, we'll catch the error in the catch block below
                  // and set the expectations there
                  done();
                })
                .catch((err) => {
                  expect(err.message).toContain("Validation error");
                  done();
                });
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            });

        });

    it("should not create a wiki with missing title or body", (done) => {
             Wiki.create({
               title: "Wiki title",
               body: "Wiki body"
             })
             .then((post) => {

              // the code in this block will not be evaluated since the validation error
              // will skip it. Instead, we'll catch the error in the catch block below
              // and set the expectations there

               done();

             })
             .catch((err) => {

               expect(err.message).toContain("Wiki.title cannot be null");
               expect(err.message).toContain("Wiki.body cannot be null");
               done();

             })
           });


    describe("User can have many wikis- association", () => {
                 it("should associate a wiki to a user", (done) => {
                     User.create({
                         username: "sampleusername",
                         email: "user@example.com",
                         password: "1234567890"
                     })
                     .then((user) => {
                         this.user = user;

                         Wiki.create({
                             title: "Wiki title",
                             body: "Wiki body",
                             private: false,
                             userId: this.user.id
                         })
                         .then((wiki) => {
                             expect(wiki.userId).toBe(this.user.id);
                             done();
                         })
                         .catch((err) => {
                             console.log(err);
                             done();
                         })
                     })
                     .catch((err) => {
                         console.log(err);
                         done();
                     })
                 });
             });
     });
