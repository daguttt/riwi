export class HttpError extends Error {
    constructor(message, response) {
        this.response = response;
        super(message);
    }
}
