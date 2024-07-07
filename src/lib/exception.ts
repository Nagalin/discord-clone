export class ServerMisconfigurationException extends Error {
    constructor(message = 'Server misconfiguration, please check env variable') { 
        super(message)
    }
}