export class NameNotFoundError extends Error{
    constructor(message: string){
        super("Could not find " + message + ", please reload the page!");
        this.name = "NameNotFoundError";
    }
}

export default NameNotFoundError