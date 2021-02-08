import responseUtil from '../utils/ResponseUtil';
import Standard from '../models/StandardModel';
import standardRepo from '../repo/StandardRepo';
import utils from '../utils/utils';
import { Op } from 'sequelize';
import { Request } from 'express';

class StandardService {

    getStandards(req: Request) {
        return standardRepo.getStandards().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get standards', utils.formErrorObj(err));
        })
    }

    getStandardById(req: Request) {
        return standardRepo.getStandardById(req.params.id).then(val => {
            if(!val[0]) {
                return responseUtil.formNotFoundResponse('not found', 'record not found', null);
            }
            return responseUtil.formSuccessResponse('', val[0]);
        }).catch(err => {
            console.log('err = ', err);
            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get standard by id', utils.formErrorObj(err));
        })
    }

    saveStandard(req: Request) {
        const standard = Standard.build(req.body);
        return standard.save().then(val => {
            return responseUtil.formSuccessResponse('standard saved successfully', val.toJSON());
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in standard saving', utils.formErrorObj(err))
        })
    }

    async updateStandard(req: Request) {
        return standardRepo.getStandardById(req.params.id).then(val => {
            return Standard.update(
                { ...req.body },
                { returning: true, where: { id: req.params.id } }
            ).then(res => {
                return responseUtil.formSuccessResponse('standard updated successfully', res);
            }).catch(err => {
                console.log('err = ', err);
                return responseUtil.formBadRequestResponse(err.toString(), 'Error in standard updating', utils.formErrorObj(err))
            })
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get standard by id', utils.formErrorObj(err));
        })
    }

    changeStandardStatus(req: Request) {
        return Standard.update(
            { status: req.params.status },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse('standard status updated successfully', res);
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in standard status updating', utils.formErrorObj(err))
        })
    }

    getActiveStandards(req: Request) {
        return standardRepo.getActiveStandards().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get active standards', err);
        })
    }

    getInActiveStandards(req: Request) {
        return standardRepo.getInActiveStandards().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get inactive standards', err);
        })
    }
}

const standardService = new StandardService();

export default standardService;