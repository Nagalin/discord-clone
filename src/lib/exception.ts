export class ServerMisconfigurationException extends Error {
    constructor(message = 'Server misconfiguration, please check env variable') {
        super(message)
    }
}

export class AuthException extends Error {
    constructor(message = 'Authentication is required') {
        super(message)
    }
}