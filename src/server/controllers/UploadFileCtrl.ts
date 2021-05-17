import appCtrl from './AppCtrl';
import { Request, Response } from 'express';
import * as multer from 'multer';
import uploadFileService from './../services/UploadFileService';
const upload = multer({ dest: 'uploads/' });

class UploadFileCtrl {
    uploadFile(req: Request, res: Response) {

		try {
			appCtrl.renderResponse(res, uploadFileService.uploadFile(req));
		} catch(e) {
			console.log(e);
			res.status(500);
			res.send(e);
		}

	}

    list(req: Request, res: Response) {
        try {
			appCtrl.renderResponse(res, uploadFileService.getFiles());
		} catch(e) {
			console.log(e);
			res.status(500);
			res.send(e);
		}
    }

    studentExcel(req: Request, res: Response) {
        try {
			appCtrl.renderResponse(res, uploadFileService.studentExcel(req));
		} catch(e) {
			console.log(e);
			res.status(500);
			res.send(e);
		}
    }
}

const uploadFileCtrl = new UploadFileCtrl();
export default uploadFileCtrl;