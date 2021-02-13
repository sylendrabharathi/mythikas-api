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
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Standards', utils.formErrorObj(err));
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
            
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Standard by id', utils.formErrorObj(err));
        })
    }

    saveStandard(req: Request) {
        const standard = Standard.build(req.body);
        return standard.save().then(val => {
            return responseUtil.formSuccessResponse('Standard saved successfully', val.toJSON());
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Standard saving', utils.formErrorObj(err))
        })
    }

    async updateStandard(req: Request) {
        return standardRepo.getStandardById(req.params.id).then(val => {
            return Standard.update(
                { ...req.body },
                { returning: true, where: { id: req.params.id } }
            ).then(res => {
                return responseUtil.formSuccessResponse('Standard updated successfully', res);
            }).catch(err => {
                console.log('err = ', err);
                return responseUtil.formBadRequestResponse(err.toString(), 'Error in Standard updating', utils.formErrorObj(err))
            })
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get Standard by id', utils.formErrorObj(err));
        })
    }

    changeStandardStatus(req: Request) {
        return Standard.update(
            { status: req.params.status },
            { where: { id: req.params.id } }
        ).then(res => {
            return responseUtil.formSuccessResponse(`Standard ${req.params.status !== 'false' ? 'activated': 'deleted'} successfully`, res);
        }).catch(err => {
            console.log('err = ', err);
            return responseUtil.formBadRequestResponse(err.toString(), 'Error in Standard status updating', utils.formErrorObj(err))
        })
    }

    getActiveStandards(req: Request) {
        return standardRepo.getActiveStandards().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get active Standards', err);
        })
    }

    getInActiveStandards(req: Request) {
        return standardRepo.getInActiveStandards().then(val => {
            return responseUtil.formSuccessResponse('', val);
        }).catch(err => {
            return responseUtil.formBadRequestResponse(err.toString(), 'error in get inactive Standards', err);
        })
    }
}

const standardService = new StandardService();

export default standardService;