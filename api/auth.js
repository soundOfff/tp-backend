const express = require('express');
const router = express.Router();

const{
    SignIn
} = require('../controller/auth')



router.route("/signin").post(SignIn);

module.exports = router;