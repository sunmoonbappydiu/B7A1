/* 
    Problem 1: 
    Create a TypeScript function filterEvenNumbers that accepts 
    an array of numbers and returns a new array containing only the even numbers. 
*/
function filterEvenNumbers(numbers:number[]){
    return numbers.filter((item) => checkEvenNumber(item) );
}

function checkEvenNumber(item:number){
    if(item%2===0){
        return item;
    }
}

console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6]));

// End first problem



/* 
    Problem 2: 
    Write a function reverseString that takes a string as input and returns the reversed version of that string.
*/

function reverseString(stringInput:string){
    const reverseString = stringInput.split("").reverse().join("");
    return reverseString;
}

console.log(reverseString("typescript"));

// end problem 2 code


/* 
    Problem 3: 
    Define a union type StringOrNumber and create a function checkType that uses type guards to return "String"
    if the input is a string or "Number" if the input is a number.
*/

export type StringOrNumber = number | string;


function checkType(yourStringOrNumber:StringOrNumber){
    if(typeof yourStringOrNumber === "number"){
        return "Number";
    }else{
        return "String"
    }
}

console.log(checkType("Hello"));
console.log(checkType(42));

// end problem 3 code


/* 
    Problem 4: 
    Write a generic function getProperty that takes an object and a key, then returns the value of that key. 
    Use constraints to ensure the key exists on the object.
*/

function getProperty<ObjectType,ObjectKey extends keyof ObjectType>(
    objectProperty:ObjectType,
    key:ObjectKey):ObjectType[ObjectKey]{
    return objectProperty[key];
}

const user = { id: 1, name: "John Doe", age: 21 };
console.log(getProperty(user, "name"));


// end problem 4 code


/* 
    Problem 5: 
    Define an interface Book with properties title, author, and publishedYear. 
    Create a function toggleReadStatus that accepts a Book object and returns a new object with an added 
    isRead property (boolean), defaulting to true.
*/
export interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

function toggleReadStatus(
  obj: Book
): Book & { isRead: boolean } {
  return {
    ...obj,
    isRead: true,
  };
}

const myBook = { title: "TypeScript Guide", author: "Jane Doe", publishedYear: 2024 };

console.log(toggleReadStatus(myBook));

// end problem 5 code


/* 
    Problem 6: 
    Create a class Person with a name and age. Then, create a subclass Student that adds a grade property. 
    Include a method getDetails in the Student class that returns a string with the student's name, age, and grade.
*/

export class Person {
  public name: string;
  public age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
export class Student extends Person {
  public grade: string;
  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }
  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}
const student = new Student("Alice", 20, "A");
console.log(student.getDetails());

// end problem 6 code


/* 
    Problem 7: 
    Create a function getIntersection that takes two arrays of numbers and returns a new array 
    containing only the elements that are present in both arrays.
*/
export function getIntersection(input_one: number[], input_two: number[]): number[] {
  const set2 = new Set(input_two);
  const intersection = new Set<number>();

  for (const n of input_one) {
    if (set2.has(n)) intersection.add(n);
  }

  return Array.from(intersection);
}

console.log(getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]));
