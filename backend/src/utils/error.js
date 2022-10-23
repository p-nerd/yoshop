class Error000 extends Error {
    /**
     * @param {string} message
     * @param {number} status
     */
    constructor(message, status) {
        this.status = status;
        this.message = message;
    }
}

export class Error500 extends Error000 {
    constructor(message) {
        super(message, 500);
    }
}

export class Error404 extends Error000 {
    constructor(message) {
        super(message, 404);
    }
}
