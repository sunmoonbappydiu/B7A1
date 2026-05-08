# TypeScript OOP & Utility Types — Assignment Portfolio

## Overview

This repository contains TypeScript problem solutions and conceptual blog posts covering core TypeScript and OOP concepts.

---

## 📁 Repository Structure

```
├── solutions.ts        # TypeScript problem solutions (Problems 1–7)
├── blog-1.md           # Blog: OOP 4 Pillars in TypeScript
├── blog-2.md           # Blog: Pick & Omit Utility Types
└── README.md
```

---

## 🛠️ solutions.ts — Problem Summary

| Problem | Topic | Description |
|---------|-------|-------------|
| 1 | Array Filter | `filterEvenNumbers` — filters even numbers from an array |
| 2 | String Manipulation | `reverseString` — reverses a string |
| 3 | Union Types & Type Guards | `checkType` — returns `"String"` or `"Number"` based on input type |
| 4 | Generics | `getProperty<T, K>` — safely retrieves a typed property from an object |
| 5 | Interface & Spread | `toggleReadStatus` — extends a `Book` object with an `isRead` boolean |
| 6 | Class & Inheritance | `Person` base class, `Student` subclass with `getDetails()` method |
| 7 | Set Intersection | `getIntersection` — returns common elements from two arrays using `Set` |

### Run the solutions

```bash
npx ts-node solutions.ts
```

---

## 📝 Blog Posts

### Blog 01 — `Pick` এবং `Omit` দিয়ে DRY "Slices" তৈরি

Covers how TypeScript utility types keep code DRY when working from a master interface:

- **`Pick<T, K>`** — selects only needed fields (e.g., `UserPreview`)
- **`Omit<T, K>`** — excludes sensitive/irrelevant fields (e.g., `SafeUser` without `passwordHash`)
- Practical patterns: API response types, form input types, list preview types

### Blog 02 — OOP-এর 4 Pillar কীভাবে TypeScript-এ Complexity কমায়

Covers how the four pillars of Object-Oriented Programming manage logic in large-scale TypeScript projects:

- **Inheritance** — reuses common logic via parent/child classes (`Person` → `Student`)
- **Polymorphism** — swappable implementations behind a shared interface (e.g., `Notifier` → `EmailNotifier`, `SmsNotifier`)
- **Abstraction** — hides implementation details, exposes only what callers need (e.g., `PaymentGateway`)
- **Encapsulation** — protects internal state with access modifiers (e.g., `private balance` in `BankAccount`)

---

## 🔑 Key Concepts Used

- TypeScript generics with `extends keyof` constraints
- Union types and `typeof` type guards
- Interface design and `implements`
- Class inheritance with `super()`
- Utility types: `Pick`, `Omit`, intersection types (`&`)
- `Set` for O(1) lookup in array intersection

---

## 📦 Requirements

- Node.js ≥ 18
- TypeScript ≥ 5.x

```bash
npm install -g typescript ts-node
```
