import * as express from 'express';
import * as cors from 'cors';

import * as dotenv from 'dotenv';

import  db from './server/db/DbConfig';
import routes from './server/routes/Routes';

import appConfig from './server/config/AppConfig';
export const app = express();


// Middlewares

app.use(cors());
app.use(express.json());


// DB Connection
const dbCon = db.connectDB();
if(dbCon.status === 0) {
    console.log('Server is not running due to DB Connection Error: ', dbCon.error);
}

app.use('/api/v1/', routes);

dotenv.config();

app.use(function(err, req: express.Request, res, next) {
    // This is error handler
    console.log('error in ',req.url, ', err = ', err);
    
  });

const PORT = process.env.PORT || appConfig.port;
app.listen(PORT, () => {

    console.log(`Mythikas API is running in http://localhost:${PORT}`)
});