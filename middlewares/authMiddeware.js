// Middleware for authenticating clients
function authenticateClient(req, res, next) {
    passport.authenticate('client-local', { session: false }, (err, client, info) => {
        if (err) {
            return next(err);
        }

        if (!client) {
            return res.status(401).json({ message: info.message });
        }

        req.user = client;
        next();
    })(req, res, next);
}

// Middleware for authenticating sellers
function authenticateSeller(req, res, next) {
    passport.authenticate('seller-local', { session: false }, (err, seller, info) => {
        if (err) {
            return next(err);
        }

        if (!seller) {
            return res.status(401).json({ message: info.message });
        }

        req.user = seller;
        next();
    })(req, res, next);
}


// Middleware for authenticating admins
function authenticateAdmin(req, res, next) {
    passport.authenticate('admin-local', { session: false }, (err, admin, info) => {
        if (err) {
            return next(err);
        }

        if (!admin) {
            return res.status(401).json({ message: info.message });
        }

        req.user = admin;
        next();
    })(req, res, next);
}


export {
    authenticateClient,
    authenticateSeller,
    authenticateAdmin
}