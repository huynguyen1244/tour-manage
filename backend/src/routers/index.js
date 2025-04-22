const express = require('express');
const router = express.Router();
// const product = require('./products');

// router.use('/products', product);

router.use('/health', (req, res) => {
	return res.send('Server starting');
});

module.exports = router;
