const request = require("supertest");
const app = require("../index");
const { connect, clear, close } = require("./setup");
const path = require("path");


// ------------------------
// Test setup & teardown
// ------------------------
beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clear();
});

afterAll(async () => {
  await close();
});

// ------------------------
// User Registration Tests
// ------------------------
describe("🧪 User Registration API Tests", () => {
  it("✅ should register a user successfully", async () => {
    const res = await request(app)
      .post("/api/v1/user/new")
      .field("name", "Test User")
      .field("email", "testuser@example.com")
      .field("password", "123456")
      .attach("image", path.join(__dirname, "files/sample.jpg"));

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/registered/i);
    expect(res.body.user).toHaveProperty("email", "testuser@example.com");
  });

  it("❌ should not allow duplicate email registration", async () => {
    // First registration
    await request(app)
      .post("/api/v1/user/new")
      .field("name", "User One")
      .field("email", "duplicate@example.com")
      .field("password", "123456")
      .attach("image", path.join(__dirname, "files/sample.jpg"));

    // Try registering again with same email
    const res = await request(app)
      .post("/api/v1/user/new")
      .field("name", "User Two")
      .field("email", "duplicate@example.com")
      .field("password", "abcdef")
      .attach("image", path.join(__dirname, "files/sample.jpg"));

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });
});

// ------------------------
// User Login Tests
// ------------------------
describe("🧪 User Login API Tests", () => {
  it("✅ should login successfully with correct credentials", async () => {
    // Register user first
    await request(app)
      .post("/api/v1/user/new")
      .field("name", "Login User")
      .field("email", "login@example.com")
      .field("password", "123456")
      .attach("image", path.join(__dirname, "files/sample.jpg"));

    // Login
    const res = await request(app)
      .post("/api/v1/user/login")
      .send({
        email: "login@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    expect(res.body.message).toMatch(/login successful/i);
  });

  it("❌ should not login with wrong password", async () => {
    // Register user
    await request(app)
      .post("/api/v1/user/new")
      .field("name", "Wrong Pass")
      .field("email", "wrongpass@example.com")
      .field("password", "correct123")
      .attach("image", path.join(__dirname, "files/sample.jpg"));

    // Login with wrong password
    const res = await request(app)
      .post("/api/v1/user/login")
      .send({
        email: "wrongpass@example.com",
        password: "wrong123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });

  it("❌ should return 404 if user is not found", async () => {
    const res = await request(app)
      .post("/api/v1/user/login")
      .send({
        email: "notfound@example.com",
        password: "any123",
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/user not found/i);
  });
});
