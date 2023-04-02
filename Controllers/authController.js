const {
    body,
    validationResult
} = require('express-validator');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const maxAge = 3 * 24 * 60 * 60;
const {
    User
} = require('../Models/user');



const createToken = (id) => {
    return jwt.sign({
        id
    }, 'secret', {
        expiresIn: maxAge,
    })
}


const handleErrors = (err) => {
    let errors = {
        email: "",
        password: ""
    };

    if (err.message === 'incorrect email') {
        errors.email = "That Email is not registered";
    }
    if (err.message === 'incorrect password') {
        errors.email = "That Password is not registered";
    }

    if (err.code === 1100) {
        errors.email = "Email is already in use";
        return errors
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({
            properties
        }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}




module.exports.register = async (req, res) => {
    await body('name').notEmpty().withMessage('Name is required.').run(req);
    await body('email').isEmail().withMessage('Email is not valid.').run(req);
    await body('password').isLength({
        min: 8
    }).withMessage('Password should be at least 8 characters long.').run(req);
    await body('profesion').optional().isString().withMessage('Profession should be a string.').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        name,
        email,
        password,
        profession,
        profilepic
    } = req.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profession,
        profile: profilepic
    });

    const token = createToken(user._id);

    // Send email
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'nathanim2tadele@gmail.com',
            pass: 'pnjuveogtozmuknv'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: 'nathanim2tadele@gmail.com',
        to: email,
        subject: 'Registration Successful',
        html: `<p>Dear ${name},</p>
            <p>Thank you for registering on our website. Your account has been created successfully.</p>
            <p>Please <a href="http://localhost:3000/">click here</a> to go to our website.</p>
            <p>Regards,</p>
            <p>Your Website Team</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.cookie('jwt', token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
    });

    res.status(201).json({
        user: user._id,
        created: true,
    });
};


module.exports.login = async (req, res) => {
try {
    const {
        email,
        password
    } = req.body;

    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie('jwt', token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
    });
    res.status(200).json({
        user: user._id,
        created: true
    })
} catch (error) {
    const errors = handleErrors(error);
    res.json({
        errors,
        created: false
    });
}
}