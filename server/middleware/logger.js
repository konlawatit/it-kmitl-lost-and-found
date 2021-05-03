function logger(req, res, next) {
    console.log(`[logger]: Requesting to ${req.method} ${req.url}`);
    next();
}

module.exports = logger;