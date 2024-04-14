const fs = require('fs');

const logger = (filename) =>{
    return (req, res, next) => {
        fs.appendFile(
            filename,
          `\nHTTP method: ${req.method}, Request Path: ${
            req.path
          }, Request Time: ${new Date().toLocaleString()}`,
          (err, data) => {
            next();
          }
        );
      }
};

module.exports = logger;