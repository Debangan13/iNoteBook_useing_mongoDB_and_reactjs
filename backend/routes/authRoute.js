const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { fetchuser } = require("../middleware/fetchuser");

// ROUTE 1: creating user
router.post(
	"/createuser",
	[
		body("name").isLength({ min: 3 }),
		body("email").isEmail(),
		body("password").isLength({ min: 5 }),
	],
	async (req, res) => {
		const { name, email, password } = req.body;
		let success = false
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const EmailAlreadyExists = await User.findOne({ email });
			if (EmailAlreadyExists) {
				return res
					.status(400)
					.json({ success,error: "Sorry a user with this email already exists." });
			}
			// hashing user password
			const salt = await bcrypt.genSalt(10);
			const hashPass = await bcrypt.hash(password, salt);

			const user = await User.create({
				name: name,
				email: email,
				password: hashPass,
			});
			// giving user a token to validate the user
			const token = jwt.sign(
				{ userId: user.id, name: name },
				process.env.JWT_SCERET,
				{ expiresIn: process.env.JWT_LIFETIME }
			);
			success = true
			res.status(201).json({ success,user: user, token: token });
		} catch (error) {
			console.log(error);
			res.status(500).json({ errro: "Some error occurred" });
		}
	}
);

// ROUTE 2: login user
router.post(
	"/login",
	[
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password cannot be blank").exists(),
	],
	async (req, res) => {
		const { name, email, password } = req.body;
		

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ error: "Please enter a valid email address" });
			}

			// comparing user password
			const isPasswordCorrect = await bcrypt.compare(password, user.password);
			if (!isPasswordCorrect) {
				return res.status(400).json({ error: "Invalid credentials" });
			}

			// giving user a token to validate the user
			const token = jwt.sign(
				{ userId: user.id, name: name },
				process.env.JWT_SCERET,
				{ expiresIn: process.env.JWT_LIFETIME }
			);
			
			res
				.status(201)
				.json({name: user.name, email: user.email, token: token });
		} catch (error) {
			console.log(error);
			res.status(500).json({ errro: "Internal server error" });
		}
	}
);

// ROUTE 3: get loggin User details
router.get("/getuser", fetchuser, async (req, res) => {
	try {
		const userId = req.user.userId;
		const user = await User.findById(userId).select("-password");
		res.status(200).json({ user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ errro: "Some error occurred" });
	}
});

module.exports = router;
