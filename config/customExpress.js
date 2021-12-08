const express = require('express')
const dotenv = require('dotenv')
const consign = require('consign')

module.exports = () => {
    const app = express()

    dotenv.config()
    
    consign()
        .include('controllers')
        .into(app)

    return app
}