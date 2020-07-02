import * as faker from "faker/locale/pl";
let correctUser1;
let correctUser2;
let friendship;
let accessToken1;
let accessToken2;
describe("Test login functionality", () => {
  beforeEach(() => {
    correctUser1 = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      gender: Math.floor(Math.random() * 2),
      dateOfBirth: faker.date.past(),
    };
    correctUser2 = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      gender: Math.floor(Math.random() * 2),
      dateOfBirth: faker.date.past(),
    };
    friendship = {
      friendUsername: correctUser2.username,
    };
    cy.request("POST", "localhost:3000/users", correctUser1);
    cy.request("POST", "localhost:3000/users", correctUser2);
    cy.request("POST", "localhost:3000/login", correctUser1).then((value) => {
      console.log(value.body);
      accessToken1 = value.body.accessToken;
    });
    cy.request("POST", "localhost:3000/login", correctUser2).then((value) => {
      console.log(value.body);
      accessToken2 = value.body.accessToken;
    });
  });
  it("Adding to friends", () => {
    cy.request({
      method: "POST",
      url: "localhost:3000/friends",
      body: friendship,
      auth: {
        bearer: accessToken1,
      },
    });
  });
});
