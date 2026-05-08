## Blog Assignment 02: How do Pick and Omit utility types prevent code duplication while creating specialized `slices` of a master interface? Discuss how this keeps your code DRY (Don't Repeat Yourself).

## Title: `Pick` এবং `Omit` দিয়ে Master Interface থেকে DRY “Slices” তৈরি

## Introduction

TypeScript-এ আমরা অনেক সময় একটি **master interface** (পূর্ণ data model) বানাই। কিন্তু অ্যাপের বিভিন্ন জায়গায় সেই মডেলের ছোট/ভিন্ন version লাগে—যেমন list page-এর জন্য preview, API response-এর জন্য safe version, বা form input type। এগুলো হাতে লিখলে একই field বারবার লেখা হয়, ফলে **code duplication** হয় এবং পরে পরিবর্তন করা কঠিন হয়ে যায়। `Pick` এবং `Omit` master interface থেকে প্রয়োজনমতো “slice” তৈরি করে কোডকে DRY (Don't Repeat Yourself) রাখে।

---

## Body

### 1) Duplication problem

নিচে একটি পূর্ণ `User` model আছে। এখানে একটি sensitive field আছে (`passwordHash`)।

```ts
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}
```

যদি আমরা copy করে হাতে ছোট type বানাই, তাহলে duplication হয়:

```ts
// Manual (duplicate) version — not DRY
interface PublicUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
```

পরে যদি `User.email` পরিবর্তন হয় (rename/type update), তাহলে একাধিক জায়গায় update করতে হবে—এভাবেই bug হয়।

---

### 2) `Pick`: শুধু দরকারি field রাখা

`Pick<T, K>` হলো `T` থেকে নির্দিষ্ট key বেছে নতুন type বানানো।

```ts
type PublicUser = Pick<User, "id" | "name" | "email">;
```

**কেন DRY থাকে:**
- একই field/type বারবার লিখতে হয় না; `User` থেকেই reuse হয়।

---

### 3) `Omit`: যেটা দরকার নেই সেটা বাদ দেওয়া

`Omit<T, K>` হলো `T` থেকে কিছু key বাদ দিয়ে বাকি সব রেখে নতুন type বানানো।

```ts
type SafeUser = Omit<User, "passwordHash">;
```

**কেন DRY থাকে:**
- একটাই master interface maintain করলে হয়, সাথে ছোট করে exclude list দিলেই কাজ।

---

### 4) বাস্তব কাজে সাধারণ “slices”

বাস্তবে একই model-এর ভিন্ন ভিন্ন “slice” বিভিন্ন জায়গায় লাগে।

#### A) Preview type (e.g., list page)

```ts
type UserPreview = Pick<User, "id" | "name">;
```

list/table-এ শুধু দরকারি অংশ দেখাতে এটা ব্যবহার করা যায়।

#### B) API response type (hide sensitive field)

```ts
type UserResponse = Omit<User, "passwordHash">;
```

client-এ user data পাঠানোর সময় sensitive field বাদ দিতে এটা ব্যবহার করা যায়।

#### C) Create input type (no `id` / `createdAt` yet)

```ts
type CreateUserInput = Omit<User, "id" | "createdAt" | "passwordHash"> & {
  password: string;
};
```

ফর্ম থেকে সাধারণত `passwordHash` যায় না—plain password যায়। এই type সেটা পরিষ্কার করে এবং master model-এর সাথে consistent রাখে।

---

## Conclusion

`Pick` এবং `Omit` master interface থেকে প্রয়োজনমতো “slice” তৈরি করে code duplication কমায়। এতে কোড DRY থাকে—কারণ model একবার define করলেই হয়, তারপর ছোট ছোট পরিবর্তনসহ সব জায়গায় reuse করা যায়।