const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


//@route  GET api/profile
// @description register user
//@access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please add a valid email').isEmail(),
    check('password', 'please enter a password with six or more characters').isLength({ min: 6 })

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('users route')

});




module.exports = router;