import localStrategy from "passport-strategy"

const clients = [
    {
        id: 1,
        email: 'client@example.com',
        password: '$2b$10$7prXZ7C7RBYOX6gSg9K3.uwEL9Z5s9vGExrXu/S9cMXYlVlHEKis2', // Password is "password"
    },
    // Add more client objects as needed
];

const sellers = [
    {
        id: 1,
        email: 'seller@example.com',
        password: '$2b$10$7prXZ7C7RBYOX6gSg9K3.uwEL9Z5s9vGExrXu/S9cMXYlVlHEKis2', // Password is "password"
    },
    // Add more seller objects as needed
];
const admins = [
    {
        id: 1,
        email: 'seladminler@example.com',
        password: '$2b$10$7prXZ7C7RBYOX6gSg9K3.uwEL9Z5s9vGExrXu/S9cMXYlVlHEKis2', // Password is "password"
    },
    // Add more seller objects as needed
];

const initialize = (passport) => {

    const authenticateUser = async (email, passport, done) => {
        const user = clients.find((user) => user.email === email);
        ;
        if (user === null) {
            return done(null, false, { message: 'User does not exist. ' });
        }

        try {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return done(err);
                if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

                return done(null, user);
            });
        } catch (error) {
            return done(error);
        }
    }


    const authenticateSeller = async (email, passport, done) => {
        const seller = sellers.find((seller) => seller.email === email);;
        if (seller === null) {
            return done(null, false, { message: 'User does not exist. ' });
        }

        try {
            bcrypt.compare(password, seller.password, (err, isMatch) => {
                if (err) return done(err);
                if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

                return done(null, seller);
            });
        } catch (error) {
            return done(error);
        }
    }


    const authenticateAdmin = async (email, passport, done) => {
        const admin = admins.find((admin) => admin.email === email);;
        if (admin === null) {
            return done(null, false, { message: 'User does not exist. ' });
        }

        try {
            bcrypt.compare(password, admin.password, (err, isMatch) => {
                if (err) return done(err);
                if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

                return done(null, admin);
            });
        } catch (error) {
            return done(error);
        }
    }


    passport.use('client-local', new localStrategy({ usernameField: 'email' }, authenticateUser));
    passport.use('seller-local', new localStrategy({ usernameField: 'email' }, authenticateSeller));
    passport.use('admin-local', new localStrategy({ usernameField: 'email' }, authenticateAdmin));



}

export default initialize 