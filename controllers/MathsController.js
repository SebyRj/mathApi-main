import MathModel from '../models/maths.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';
import { factorial, isPrime, findPrime } from '../wwwroot/Maths/js/mathUtilities.js';
import fs from 'fs';
export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new MathModel()));
    }

    saveToFile(data) {
        const filePath = './tests.json';
        if(fs.existsSync(filePath)){
            const fileData = fs.readFileSync(filePath);
            let jsonData = JSON.parse(fileData.toString());

            jsonData.push(data);

            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        }
        else{
            fs.writeFileSync(filePath, JSON.stringify([data], null, 2));
        }
    }
    get() {
        let data = {};
        let result = 0;
        let op = this.HttpContext.path.params.op;
        let n = 0;
        let x = 0;
        let y = 0;
        if (this.HttpContext.path.params.n != undefined) {
            n = this.HttpContext.path.params.n;
            if(isNaN(n)){
                data = {
                    "n": n,        
                    "op": op,                 
                    "error": "n is not a number"            
                };
                this.HttpContext.response.JSON(data);
                return;
            }
            else{
                n = parseInt(n)
            }
            switch (op) {
                case "!":
                    result = factorial(n);
                    break;
                case "p":
                    result = isPrime(n);
                    break;
                case "np":
                    result = findPrime(n);
                    break;
                default:
                    this.HttpContext.response.badRequest("Invalid operation.");
            }
            data = {
                "n": n.toString(),        
                "op": op,                 
                "result": result            
            };
        }
        else {
            x = this.HttpContext.path.params.x;
            y = this.HttpContext.path.params.y;
            if(isNaN(x)){
                data = {
                    "x": x,     
                    "y": y.toString(),      
                    "op": op,                 
                    "error": "x is not a number."            
                };
                this.HttpContext.response.JSON(data);
                this.saveToFile(data);
                return;
                
            }
            else if(isNaN(y)){
                data = {
                    "x": x.toString(),     
                    "y": y,      
                    "op": op,                 
                    "error": "y is not a number." 
                               
                };
                this.HttpContext.response.JSON(data);
                this.saveToFile(data);
                return;
                
            }
            else{
                x = parseInt(x)
                y = parseInt(y)
            }
            
            switch (op) {
                case "+":
                case " ":
                    result = x + y;
                    op = "+"
                    break;
                case "-":
                    result = x - y;
                    break;
                case "*":
                    result = x * y;
                    break;
                case "/":
                        result = x / y;
                        break;
                case "%":
                        result = x % y;
                        break;
                default:
                    this.HttpContext.response.badRequest("Invalid operation.");
            }
            data = {
                "x": x.toString(),     
                "y": y.toString(),      
                "op": op,                 
                "result": result.toString()           
            };
           
        }
        console.log(data);
        this.HttpContext.response.JSON(data);
        this.saveToFile(data);

    }
}