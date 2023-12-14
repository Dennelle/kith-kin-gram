const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

const multer = require("multer");
const upload = multer();
/*---------- Public Routes ----------*/
// /api/users/signup

// 'photo' comes from the key name in signuppage/handlesubmit
// formData.append('photo', photo); matching the first arg
router.post("/signup", upload.single('photo'), usersCtrl.signup);
// /api/users/login
router.post("/login", usersCtrl.login);

// /api/users/jim <-- This must be what the request looks like from the client to hit this route
// /api/users/ted
// /api/users/kate
router.get('/:username', usersCtrl.profile);
/*---------- Protected Routes ----------*/

module.exports = router;



/*---------- Protected Routes ----------*/
