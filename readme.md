# TypeScript Enum Unions
enum-unions is a TypeScript library that provides a declarative way to generate flexible enums and union types with advanced configuration options. It allows you to create enums with different casing styles, number-based enums, and even enums from object types, all while providing enhanced type safety with TypeScript.

### Table of Contents
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Advanced Usage](#advanced-usage)
- [API Reference](#api-reference)

<a name="installation"></a>
## Installation
To install typescript-enum-unions via npm, run:

```
npm install enum-unions
yarn add enum-unions
```
<a name="getting-started"></a>

## Getting Started
First, you need to import the Enum function from the library.

```
import { Enum } from "enum-unions";
```
Then, you can create an enum using the Enum function.  The enum function will return a tuple of 2 objects unless the object passed in is an object instead of a collection of keys.

The tuple will always contain 2 objects, The Enum Object and the Enum Type Extraction Object.  Due to limitations within the typescript system, we had to make some DX sacrifices in order to support union types.


Here's an example of creating a simple enum:

```ts
const [Roles, roles] = Enum("User", "Admin", "Owner");
```
In this example, `Roles` is an enum created with the keys and valuyes of "User", "Admin", and "Owner". `roles` is a type used to extract the value union from the Enum.  Here is how we use the type extract.

```ts
export type Roles = Enum<typeof roles>; // "User" | "Admin" | "Owner"
export { Roles }
```

Here is an example of how you can use your enum types to ensure type safety while providing an object to reference in refactors.

```ts
import { Roles } from '../roles'

function RoleTest(role: Roles) {
    console.log(role);
}

RoleTest(Roles.User);  // Success
RoleTest(Roles.Admin); // Success
RoleTest(Roles.Owner); // Success
RoleTest("User");      // Success
RoleTest("Admin");     // Success
RoleTest("Owner");     // Success
RoleTest("user");      // Error
RoleTest("admin");     // Error
RoleTest("owner");     // Error
RoleTest(0);           // Error
```



<a name="advanced-usage"></a>

## Advanced Usage
The `Enum` function supports several configuration options for creating more complex enums.

#### Casing Styles
You can create enums with different casing styles by passing a configuration option as the first argument to the Enum function. The available options are "lowercase", "uppercase", "capitalize", and "uncapitalize". Here are some examples:

```ts
const [LowercaseRoles, lowercaseRoles] = Enum("lowercase", "User", "Admin", "Owner"); // "user", "admin", "owner"
const [UppercaseRoles, uppercaseRoles] = Enum("uppercase", "User", "Admin", "Owner"); // "USER", "ADMIN", "OWNER"
const [CapitalizeRoles, capitalizeRoles] = Enum("capitalize", "user", "admin", "owner"); // "User", "Admin", "Owner"
const [UncapitalizeRoles, uncapitalizeRoles] = Enum("uncapitalize", "User", "Admin", "Owner"); // "user", "admin", "owner"
```

## Number-Based Enums
You can also create number-based enums by passing a number as the first argument to the Enum function. The number specifies the length of the enum, and the rest of the arguments are the enum values. Here's an example:

```
const [NumRoles, numRoles] = Enum(3, "User", "Admin", "Owner"); // 0, 1, 2
export type NumRoles = Enum<typeof numRoles>; // 0, 1, 2
```

In this example, `NumRoles` is an object of keys with number values associated to them, and `numRoles` is an object to extract the union type of those keys values.

## Enums from Object Types
Finally, you can create enums from object types by passing an object as the first argument to the `Enum` function. The object's keys are the enum keys, and the object's values are the enum values. Here's an example:

```
const ObjectType = Enum({
  User: "user-type",
  Admin: "admin-type",
  Owner: "owner-type",
} as const);
type ObjectType = Enum<typeof ObjectType>; // "user-type" | "admin-type" | "owner-type"
```
In this example, `ObjectType` is an enum with the keys `"User", "Admin", and "Owner"`, and the values `"user-type", "admin-type", and "owner-type"`.

When using the Enum Object creation mechanism, always past `as const` to the object to ensure that typescript knows what it is before runtime.

```ts
const NumType = Enum({ User: 2, Admin: 10, Owner: 23 } as const);
type NumType = Enum<typeof NumType>; // 2 | 10 | 23
```

<a name="api-reference"></a>

## API Reference

#### `Enum` Function
The `Enum` function is the primary interface for creating enums. It accepts a variable number of arguments and returns an enum. The first argument determines the type of enum to create:

- If the first argument is a string, it creates a simple enum with the provided values.
- If the first argument is a string that matches one of the casing style options ("lowercase", "uppercase", "capitalize", "uncapitalize"), it creates an enum with the provided values and the specified casing style.
- If the first argument is a number, it creates a number-based enum with the provided values.
- If the first argument is an object, it creates an enum from the object type.

#### Enum Type
The `Enum` type is a utility type that extracts the enum values from an enum object. It supports all the enum types that can be created with the `Enum` function.

### Conclusion
The enum-unions library provides a powerful and flexible way to create enums in TypeScript. Whether you need simple enums, enums with different casing styles, number-based enums, or enums from object types, this library has you covered. Give it a try and see how it can enhance your TypeScript projects!