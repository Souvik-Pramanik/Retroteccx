/**
 * __dirname doesn't work probably because of ESM module loader, so edit the path.js file to current directory.
 */

import cors from 'cors';
import express from 'express';
import bodyparser from 'body-parser';
import multer from 'multer';
import zip from 'express-easy-zip';

import Storage from './Storage/Storage.js';
import jwtCheck from './JWT/jwtCheck.js';
import SigninController from "./Controllers/Signin.js";
import RegisterController from "./Controllers/Register.js";
import SubmitReportController from "./Controllers/SubmitReport.js";
import AdminSignInController from './Controllers/AdminSignInController.js';
import AdminRegisterController from './Controllers/AdminRegisterController.js';
import AdminFetchController from './Controllers/AdminFetch.js';
import AdminFeedbackController from './Controllers/AdminFeedback.js';
import UserFetchController from './Controllers/UserFetch.js';
import DownloadController from './Controllers/Download.js';
import UserFeedBackController from './Controllers/UserRating.js';
import UserHomeFetchController from './Controllers/UserHomeFetch.js';
import AnalyticsController from './Controllers/Analytics.js';


const upload = multer({ storage: Storage })
const app = express();

app.use(bodyparser.json());
app.use(cors());
app.use(zip());

app.get('/', (req,res)=>{res.send('ok')});
app.post('/signin', SigninController);
app.post('/register', RegisterController);
app.post('/submitreport', [jwtCheck, upload.array('files', 3)], SubmitReportController);
app.get('/userfetch', [jwtCheck], UserFetchController);
app.post('/userfeedback', [jwtCheck], UserFeedBackController);
app.get('/userhomefetch', [jwtCheck], UserHomeFetchController);
app.post('/adminsignin', AdminSignInController);
app.post('/adminregister', AdminRegisterController);
app.post('/adminfeedback', [jwtCheck], AdminFeedbackController);
app.get('/adminfetch', [jwtCheck], AdminFetchController);
app.post('/admindownload',[jwtCheck], DownloadController);
app.get('/analyticsfetch', [jwtCheck], AnalyticsController)

app.listen(process.env.PORT || 3000);


/**
 * /
 * /signin post
 * /register post
 * /submitreport post
 * /userfetch post
 * /userfeedback post
 * /userhomefetch get
 * /adminsignin post
 * /adminregister post
 * /adminfeedback post
 * /adminfetch get
 * /admindownload post
 */