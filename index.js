/* What is function declartion? */
function square(num) {
  return num * num;
}

/* What is function expression? */
// -> Store function in variable
const squareexp = function (num) {
  return num * num;
};

/* What are anonymous function? */
// function (num) {
//     return num * num;
// }

/* What are first class functions? */
// -> Functions which are passed as variable to other functions
const add = function (num) {
  return num * num;
};

function display(fn) {
  console.log("Output: ", fn(5));
}

display(add);

/* What is IIFE (Immediately invoked function expression)? */
(function square(num) {
  return num * num;
})();

/* Function scope */
// -> first check in local scope. If not exists then checks in parent scope
var num1 = 20,
  num2 = 3;

function multiple() {
  return num1 * num2;
}

multiple(); // return 60

function getScore() {
  var num1 = 2,
    num2 = 3;

  function multiple() {
    return num1 * num2;
  }

  return multiple();
}

getScore(); // return 6

/* Function scope - O/P based question */
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
//  returns 0, 1, 2, 3, 4

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
// returns 5,5,5,5,5

/* Function Hosting */
names();

function names() {
  console.log("YXZ");
}

/* Function Hosting - O/P based question */
var x = 21;

function fun() {
  console.log(x); // undefined
  var x = 20;
}

/* Params vs Arguments */
function add(num) {
  // Params
  return num + num;
}

add(5); // Arguments

/* Arrow function vs Regular function */
// 1. Syntax
function square(num) {
  return num * num;
}

const squareArrow = (num) => {
  return num * num;
};

// 2. Implicit return keyword
const squareArr = (num) => num * num;

// 3. Arguments
function fn() {
  console.log(arguments);
}

fn(1, 2, 3); // print 1,2,3

const fnArr = () => {
  console.log(arguments);
};

fnArr(1, 2, 3); // arguments not found

// 4. this keyword
let user = {
  username: "XYZ",
  rc1: () => {
    console.log(this.username); // here "this" refer to global object
  },
  rc2() {
    console.log(this.username); // here "this" refer to user object
  },
};

user.rc1(); // undefined
user.rc2(); //XYZ

/* Closures */
// -> Gives you access to an outer function's scope from an inner function
//  Lexical scope : variable defined outside a function can access inside of
// another function after variable declarations, but opp not possible
var username = "XYZ";
// global scope

function local() {
  //local scope
  console.log(username);
}

local(); // XYZ

/* Closure Scope Chain */
// Every closure have 3 scopes:
// 1. local
// 2. outer
// 3. global

var username = "XYZ";
// global
function makeFn() {
  // outer
  var name = "XYZ2";
  function displayName(num) {
    // local
    console.log(name, num, username);
  }

  return displayName;
}

makeFn()(5); // XYZ2 5 XYZ

/* Closures Interview Questions */

// Q1.
let count = 0;
(function printCount() {
  if (count === 0) {
    let count = 1;
    console.log(count); // 1
  }
  console.log(count); // 0
})();

// Q2. Write fn that would allow u to do this
var addSix = createBase(6);
addSix(10); // returns 16
addSix(21); // returns 27

// ans
function createBase(add) {
  return function (n) {
    console.log(add + n);
  };
}

// Q3. Time Optimization

function find(index) {
  let a = [];
  for (let i = 0; i < 100000; i++) {
    a[i] = i * i;
  }

  console.log(a[index]);
}
find(6);
find(50);

// ans
function find() {
  let a = [];
  for (let i = 0; i < 100000; i++) {
    a[i] = i * i;
  }

  return function (index) {
    console.log(a[index]);
  };
}

const closure = find();

closure(6);
closure(50);

//  Q4. Block scope and settimeout

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}

// prints 3,3,3, becuz var is function scope

// soln1: use let instead of var
// soln2: use closure
for (var i = 0; i < 3; i++) {
  function inner(i) {
    // block scope
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }

  inner(i);
}
// prints 0,1,2

/* Caching/memoize implementation */

function myMemoize(fn, context) {
  const res = {};

  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }

    return res[argsCache];
  };
}

const heavyOp = (num1, num2) => {
  for (let i = 0; i <= 10000000; i++) {
    return num1 * num2;
  }
};

const memmoizeFn = myMemoize(heavyOp);

console.log(memmoizeFn(132, 123));
console.log(memmoizeFn(132, 123));

/* Currying */
// fn(a,b) into fn(a)(b)

function fn(a) {
  return function (b) {
    return a, b;
  };
}

console.log(fn(5)(6));

// Q1. Why should we use currying?
// To create high order function
// To avoid passing same variable again and again

// Q2. sum(2)(6)(1)

function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

// Q3.
// evaluate("sum")(4)(2) => 6
// evaluate("multiple")(4)(2) => 8
// evaluate("divide")(4)(2) => 2
// evaluate("sibstract")(4)(2) => 2

function evaluate(operation) {
  return function (a) {
    return function (b) {
      if (operation === "sum") return a + b;
      else if (operation === "multiple") return a * b;
      else if (operation === "divide") return a / b;
      else if (operation === "substract") return a - b;
    };
  };
}

// Q4. Infinite Currying -> sum(1)(2)(3)...(n)
function sum(a) {
  return function (b) {
    if (b) return sum(a + b);
    return a;
  };
}
