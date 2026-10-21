
const request = require("supertest");
const app = require("../app");

describe("Task Manager API Tests", () => {
    test("GET /health returns 200", async () => {
        const res = await request(app).get("/health");

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("ok");
    });

    test("GET /unknown-route returns 404", async () => {
        const res = await request(app).get("/unknown-route");

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Route not found");
    });
});
