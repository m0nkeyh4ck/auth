const { logger } = require('../../utils/logger');
const { createDB: createDBQuery } = require('../queries');

(() => {
    require('../../config/db.config.init').query(createDBQuery, (err, _) => {
        if (err) {
            console.log("hola pasa de largo")
            logger.error(err.message);
            return;
        }
        console.log("hola pasa de largo")
        logger.info('DB created!');
        process.exit(0);
    });
    console.log("hola pasa de largo")
})();
