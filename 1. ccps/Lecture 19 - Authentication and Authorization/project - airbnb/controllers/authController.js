const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs")

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: {email: ""},
    user: {}
  });
};

exports.postLogin = async (req, res, next) => {
  const {email, password} = req.body
  const user = await User.findOne({email}) 

  if(!user) {
    return res.status(422).render('auth/login', {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid email or password"],
      oldInput: {email},
      user: {}
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid password"],
      oldInput: {email},
      user: {}
    })
  }

  req.session.isLoggedIn = true
  req.session.user = user
  await req.session.save()
  res.redirect("/")
}

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: {firstName: "", lastName: "", email: "", password: "", userType: ""},
    user: {}
  });
};

exports.postSignup = [
  check("firstName")
  .trim()
  .isLength({min: 2})
  .withMessage("First name should be atleast 2 charaacters long")
  .matches(/^[a-zA-Z\s]+$/)
  .withMessage("First name should only be alphabets"),

  check("lastName")
  .matches(/^[a-zA-Z\s]*$/)
  .withMessage("Last name should only be alphabets"),

  
  check("email")
  .isEmail()
  .withMessage("Please enter a valid email")
  .normalizeEmail(),

  check("password")
  .isLength({min: 8})
  .withMessage("Password should be 8 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password should contain at least one uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Password should contain at least one lowercase letter")
  .matches(/[0-9]/)
  .withMessage("Password should contain at least one number")
  .matches(/[!@#$%^&*]/)
  .withMessage("Password should contain at least one special character")
  .trim(),

  check("confirmPassword")
  .trim()
  .custom((value, {req}) => {
    if(value !== req.body.password) {
      throw new Error("Password do not match")
    }
    return true
  }),

  check("userType")
  .notEmpty()
  .withMessage("Please select a user type")
  .isIn(['guest', 'host'])
  .withMessage("Invalid user type"),

  check("terms")
  .notEmpty()
  .withMessage("Please accept the terms and conditions")
  .custom((value, {req}) => {
    if(value !== "on") {
      throw new Error("accept the terms and conditions")
    }
    return true
  }),

  (req, res, next) => {
  const {firstName, lastName, email, password, userType} = req.body
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      pageTitle: "Signup",
      currentPage: "signup",
      isLoggedIn: false,
      errors: errors.array().map(error => error.msg),
      oldInput: {firstName, lastName, email, password, userType},
      user: {}
    })
  }

  bcrypt.hash(password, 10)
  .then(hashedPassword => {
    const user = new User({firstName, lastName, email, password: hashedPassword, userType})
    return user.save()
  })
  .then(() => {
    res.redirect("/login")
  })
  .catch(err => {
    return res.status(422).render("auth/signup", {
      pageTitle: "Signup",
      currentPage: "signup",
      isLoggedIn: false,
      errors: [err.message],
      oldInput: {firstName, lastName, email, password, userType},
      user: {}
    })
  })
}]


exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  })
}