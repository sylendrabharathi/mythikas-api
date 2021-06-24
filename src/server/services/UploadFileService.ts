import responseUtil from '../utils/ResponseUtil';
import utils from '../utils/Utils';
import { Op } from 'sequelize';
import { Request } from 'express';
import awsUtils from './../utils/aws-utils';
import * as xlsx from 'xlsx';
import standardRepo from '../repo/StandardRepo';
import StudentParent from '../models/StudentParentModel';
import PasswordUtil from '../utils/PasswordUtil';

class UploadFileService {

    uploadFile(req: Request) {
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

    async studentExcel(req: Request) {
        const r = xlsx.read(req['file'].buffer);

        let data = [];

        let standards = await this.getStandardsMap();
        console.log("Standards = ", standards);

        for (let i = 0; i < r.SheetNames.length; i++) {
            if (i == 1) break; // single sheet

            const sheet = xlsx.utils.sheet_to_json(r.Sheets[r.SheetNames[i]]);

            for (let rowIdx = 0; rowIdx < sheet.length; rowIdx++) {
                const res = sheet[rowIdx];
                console.log("res = ", res);

                let row = {
                    firstName: res["First Name"],
                    lastName: res["Last Name"],
                    gender: res["Gender"],
                    emailId: res["Email ID"],
                    phoneNumber: res["Phone Number"],
                    parentFirstName: res["Parent First Name"],
                    parentLastName: res["Parent Last Name"],
                    syllabus: res["Syllabus"],
                    standardId: res["Standard"],
                    password: res["Password"],
                    createdBy: null,
                    updatedBy: null
                };

                if (req.headers.userid) {
                    row.createdBy = parseInt(req.headers.userid.toString());
                    row.updatedBy = parseInt(req.headers.userid.toString());;
                } else {
                    row.createdBy = 1;
                    row.updatedBy = 1;
                }

                if (!row.password) row.password = "Welcome@321";

                row.standardId = standards[res["Standard"].toString().toLowerCase()];
                if (!row.standardId) {
                    data.push({ rowNumber: rowIdx, message: "Invalid Standard" });
                    continue;
                }

                let savedVal = await this.saveStudentParent(row);
                // Printing saved value
                console.log("savedVal = ", savedVal);
                if (savedVal["id"]) {
                    data.push({ rowNumber: rowIdx, message: "Success", studentId: savedVal["id"] });
                    continue;
                }

                data.push({ rowNumber: rowIdx, message: "Error saving student", error: savedVal });
            }

        }

        // Printing data
        console.log("DATA = ", data);

        return Promise.resolve(responseUtil.formSuccessResponse('Excel file parsed successfully', data));
    }

    getStandardsMap() {
        let standardMap = {};
        return standardRepo.getStandards().then(values => {
            if (!values.length) return standardMap;
            for (let i = 0; i < values.length; i++) {
                let key = values[i]["name"].toString().toLowerCase();
                standardMap[key] = values[i]["id"];
            }
            return standardMap;
        })
    }

    saveStudentParent(req) {
        req["password"] = PasswordUtil.encryptText(req["password"]);
        const studentParent = StudentParent.build(req);
        return studentParent.save().then(val => {
            console.log('save success');
            return val;
        }).catch(err => {
            // console.log('err = ', err);
            return utils.formErrorObj(err);
        })
    }
}

const uploadFileService = new UploadFileService();

export default uploadFileService;