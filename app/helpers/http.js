exports.getIp = req => req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

exports.getProtocol = req => req.protocol;

exports.getHost = req => req.hostname;
