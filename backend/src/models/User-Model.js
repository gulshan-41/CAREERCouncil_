import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    age: {
        type: String,
        required: true
    },

    occupation: {
        type: String,
        required: true
    },

    strengths: {
        type: Object,
        required: true
    },

    interests: {
        type: Object,
        required: true
    },
}, {timestamps: true} );



// Strong hashing options for argon2
const options = {
    type: argon2.argon2id,      // Best all-around (resists GPU & side-channel attacks)
    memoryCost: 2 ** 16,        // 64 MB
    timeCost: 5,                // Iterations (increase for more security)
    parallelism: 2,             // Number of threads (adjust per CPU core)
};

//Password hashing pre befor storing in database 
UserSchema.pre('save', async function (next) {

    const user = this;
    if (!user.isModified('password')) {
        const error = {
            status: 401,
            msg: "Hashing not working"
        }
        next(error)
    }
    try {
        const hashPassword = await argon2.hash(user.password, options);

        user.password = hashPassword;
    }
    catch (err) {
        const error = {
            status: 401,
            msg: "Hashing not working"
        }
        next(error)
    }
})

//comparing password methods
UserSchema.methods.comparePassword = async function (password) {

    return await argon2.verify(this.password, password)
}

//making jwt token
UserSchema.methods.generateToken = async function (next) {

    try {

        return jwt.sign(
            {
                userID: this._id.toString(),
            },
            process.env.JWT_SECERET,
            {
                expiresIn: '5d'
            }
        )

    } catch (err) {

        const error = {
            status: 401,
            msg: "Cannot generate token"
        }
        next(error);
    }
}

const UserModel = mongoose.models.Users || mongoose.model('Users', UserSchema);

export default UserModel;