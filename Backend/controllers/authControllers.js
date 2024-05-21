const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('log: ', { name, email, password });

        if (!name) {
            return res.status(400).json({
                error: 'Ange ett giltigt namn'
            });
        }
        if (!email) {
            return res.status(400).json({
                error: 'Ange en giltig e-postadress'
            });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({
                error: 'Lösenord krävs och måste vara minst 6 tecken'
            });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                error: 'E-postadressen finns redan'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        console.log('Användare skapad:', user);

        return res.status(201).json({
            message: 'Användare skapad',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({
            error: 'Serverfel'
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login:', { email, password });

        if (!email || !password) {
            return res.status(400).json({
                error: 'Fyll i både e-postadress och lösenord'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'Felaktig e-postadress eller lösenord'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: 'Felaktig e-postadress eller lösenord'
            });
        }

        // Generare token JWT 
        const token = jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        console.log('Login lyckades:', user);

        return res.status(200).json({
            message: 'Login lyckades',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log('Error login:', error);
        return res.status(500).json({
            error: 'Serverfel'
        });
    }
};


const getProfile = (req, res )=> {
    const {token} = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        rew.json(null)
    }

}

module.exports = { signupUser, loginUser, getProfile };
