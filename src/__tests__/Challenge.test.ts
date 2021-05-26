import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Challenges", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new challenge", async () => {
        const response = await request(app).post("/challenges").send({
            type: "example",
            description: "Description Example.",
            amount: 60
        });

        expect(response.status).toBe(201);
    });
});