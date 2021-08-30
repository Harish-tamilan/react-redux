const controller = require('./controller');
const express = require('express');
const { Router } = require('express');
const router = express.Router();

router.get('/getCart', controller.getCartItems);
router.post('/addToCart', controller.addToCart);

module.exports = router;