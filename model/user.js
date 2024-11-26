const { createHmac, randomBytes } = require('crypto');
const mongoose = require('mongoose');
const { CreateTokenUser } = require('../service/authentication');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    default: "./public/default.jpg"
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  }
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  try {
    const user = this;

    if (!user.isModified('password')) return next();
    
    const salt = "someRender";
    const hashPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    user.salt = salt;
    user.password = hashPassword;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

UserSchema.static("matchPasswordAndGenrateToken",async function (email,password){
  const user = await this.findOne({email})
  if (!user) throw new Error('User Not found');

  const salt = "someRender";
const hashPassword = user.password;

const userProvider = createHmac('sha256', salt).update(password).digest('hex');

if(hashPassword !== userProvider) throw new Error('Increate password');

const token = CreateTokenUser(user)
return token;
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
