import * as express from 'express';
import * as cors from 'cors';

import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';

import db from './server/db/DbConfig';
import routes from './server/routes/Routes';
import mobileAppRoutes from './server/routes/MobileAppRoutes';

import appConfig from './server/config/AppConfig';
export const app = express();

import { AppResponse } from './server/utils/ResponseUtil';

import awsUtils from './server/utils/aws-utils';

// Middlewares
// const upload = multer();

app.use(cors());
app.use(express.json());


function init() {
    // DB Connection
    const dbCon = db.connectDB();
    if (dbCon.status === 0) {
        console.log('Server is not running due to DB Connection Error: ', dbCon.error);
        return;
    }
    // for parsing application/json
    // app.use(bodyParser.json());

    // for parsing application/xwww-
    // app.use(bodyParser.urlencoded({ extended: true }));
    //form-urlencoded

    app.use(express.json());
    app.use(express.urlencoded({limit: '4gb'}));

    // for parsing multipart/form-data
    // app.use(upload.array());
    app.use((err, req: express.Request, res: express.Response, next) => {
        // This is error handler
        console.error(err.stack);

        console.log('error in ', req.url, ', err = ', err);
        const resp = new AppResponse();
        resp.status = 500;
        resp.respStatus = 500;
        resp.message = "server error";
        resp.error = err.stack;
        res.status(500).json(resp);
        res.end();

    });

    app.use('/api/v1/', cors(), routes);
    app.use('/api/v1/mobile/', cors(), mobileAppRoutes);

    dotenv.config();

    awsUtils.checkAndCreateBucket();

    // app.get('/', function (req, res, next) {
    //     Promise.resolve().then(function () {
    //       throw new Error('BROKEN')
    //     }).catch(next) // Errors will be passed to Express.
    //   })



    const PORT = process.env.PORT || appConfig.port;
    app.listen(PORT, () => {

        console.log(`Mythikas API is running in http://localhost:${PORT}`)
    });
}
init();