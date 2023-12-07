// npm i --save-dev  axios
// npm i --save-dev  mocha
// npm i --save-dev chai  
// npx mocha api_requests/usage_axios.js
// npm i --save-dev fs-extra
// npm i  --save-dev mochawesome
// npx mocha api_requests/login.js --timeout=30000 && npx mocha api_requests/usage_axios.js --timeout=30000

const axios = require('axios')
const {expect, use} = require('chai')
const data = require('./data/dummy_data.json')
const fs = require('fs-extra')

describe('Actions for users on dummy website', async() => {;
    let userId;
    let userName;
    let userLName;
    let userPwd;
    let token;

    it.skip('Create user', async() => {
        const createUser = await axios.post(`${data.baseUrl}/users/add`,
        {
            'firstName': 'Muhammad',
            'lastName': 'Ovi',
            'age': 250,
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(createUser.data)
        // userId = createUser.data.id
    })

    it('create product', async() => {
        const createProduct = await axios.post(`${data.baseUrl}/products/add`,
        {
            'title': 'MyOwnProduct'
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.token}`
                }
        })
        console.log(createProduct.data)
        expect(createProduct.status).equal(200)
    })

    it('get user by search params', async() => {
        const params = new URLSearchParams([['key', 'hair.color'], ['value', 'Brown']])
        const getUserByParams = await axios.get(`${data.baseUrl}/users/filter`, {params})
        expect(getUserByParams.status).equal(200)
        // console.log(getUserByParams.data.users[2])
        userName = getUserByParams.data.users[2].firstName
        userId = getUserByParams.data.users[2].id
        userLName = getUserByParams.data.users[2].lastName
        // console.log(userName)
        // console.log(userId)
        //Arely
    })

    it('get user by id and compare values', async() => {
        // userId = Number(userId)
        const getUser = await axios.get(`${data.baseUrl}/users/${userId}`)
        // console.log(getUser.data)
        expect(userName).equal(getUser.data.firstName)
        expect(userLName).equal(getUser.data.lastName)
    })
          
  it.skip('update user data', async () => {
    const updateUserData = await axios.patch(`${data.baseUrl}/users/${userId}`,
    {
        'firstName': 'Marko',
        'lastName': 'Polo',
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(updateUserData.data)
    console.log(updateUserData.statusText)
    console.log(updateUserData.status)
    })

})