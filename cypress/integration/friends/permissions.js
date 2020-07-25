import * as faker from "faker/locale/pl";
import { fake } from "faker/locale/pl";

let avaiblePermission = ["BANNING_USERS", "ADD_GAME"];

function generateNewUser() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    gender: Math.floor(Math.random() * 2),
    dateOfBirth: faker.date.past(),
  };
}

function generateNewPermission(username) {
  return {
    permission:
      avaiblePermission[Math.floor(Math.random() * avaiblePermission.length)],
    username: username,
  };
}

let adminUser = { username: "admin", password: "admin" };

describe("Test permissions functionality", () => {
  //   beforeEach(() => {});
  it("Adding permission to user by admin", () => {
    let user = generateNewUser();
    let permission = generateNewPermission(user.username);
    cy.request("POST", "localhost:3000/users", user);
    cy.request("POST", "localhost:3000/login", adminUser).then((value) => {
      let accessToken = value.body.accessToken;

      cy.request({
        method: "POST",
        url: "localhost:3000/permissions",
        body: permission,
        auth: {
          bearer: accessToken,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
      });
    });
  });
  it("Error on non exist permission", () => {
    let user = generateNewUser();
    let permission = {
      username: user.username,
      permission: faker.lorem.word(),
    };
    cy.request("POST", "localhost:3000/users", user);
    cy.request("POST", "localhost:3000/login", adminUser).then((value) => {
      let accessToken = value.body.accessToken;

      cy.request({
        method: "POST",
        url: "localhost:3000/permissions",
        body: permission,
        auth: {
          bearer: accessToken,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(422);
      });
    });
  });
  it("Adding permission to user by user with permission for additing permissions", () => {
    let user1 = generateNewUser();
    let user2 = generateNewUser();
    let permissionToAddOtherPermissions = {
      username: user1.username,
      permission: "ADD_PERMISSION",
    };
    let permission = generateNewPermission(user2.username);
    cy.request("POST", "localhost:3000/users", user1);
    cy.request("POST", "localhost:3000/users", user2);
    cy.request("POST", "localhost:3000/login", adminUser).then((value) => {
      let accessToken = value.body.accessToken;

      cy.request({
        method: "POST",
        url: "localhost:3000/permissions",
        body: permissionToAddOtherPermissions,
        auth: {
          bearer: accessToken,
        },
      }).then((response) => {
        cy.request("POST", "localhost:3000/login", user1).then((value) => {
          let accessToken2 = value.body.accessToken;

          cy.request({
            method: "POST",
            url: "localhost:3000/permissions",
            body: permission,
            auth: {
              bearer: accessToken2,
            },
          }).then((response) => {
            expect(response.status).to.eq(201);
          });
        });
      });
    });
  });
});
