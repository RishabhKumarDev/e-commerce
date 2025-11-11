class ApiResponse {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message || "Success";
        this.success = statusCode < 400;
        this.data = data;
    }
}

export { ApiResponse }