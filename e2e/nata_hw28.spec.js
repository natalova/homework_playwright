// ENV_URL=http://5.189.186.217 npx playwright test nata_hw28.spec.js --headed --project chromium
const { test, expect } = require("@playwright/test");
import { faker } from "@faker-js/faker";

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
      headers: { "Content-Type": "application/json" }
    })
    
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body).toHaveProperty("token")
    USER.token = body.token
    console.log("AUTH", USER.token)
  })

  test.beforeEach(async ({ page }) => {
    page.addInitScript((value) => {
      window.localStorage.setItem("auth-token", value)},
      USER.token)
    await page.goto("/overview")
  })

  test("Create NEW category", async ({ page, request }) => {
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
    console.log("category:", categoryId)
    const createCategoryWithName = bodyCategory.name
    console.log("catname:", createCategoryWithName)

    await page.goto("/categories")
    await expect(page.locator(`//a[normalize-space()='${categoryName}']`)).toBeVisible()

    await page.evaluate((id) => {window.localStorage.setItem("categoryId", id)}, categoryId)

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
    console.log("product:", productId)
    const createProductWithName = bodyProduct.name
    console.log("prodname:", createProductWithName)
    const costOfCreatedProduct = bodyProduct.cost
    console.log("cost:", costOfCreatedProduct)

    const response = await request.delete(`/api/category/${_categoryId}`, {
      headers: {
        authorization: `${authToken}`,
      }
    })
    expect(response.status(200)).toBeTruthy()

    const body = await response.json()
    expect(body).toHaveProperty("message")

    const message = body.message
    console.log("result:", `${createCategoryWithName} ${message}`)
  })
})