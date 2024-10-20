const helmet = require('helmet');

const securityHeaders = helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
});

module.exports = securityHeaders;
