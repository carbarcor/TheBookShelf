const bcrypt = require('bcrypt');
const User = require('../models/User'); 

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
        console.log('Errore durante la registrazione:', error);
        return res.status(500).json({
            error: 'Serverfel'
        });
    }
};

module.exports = signupUser;
