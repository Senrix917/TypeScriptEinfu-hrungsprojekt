export class MoveFormattingError extends Error{
    constructor(message: string){
        super("There was an error in the formatting of: " + message);
        this.name = "NameNotFoundError";
    }
}

export default MoveFormattingError