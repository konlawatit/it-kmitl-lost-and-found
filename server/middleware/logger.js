function logger(req, res, next) {
    console.log(`[logger]: Requesting to ${req.method} ${req.url}`);
    console.log(req.body)
    next();
}

module.exports = logger;