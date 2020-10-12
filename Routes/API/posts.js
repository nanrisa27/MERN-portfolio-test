const express = require('express');

const router = express.Router();


//@route  GET api/Posts
// @description Test route
//@access Public
router.get('/', (req, res) => res.send('posts route'))




module.exports = router;