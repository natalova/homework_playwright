const axios = require('axios')
const {expect} = require('chai')
const data = require('./data/dummy_data.json')
const fs = require('fs-extra')


describe('login & getting token', async () => {

    it('get user by id', async() =>{
        const getUser = await axios.get(`${data.baseUrl}/users/1`)
        // console.log(getUser.data)
        userName = getUser.data.username
        userPwd = getUser.data.password
        expect(getUser.status).equal(200)
    })

    it('getting credentials', async() => {
        const getTokenData = await axios.post(`${data.baseUrl}/auth/login`,
        {
            'username': userName,
            'password': userPwd,
            expiresInMins: 30
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        // console.log(getTokenData.data)
        token_value = getTokenData.data.token
        data.token = token_value
        fs.writeFileSync('api_requests/data/dummy_data.json', JSON.stringify(data))
    })

})