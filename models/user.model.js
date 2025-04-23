const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: [true, 'Please enter a username'],
            unique: true,
            minlength: [3, 'Username must be at least 3 characters'],
            maxlength: [20, 'Username cannot exceed 20 characters']
        },
        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email']
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
            minlength: [6, 'Password must be at least 6 characters']
        },
        profileImage: {
            type: String,
            default: "./uploads/profil/random-user.png"
        },
        bio: {
            type: String,
            max: 1024,
        },
        favorites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Destination'
        }]
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;