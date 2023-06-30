import NameNotFoundError from "../Errors/NameNotFoundError"
import {nameRecognition} from "../Services/NameRecognition"

describe("name recognition tests", () =>{
    test("recognize name with empty string", () =>{
        expect(() => nameRecognition("")).toThrow("Please enter a name");
    })
    
    test("recognize name with long string", () =>{
        let string: string = "ininafuzngseuanugnpgunrughgzagvgzbabvzraubnuzhrabzbvzabzvb";
        
        expect(() => nameRecognition(string)).toThrow("Could not find " + string);   
    })
})
