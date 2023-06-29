import NameNotFoundError from "../Errors/NameNotFoundError"
import {nameRecognition} from "../Services/NameRecognition"

describe("name recognition tests", () =>{
    test("recognize name with empty string", () =>{
        const expected = "JP"
        const result = nameRecognition("")
        expect(result["name"]).toBe(expected)
    })
    
    test("recognize name with long string", () =>{
        let string: string = "ininafuzngseuanugnpgunrughgzagvgzbabvzraubnuzhrabzbvzabzvb";
        
        expect(() => nameRecognition(string)).toThrow("Could not find " + string);    })
})