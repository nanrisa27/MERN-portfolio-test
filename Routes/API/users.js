const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');


//@route  GET api/profile
// @description register user
//@access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please add a valid email').isEmail(),
    check('password', 'please enter a password with six or more characters').isLength({ min: 6 })

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // see if user exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }


        //GET users gravator

        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"

        })

        user = new User({
            name,
            email,
            avatar,
            password
        });

        //encript the password using bcrypt

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();


        //return jsonWebToken
        res.send('User registerd')

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');

    }





});




module.exports = router;