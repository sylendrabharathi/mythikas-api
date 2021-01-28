class Response {
    status;
    respStatus;
    error;
    message;
    data;

    constructor(status, respStatus, error, message, data) {
        this.status = status;
        this.respStatus = respStatus;
        this.error = error;
        this.message = message;
        this.data = data;
    }

    formOtherResponse(status, respStatus, error, message, data) {
        return new Response(status, respStatus, error, message, data);
    }

    formSuccessResponse(message, data) {
        return new Response(200, 1, null, message, data);
    }

    formBadRequestResponse(error, message, data) {
        return new Response(400, 0, error, message, data);
    }

    formNotFoundResponse(error, message, data) {
        return new Response(404, 0, error, message, data);
    }
    
}

const response = new Response();

module.exports = response;