'use strict'
const qiniu = require('qiniu')
const express = require('express')
const config = require('./config.js')

const app = express()

qiniu.conf.ACCESS_KEY = config.ACCESS_KEY
qiniu.conf.SECRET_KEY = config.SECRET_KEY
const uptoken = new qiniu.rs.PutPolicy(config.Bucket_Name)

app.get('/uptoken', (req, res, next) => {
	let token = uptoken.token()
	res.header('Cache-Control', 'max-age=0, private, must-revalidate')
	res.header('Pragma', 'no-cache')
	res.header('Expires', 0)
	if (token) {
	    res.json({
	        uptoken: token
	    })
	}
})

app.listen(3002)