import request from "supertest";
import connect, { MongoHelper } from "../db-helper";
import app from "../../src/app";

require('dotenv').config({ path: '../.env.test' });


describe("category controller test", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  // Setup a mock authentication and admin check middleware for tests
beforeEach(() => {
    jest.mock("../middlewares/adminCheck", () => (req: any, res: any, next:any) => next());
    jest.mock("passport", () => {
        const actualPassport = jest.requireActual("passport");
        return {
            ...actualPassport,
            authenticate: () => (req: any, res: any, next:any) => req.login({ id: "mockUserId", isAdmin: true }, { session: false }, next)
        };
    });
});

  // Test creating a category
  it("should create a category", async () => {
    const response = await request(app)
      .post("/api/v1/categories")
      .send({ name: "New Category" });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      name: "New Category",
      _id: expect.any(String),
      __v: expect.any(Number)
    });
  });

  // Test retrieving all categories
  it("should return list of categories", async () => {
    // Assuming the previous test has added one category
    const response = await request(app).get("/api/v1/categories");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toBe("New Category");
  });

  // Test updating a category
  it("should update a category", async () => {
    // First create a category to update
    let response = await request(app)
      .post("/api/v1/categories")
      .send({ name: "Update Me" });
    const categoryId = response.body._id;

    // Update the category
    response = await request(app)
      .put(`/api/v1/categories/${categoryId}`)
      .send({ name: "Updated Category" });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      name: "Updated Category"
    });
  });

  // Test fetching a category by name
  it("should get a category by name", async () => {
    // First create a category to fetch
    let response = await request(app)
      .post("/api/v1/categories")
      .send({ name: "Find Me" });
    const categoryName = response.body.name;

    // Fetch the category
    response = await request(app).get(`/api/v1/categories/${categoryName}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Find Me");
  });

  // Test deleting a category
  it("should delete a category", async () => {
    // First create a category to delete
    let response = await request(app)
      .post("/api/v1/categories")
      .send({ name: "Delete Me" });
    const categoryId = response.body._id;

    // Delete the category
    response = await request(app)
      .delete(`/api/v1/categories/${categoryId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Category deleted successfully" });
  });
});
