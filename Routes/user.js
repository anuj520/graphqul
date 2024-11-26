const { Router } = require('express');
const User = require('../model/user');
const router = Router();

router.get('/signin', (req, res) => {
  return res.render('signin');
});

router.get('/signup', (req, res) => {
  return res.render('signup');
});

router.post('/signin', (req, res) => {
 const{email,password} = req.body;

 const token = User.matchPasswordAndGenrateToken(email,password);

 return res.cookie("token",token).redirect("/");
});



router.post('/signup', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const newUser = await User.create({
      fullname,
      email,
      password
    });
   return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
