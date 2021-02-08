class AppResponse {
    status: number;
    respStatus: number;
    error: any;
    message: any;
    data: any;

    constructor(status?: number, respStatus?: number, error?: any, message?: any, data?: any) {
        this.status = status;
        this.respStatus = respStatus;
        this.error = error;
        this.message = message;
        this.data = data;
    }

    formOtherResponse(status, respStatus, error, message, data) {
        return new AppResponse(status, respStatus, error, message, data);
    }

    formSuccessResponse(message, data) {
        return new AppResponse(200, 1, null, message, data);
    }

    formBadRequestResponse(error, message, data) {
        return new AppResponse(400, 0, error, message, data);
    }

    formNotFoundResponse(error, message, data) {
        return new AppResponse(404, 0, error, message, data);
    }
    
}

const response = new AppResponse();

export default response;