import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";


/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




/* LOGIN USER */
export const login = async (req, res) => {
    try {
        passport.authenticate("user-local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.status(404).json({ message: "User does not exists" });
            } else {

                // Generate a JWT
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json(token);


            }
        })(req, res, next);

    } catch (err) {
        next(err);
    }
};

