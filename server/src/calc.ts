function parse(fullString:string) {
    let strArray = fullString.split(" ");
    let pos = 0;
  
    function checkPos() {
      return strArray[pos];
    }
  
    function isNumber(e:string) {
      return e !== undefined && e.match(/^-?([1-9][0-9]*|([0]))$/) !== null;
    }
  
    function jumpNext() {
      pos++;
    }
  
    function parseNumber():any {
      let k = checkPos();
      if (isNumber(k)) {
        jumpNext();
        return { type: "number", value: k };
      } else {
        throw SyntaxError("Invalid Format");
      }
    }
  
    function parseExp() {
      let expr = parseNumber();
      let k = checkPos();
      while (k === "^") {
        jumpNext();
        let lhs = parseExp();
        expr = { type: k, left: lhs, right: expr };
        k = checkPos();
      }
      return expr;
    }
  
    function parseMulDiv() {
      let expr = parseExp();
      let k = checkPos();
      while (k === "*" || k === "/") {
        jumpNext();
        let rhs = parseExp();
        expr = { type: k, left: expr, right: rhs };
        k = checkPos();
      }
      return expr;
    }
  
    function parseAddSub() {
      let expr = parseMulDiv();
      let k = checkPos();
      while (k === "-" || k === "+") {
        jumpNext();
        let rhs = parseMulDiv();
        expr = { type: k, left: expr, right: rhs };
        k = checkPos();
      }
      return expr;
    }
  
    let output = parseAddSub();
    return output;
}

function calculate(obj:any):any 
{
    switch (obj.type) 
    {
      case "number":
        return parseInt(obj.value);
      case "^":
        return calculate(obj.left) ** calculate(obj.right);
      case "+":
        return calculate(obj.left) + calculate(obj.right);
      case "-":
        return calculate(obj.left) - calculate(obj.right);
      case "*":
        return calculate(obj.left) * calculate(obj.right);
      case "/":
        return calculate(obj.left) / calculate(obj.right);
    }
}


export function compute(s:any)
{
  console.log(s.body.inputs);
    let treeS = parse(s.body.inputs);
    console.log(treeS);
    let res = calculate(treeS);
    console.log(res);
    return res;
    //return String(res);
}

