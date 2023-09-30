
function handleErrors(err, req, res, next) {
    console.error(err);

    if (err.name === 'UnauthorizedError') {
        // JWT authentication error
        return res.status(401).json({ message: 'Invalid token.' });
    }

    res.status(500).json({ message: 'Internal server error.' });
}

function handleNotFound(req, res, next) {
    res.status(404).json({ message: 'Not Found' });
}

export { handleErrors, handleNotFound };