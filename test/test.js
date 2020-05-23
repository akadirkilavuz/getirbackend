const docs = require("../app")
const request = require('supertest')

jest.setTimeout(10000); 
  describe("GET /documents", () => {
    test("ONLY POST METHOD", async () => {
      const response = await request(docs).get("/documents");
      expect(response.body).toStrictEqual({});
    });
  });
  describe("DELETE /documents", () => {
    test("ONLY POST METHOD", async () => {
      const response = await request(docs).delete("/documents");
      expect(response.body).toStrictEqual({});
    });
  });
  describe("PATCH Method on /documents", () => {
    test("ONLY POST METHOD", async () => {
      const response = await request(docs).patch("/documents");
      expect(response.body).toStrictEqual({});
    });
  });
  describe("PUT Method on /documents", () => {
    test("ONLY POST METHOD", async () => {
      const response = await request(docs).put("/documents");
      expect(response.body).toStrictEqual({});
    });
  });
  describe("POST /documents", () => {
    test("Request with true data", async () => {
      const response = await request(docs).post("/documents").send({  
        "startDate": "2015-01-26",
        "endDate": "2018-02-02",
        "minCount": 2900,
        "maxCount": 3000     
      });
      expect(response.body.code).toBe(0);
    });
  });

  describe("POST /documents", () => {
    test("Request with wrong date format", async () => {
      const response = await request(docs).post("/documents").send({  
        "startDate": "",
        "endDate": "2018-02-02",
        "minCount": 2900,
        "maxCount": 3000
            
      });
      expect(response.body.code).toBe(1);
    });
  });

  describe("POST /documents", () => {
    test("Request with wrong count", async () => {
      const response = await request(docs).post("/documents").send({  
        "startDate":"2015-01-26",
        "endDate": "2018-02-02",
        "minCount": 2900,
        "maxCount": "count",
      });
      expect(response.body.code).toBe(1);
    });
  });

  describe("POST /documents", () => {
    test("Request with startDate > endDate", async () => {
      const response = await request(docs).post("/documents").send({  
        "startDate": "2020-01-26",
        "endDate": "2018-02-02",
        "minCount": 2900,
        "maxCount": 3000     
      });
      expect(response.body.code).toBe(1);
    });
  });

  describe("POST /documents", () => {
    test("Request with minCount > maxCount", async () => {
      const response = await request(docs).post("/documents").send({  
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 3500,
        "maxCount": 3000     
      });
      expect(response.body.code).toBe(1);
    });
  });

  describe("POST /documents", () => {
    test("Request with startDate = endDate", async () => {
      const response = await request(docs).post("/documents").send({  
        "startDate": "2018-02-02",
        "endDate": "2018-02-02",
        "minCount": 2900,
        "maxCount": 3000     
      });
      expect(response.body.code).toBe(1);
    });
  });

  describe("POST /documents", () => {
    test("Request with minCount = maxCount", async () => {
      const response = await request(docs).post("/documents").send({  
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 3000,
        "maxCount": 3000     
      });
      expect(response.body.code).toBe(1);
    });
  });
 