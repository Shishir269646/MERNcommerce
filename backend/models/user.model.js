const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);


//Hash password before saving to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password isn't modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


//Custom method to compare entered password with hashed one
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
