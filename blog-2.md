## Blog Assignment 04: How do the four pillars of OOP—Inheritance, Polymorphism, Abstraction, and Encapsulation—help manage logic and reduce complexity in large-scale TypeScript projects?

## Title: TypeScript প্রজেক্টে OOP-এর 4 Pillar কীভাবে Complexity কমায়

## Introduction

Large-scale TypeScript project-এ codebase বড় হলে logic ছড়িয়ে যায়—একই কাজ অনেক জায়গায়, change করলে অনেক ফাইল ভাঙে, আর debugging কঠিন হয়। OOP-এর চারটা pillar—**Inheritance, Polymorphism, Abstraction, Encapsulation**—এই সমস্যাগুলো কমাতে সাহায্য করে। এগুলো মূলত code-কে **organize**, **reuse**, **hide complexity**, এবং **safe change** করতে শেখায়।

---

## Body

### 1) Inheritance

**What is it?**  
Inheritance মানে হলো একটি class (child) অন্য একটি class (parent)-এর property/method reuse করতে পারে।

**Why used?**  
একই common logic বারবার না লিখে reuse করা যায়।

**How to use (TypeScript)?**

```ts
class Person {
  constructor(public name: string, public age: number) {}

  describe() {
    return `${this.name} (${this.age})`;
  }
}

class Student extends Person {
  constructor(name: string, age: number, public grade: string) {
    super(name, age);
  }

  getDetails() {
    return `${this.describe()}, Grade: ${this.grade}`;
  }
}
```

**Real-life example**  
`Employee`, `Student`, `Teacher`—এগুলো সবাই `Person`-এর মতো common info share করে (name, age), তাই `Person` parent class বানালে reuse হয়।

**Pain point it solves**  
- duplicated code কমায়  
- common change (যেমন `describe()` update) এক জায়গায় করলে সব child class-এ effect পড়ে  

**Note (important)**  
সব জায়গায় Inheritance force করা ঠিক না। “is-a” relation ঠিক থাকলে use করা ভালো (Student is a Person)।

---

### 2) Polymorphism

**What is it?**  
Polymorphism মানে একই method name/contract থাকলেও different class-এ behaviour আলাদা হতে পারে।  
TypeScript-এ এটা সাধারণত **interface + different implementations** দিয়ে করা হয়।

**Why used?**  
বড় প্রজেক্টে যদি `if/else` দিয়ে সব case handle করতে যান, logic messy হয়। Polymorphism দিলে নতুন feature add করতে existing code কম modify করতে হয়।

**How to use (TypeScript)?**

```ts
interface Notifier {
  send(to: string, message: string): void;
}

class EmailNotifier implements Notifier {
  send(to: string, message: string) {
    console.log(`Email -> ${to}: ${message}`);
  }
}

class SmsNotifier implements Notifier {
  send(to: string, message: string) {
    console.log(`SMS -> ${to}: ${message}`);
  }
}

function notifyUser(notifier: Notifier, to: string, message: string) {
  notifier.send(to, message);
}
```

**Real-life example**  
একই “Send Notification” feature—কখনও Email, কখনও SMS, কখনও Push—কিন্তু caller code (`notifyUser`) একই থাকে।

**Pain point it solves (compared to if/else)**  
- বড় `switch`/`if-else` chain কমে  
- নতুন channel add করতে (PushNotifier) পুরোনো logic ভাঙতে হয় না (Open/Closed principle)  

---

### 3) Abstraction

**What is it?**  
Abstraction মানে user-কে শুধু দরকারি interface/behaviour দেখানো, ভিতরের জটিল implementation hide করা।

**Why used?**  
বড় প্রজেক্টে সবাইকে low-level details (API, DB, caching) জানাতে গেলে coupling বাড়ে। Abstraction দিলে module boundary clear থাকে।

**How to use (TypeScript)?**  
Interface/abstract class দিয়ে “কি করবে” define করা, আর “কিভাবে করবে” আলাদা class-এ রাখা।

```ts
interface PaymentGateway {
  charge(amount: number): Promise<void>;
}

class StripeGateway implements PaymentGateway {
  async charge(amount: number) {
    // stripe-specific logic (details hidden from callers)
    console.log(`Charged via Stripe: ${amount}`);
  }
}

async function checkout(gateway: PaymentGateway, amount: number) {
  await gateway.charge(amount);
}
```

**Real-life example**  
Checkout system-এ Stripe/PayPal change হতে পারে। `checkout()` শুধু `PaymentGateway` জানলেই চলে।

**Pain point it solves**  
- vendor/library change করলে কম জায়গায় edit লাগে  
- testing সহজ হয় (mock gateway দেওয়া যায়)  
- coupling কমে, maintainability বাড়ে  

---

### 4) Encapsulation

**What is it?**  
Encapsulation মানে data এবং সেই data-র উপর operation একসাথে রাখা, এবং বাইরে থেকে direct access limit করা (যেমন `private`/`protected`)।

**Why used?**  
বাইরের code যদি internal state ইচ্ছামতো পরিবর্তন করে, bug হয়। Encapsulation state-কে safe রাখে।

**How to use (TypeScript)?**

```ts
class BankAccount {
  private balance = 0;

  deposit(amount: number) {
    if (amount <= 0) throw new Error("Invalid deposit amount");
    this.balance += amount;
  }

  withdraw(amount: number) {
    if (amount <= 0) throw new Error("Invalid withdraw amount");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }
}
```

**Real-life example**  
Bank account-এ কেউ direct `balance = -999` করতে পারবে না। সব change `deposit/withdraw` rules দিয়ে হবে।

**Pain point it solves**  
- invalid state prevent করে  
- rules/validation এক জায়গায় থাকে  
- debugging সহজ হয় কারণ state change controlled  

---

## Conclusion

TypeScript-এর বড় প্রজেক্টে OOP-এর 4 pillar ব্যবহার করলে:
- **Inheritance** common code reuse করে duplication কমায়  
- **Polymorphism** `if/else` জট কমিয়ে extensible design দেয়  
- **Abstraction** complex details hide করে module boundary পরিষ্কার করে  
- **Encapsulation** state safe রাখে এবং bug কমায়  

ফলে logic manage করা সহজ হয়, change করা safer হয়, এবং overall complexity কমে।