const { test, expect } = require("@playwright/test");
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: "serial" });

test.describe("Verofication steps for newborn website", () => {
  const USER = {
    email: "email@dmytro.com",
    password: "abc123",
    token: "",
  };

  test.beforeAll(async ({ request }) => {
    const response = await request.post("/api/auth/login", {
      data: {
        email: USER.email,
        password: USER.password,
      },
      headers: { "Content-Type": "application/json" },
    });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toHaveProperty("token");

    USER.token = body.token;
    console.log("AUTH", USER.token);
  });

  test.beforeEach(async ({ page }) => {
    page.addInitScript((value) => {
      window.localStorage.setItem("auth-token", value);
    }, USER.token);
    await page.goto("/overview");
    await expect(page.locator("ul > li.bold.last > a")).toHaveText("Вийти");
  });

 test("Create category", async ({ page, request }) => {
    const categoryName = faker.commerce.product()
    const authToken = await page.evaluate(() => {return localStorage.getItem("auth-token") 
})

    const responseCategory = await request.post("/api/category", {
      data: {
        name: categoryName,
      },
      headers: {
        authorization: `${authToken}`}
    })
    expect(responseCategory.status(201)).toBeTruthy()
    const bodyCategory = await responseCategory.json()
    expect(bodyCategory).toHaveProperty("_id")
    expect(bodyCategory).toHaveProperty("name")

    const categoryId = bodyCategory._id
    console.log("categoryId:", categoryId)

    const createCategoryWithName = bodyCategory.name
    console.log("create_Category_With_Name:", createCategoryWithName)

    //Check on UI that category has been created
    await page.goto("/categories")
    await expect(page.locator(`//a[normalize-space()='${categoryName}']`)).toBeVisible()

    //Set up categoryId to localStorage
    await page.evaluate((id) => {window.localStorage.setItem("categoryId", id)}, categoryId)

    //Step 2 → Create product for category
    const productName = faker.commerce.productName()
    const cost = faker.number.int(50);
    const _categoryId = await page.evaluate(() => {return localStorage.getItem("categoryId")
})

    const responseProduct = await request.post("/api/position", {
      data: {
        category: _categoryId,
        cost: cost,
        name: productName,
      },
      headers: {
        authorization: `${authToken}` 
    }
    })

    expect(responseProduct.status(201)).toBeTruthy()

    const bodyProduct = await responseProduct.json()
    expect(bodyProduct).toHaveProperty("_id")
    expect(bodyProduct).toHaveProperty("name")
    expect(bodyProduct).toHaveProperty("cost")
    expect(bodyProduct).toHaveProperty("category")

    const productId = bodyProduct._id
    console.log("productId:", productId)

    const createProductWithName = bodyProduct.name
    console.log("create_Product_With_Name:", createProductWithName)

    const costOfCreatedProduct = bodyProduct.cost
    console.log("cost_Of_Created_Product:", costOfCreatedProduct)

    //Step 3 → Remove category
    const response = await request.delete(`/api/category/${_categoryId}`, {
      headers: {
        authorization: `${authToken}`,
      }
    })
    expect(response.status(200)).toBeTruthy()

    const body = await response.json()
    expect(body).toHaveProperty("message")

    const message = body.message
    console.log("message:", `${createCategoryWithName} ${message}`)
  })
})