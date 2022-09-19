// Import statement
const request = require("supertest");
const app = require("../app");

// Testvariable declaration

describe("Test the different http response codes on all response paths", () => {
  test("Response on the GET method on root path", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("Response on the GET method on /index", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // Different syntax does the same thing but shorter
  test("Response on the GET method /FAQ", async () => {
    const response = await request(app).get("/FAQ");
    expect(response.statusCode).toBe(200);
  });

  test("Response on the GET method /Fotos", async () => {
    const response = await request(app).get("/Fotos");
    expect(response.statusCode).toBe(200);
  });

  test("Response on the GET method /Kontaktformular", async () => {
    const response = await request(app).get("/Kontaktformular");
    expect(response.statusCode).toBe(200);
  });

  test("Response on the GET method /KontaktformularDaten", async () => {
    const response = await request(app).get("/KontaktformularDaten");
    expect(response.statusCode).toBe(200);
  });

  test("Response on the GET method /Anfragen", async () => {
    const response = await request(app).get("/Anfragen", (req, res) => {
      console.log(req);
      req.headers["user"] = "admin:supersecret";

      expect(response.statusCode).toBe(200);
    });
  });

  test("Response on the GET method /Impressum", async () => {
    const response = await request(app).get("/Impressum");
    expect(response.statusCode).toBe(200);
  });

  test("Response on the GET method /Datenschutz", async () => {
    const response = await request(app).get("/Datenschutz");
    expect(response.statusCode).toBe(200);
  });

  // Negative Tests
  test("Response on the GET method /NonExistent", async () => {
    const response = await request(app).get("/NonExistent");
    expect(response.statusCode).toBe(404);
  });

  test("Response on the GET method /Anfragen without password", async () => {
    const response = await request(app).get("/Anfragen");
    expect(response.statusCode).toBe(401);
  });

  test("Response on the GET method /Anfragen", async () => {
    const response = await request(app).get("/Anfragen", (req, res) => {
      //console.log(req); //Debugging Code
      req.headers["user"] = "admin:wrongpassword";

      expect(response.statusCode).toBe(401);
    });
  });
});
