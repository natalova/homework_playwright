const { test, expect } = require('@playwright/test');
const { isContext } = require('vm');

exports.ApiHelper = class ApiHelper {
    
    static async getToken(data) {
        const response = await playwright.request('/api/auth/login', {
            data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        expect(response.ok()).toBeTruthy()
        const serializeResponse = await response.json()
        expect(serializeResponse).toHaveProperty("token")
        return serializeResponse.token
    }
}