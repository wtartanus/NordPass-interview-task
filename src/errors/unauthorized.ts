class UnauthorizedError extends Error {
    constructor() {
        super('You have entered an invalid username or password');

        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export default UnauthorizedError;