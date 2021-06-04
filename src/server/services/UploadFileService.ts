import responseUtil from '../utils/ResponseUtil';
import utils from '../utils/Utils';
import { Op } from 'sequelize';
import { Request } from 'express';
import awsUtils from './../utils/aws-utils';
import xlsxFile from 'read-excel-file/node';
import * as xlsx from 'xlsx';
import { Xlsx } from 'exceljs';
import * as fs from 'fs';

class UploadFileService {

    uploadFile(req: Request){
        // const file: any = req['file'];
        // const s3 = awsUtils.getS3();
        // const obj: AWS.S3.PutObjectRequest = {
        //     Bucket: awsUtils.bucket,
        //     Key: `section-${file.originalname}`,
        //     Body: awsUtils.bufferToStream(file.buffer)
        // };        
        return awsUtils.uploadFile(req['file'])
        .promise().then((data) => {
            // console.log('data = ', data);
            return responseUtil.formSuccessResponse('', data);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in file uploading', err));
        });
        // console.log('resp = ', resp);
        // if(!resp) {
        //     return Promise.reject(responseUtil.formBadRequestResponse(400, 'File not uploading', null));
        // }
        // return Promise.resolve(responseUtil.formSuccessResponse('', resp));
        
    }

    getFiles() {
        return awsUtils.getFiles().promise().then((data) => {
            return responseUtil.formSuccessResponse('', data);
        }).catch(err => {
            return Promise.reject(responseUtil.formBadRequestResponse(err.toString(), 'error in file uploading', err));
        });
    }

    studentExcel(req: Request) {
        console.log(req['file'].path);

        // console.log(readXlsxFile);
        // const r = xlsx.read(req['file'].path);
        // console.log(r.SheetNames);
        // console.log(xlsx.stream.);
        // console.log(xlsx.utils.sheet_to_json(r.Sheets[r.SheetNames[0]]));
        // const data = fs.readFileSync('my-file.txt', 'utf8');
        // console.log(data);
        // xlsxFile(req['file'].buffer).then(rows => {
        //     console.log(rows);
            
        // })
        
        
        
        // readXlsxFile(req['file']).then((rows) => {
        //     // `rows` is an array of rows
        //     // each row being an array of cells.
        //   })        
        
        return Promise.resolve(responseUtil.formSuccessResponse('', ''));
    }
}

const uploadFileService = new UploadFileService();

export default uploadFileService;