import * as faker from "faker/locale/pl";

function generateNewUser() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    gender: Math.floor(Math.random() * 2),
    dateOfBirth: faker.date.past(),
  };
}

function generateFriendship(username) {
  return {
    friendUsername: username,
  };
}

function generateAllNewData() {
  let data = {
    user1: generateNewUser(),
    user2: generateNewUser(),
    friendship1: null,
    friendship2: null,
    accessToken1: null,
    accessToken2: null,
  };
  data.friendship1 = generateFriendship(data.user2.username);
  data.friendship2 = generateFriendship(data.user1.username);

  return data;
}

describe("Test friendship functionality", () => {
  //   beforeEach(() => {});
  it("Adding to friends", () => {
    let data = generateAllNewData();
    cy.request("POST", "localhost:3000/users", data.user1);
    cy.request("POST", "localhost:3000/users", data.user2);
    cy.request("POST", "localhost:3000/login", data.user1).then((value) => {
      data.accessToken1 = value.body.accessToken;

      cy.request({
        method: "POST",
        url: "localhost:3000/friends",
        body: data.friendship1,
        auth: {
          bearer: data.accessToken1,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });

  it("Get friends of user with invite", () => {
    let data = generateAllNewData();
    cy.request("POST", "localhost:3000/users", data.user1);
    cy.request("POST", "localhost:3000/users", data.user2);
    cy.request("POST", "localhost:3000/login", data.user1).then((value) => {
      data.accessToken1 = value.body.accessToken;

      cy.request({
        method: "POST",
        url: "localhost:3000/friends",
        body: data.friendship1,
        auth: {
          bearer: data.accessToken1,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        cy.request({
          method: "GET",
          url: "localhost:3000/friends",
          auth: {
            bearer: data.accessToken1,
          },
        }).then((response) => {
          expect(response.body).to.have.length(1);
        });
      });
    });
  });

  it("Get friends of user with accept", () => {
    let data = generateAllNewData();
    cy.request("POST", "localhost:3000/users", data.user1);
    cy.request("POST", "localhost:3000/users", data.user2);
    cy.request("POST", "localhost:3000/login", data.user1).then((value1) => {
      data.accessToken1 = value1.body.accessToken;
      cy.request("POST", "localhost:3000/login", data.user2).then((value2) => {
        data.accessToken2 = value2.body.accessToken;

        cy.request({
          method: "POST",
          url: "localhost:3000/friends",
          body: data.friendship1,
          auth: {
            bearer: data.accessToken1,
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
          cy.request({
            method: "GET",
            url: "localhost:3000/friends",
            auth: {
              bearer: data.accessToken2,
            },
          }).then((response) => {
            expect(response.body).to.have.length(1);
          });
        });
      });
    });
  });
  it("Error on adding same friendship", () => {
    let data = generateAllNewData();
    cy.request("POST", "localhost:3000/users", data.user1);
    cy.request("POST", "localhost:3000/users", data.user2);
    cy.request("POST", "localhost:3000/login", data.user1).then((value) => {
      data.accessToken1 = value.body.accessToken;

      cy.request({
        method: "POST",
        url: "localhost:3000/friends",
        body: data.friendship1,
        auth: {
          bearer: data.accessToken1,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        cy.request({
          method: "POST",
          url: "localhost:3000/friends",
          body: data.friendship1,
          auth: {
            bearer: data.accessToken1,
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(422);
        });
      });
    });
  });

  it("Error on adding same but with other user friendship", () => {
    let data = generateAllNewData();
    cy.request("POST", "localhost:3000/users", data.user1);
    cy.request("POST", "localhost:3000/users", data.user2);
    cy.request("POST", "localhost:3000/login", data.user1).then((value) => {
      data.accessToken1 = value.body.accessToken;
      cy.request("POST", "localhost:3000/login", data.user2).then((value) => {
        data.accessToken2 = value.body.accessToken;
        cy.request({
          method: "POST",
          url: "localhost:3000/friends",
          body: data.friendship1,
          auth: {
            bearer: data.accessToken1,
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
          cy.request({
            method: "POST",
            url: "localhost:3000/friends",
            body: data.friendship2,
            auth: {
              bearer: data.accessToken2,
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(422);
          });
        });
      });
    });
  });
});
