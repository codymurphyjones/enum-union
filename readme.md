# Enum Unions
`enum-unions` is a TypeScript library that provides a declarative way to generate flexible enums and union types with advanced configuration options. It allows you to create enums with different casing styles, number-based enums, and even enums from object types, all while providing enhanced type safety with TypeScript.

### Table of Contents
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Why?](#why-replace-enum)
- [Advanced Usage](#advanced-usage)
- [Number Based Enums](#number-based-enums)
- [Enums from Object Types](#enums-from-object-types)
- [API Reference](#api-reference)
  * [Enum Function](#enum-function)
    + [const object](#const-object)
	+ [index iterator](#index-iterator)
	+ [enum transform](#enum-transform)
		* [lowercase](#a.-lowercase)
		* [uppercase](#b.-uppercase)
		* [capitalize](#c.-capitalize)
		* [uncapitalize](#d.-uncapitalize)
	+ [standard enum](#standard-enum)
	+ [generic enum](#generic-enum)
  * [Enum Type](#enum-type)
    + [Extracting Type From const object](#extracting-type-from-const-object)
	+ [Extracting Type From index iterator](#extracting-type-from-index-iterator)
	+ [Extracting Type From string enum & enum transform](#extracting-type-from-string-enum--enum-transform)
   

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

```ts
import { Enum } from "enum-unions";
```
Then, you can create an enum using the `Enum` function.  The enum function will return a tuple of 2 objects unless the object passed in is a `const object` instead of a collection of keys.

The tuple will always contain 2 objects, The *Enum* and the *Enum Type Extraction*.  
Due to limitations within the typescript system, we had to make some DX sacrifices in order to support union types.


Here's an example of creating a simple enum:

```ts
const [Roles, roles] = Enum("User", "Admin", "Owner");
```
In this example, `Roles` is an enum created with the keys and values of `"User", "Admin", "Owner"`. `roles` is a type used to extract the value union from the `Enum`.  Here is how we use the type extract.

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


## Why replace enum?
TypeScript `enum` is a way of giving more friendly names to sets of numeric or string values. Here's an example of a TypeScript `enum`:

```ts
enum Role {
  User = 'USER',
  Admin = 'ADMIN',
  Owner = 'OWNER'
}
```

In this example, `Role` is an enum with the keys `User`, `Admin`, and `Owner`, and the values `'USER'`, `'ADMIN'`, and `'OWNER'`.

**enum-unions**

The `enum-unions` library provides a more flexible and configurable way to create enums and union types in TypeScript. Here's an example of an enum created with `enum-unions`:

```ts
const [Roles, roles] = Enum("User", "Admin", "Owner");
```

In this example, `Roles` is an enum created with the keys and values of `"User", "Admin", "Owner"`.

**Comparison**

-   **Flexibility**: The `enum-unions` library provides more flexibility than TypeScript's native `enum`. It allows you to create enums with different casing styles, number-based enums, and even enums from object types. This can be particularly useful in more complex applications where you need more control over your enums.
    
-   **Type Safety**: Both TypeScript `enum` and `enum-unions` provide type safety, ensuring that you can only assign valid values to your enums. However, `enum-unions` goes a step further by providing enhanced type safety with TypeScript, allowing you to create union types from your enums.
    
-   **Configuration**: The `enum-unions` library provides advanced configuration options, allowing you to customize your enums to suit your needs. This is not possible with TypeScript's native `enum`.
    
-   **Ease of Use**: TypeScript's native `enum` is simpler and easier to use, especially for beginners or developers who are not familiar with TypeScript's advanced type features. The `enum-unions` library, on the other hand, has a learning curve and may require some time to understand and use effectively.
    

The `enum-unions` library provides a powerful and flexible alternative to TypeScript's native `enum`. It's a great tool for developers who need more control and customization over their enums. However, it does come with a learning curve and may not be necessary for simpler applications or projects.

## Advanced Usage
The `Enum` function supports several configuration options for creating more complex enums.

#### Casing Styles
You can create enums with different casing styles by passing a configuration option as the first argument to the Enum function. The available options are `"lowercase", "uppercase", "capitalize", and "uncapitalize"`. Here are some examples:

```ts
const [LowercaseRoles, lowercaseRoles] = Enum("lowercase", "User", "Admin", "Owner"); 
// { User: "user", Admin: "admin", Owner: "owner" }

const [UppercaseRoles, uppercaseRoles] = Enum("uppercase", "User", "Admin", "Owner");
// { User: "USER", Admin: "ADMIN", Owner: "OWNER" }

const [CapitalizeRoles, capitalizeRoles] = Enum("capitalize", "user", "admin", "owner"); 
// { user: "User", admin: "Admin", owner: "Owner" }

const [UncapitalizeRoles, uncapitalizeRoles] = Enum("uncapitalize", "User", "Admin", "Owner"); 
//{ User: "user", Admin: "admin", Owner: "owner" }
```
## Number-Based Enums
You can also create number-based enums by passing a number as the first argument to the Enum function. The number specifies the length of the enum, and the rest of the arguments are the enum values. Here's an example:

```ts
const [NumRoles, numRoles] = Enum(3, "User", "Admin", "Owner"); // 0, 1, 2
export type NumRoles = Enum<typeof numRoles>; // 0, 1, 2
```

In this example, `NumRoles` is an object of keys with number values associated to them, and `numRoles` is an object to extract the union type of those keys values.

## Enums from Object Types
You can create enums from object types by passing an object as the first argument to the `Enum` function. The object's keys are the enum keys, and the object's values are the enum values. Here's an example:

```ts
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

## API Reference

#### `Enum` Function
The `Enum` function is the primary interface for creating enums. It accepts a variable number of arguments and returns an enum. The first argument determines the type of enum to create:


<a name="const-object"></a>
##### 1. const object
```ts
export  function  Enum(
firstOrConfig:  Record<string, string  |  number>
);
```
**`const object`** overload, used when passing in a cutom object with custom keys.  This function will not work properly unless the object passed into `firstOrConfig`.  `const object` is the only `Enum` that does not output a Tuple because the ObjectType has all the information it needs by default.

 ```ts
const  ObjectType  =  Enum(
           { User:  "user-type", Admin:  "admin-type", Owner:  "owner-type" } 
           as  const); 
```
***
<a name="index-iterator"></a>
##### 2. index iterator
```ts
export  function  Enum(
firstOrConfig:  number,
...items:  string[]
);
```
**`index iterator`** overload is used when the first item passed into the function is a number.  This number is defining how many items will be in the iterator.  Your types will not align correctly to your enum unless the `firstOrConfig` number matches the length of items.  The index iterator creates incremental values based on index for each key.

```ts
const [Cats, catsType] =  Enum(3, "Burmese", "Korat", "Persian"); // Type: 0, 1, 2
```
***
<a name="enum-transform"></a>
##### 3. enum transform
```ts
export  function  Enum<T  extends  string>(
firstOrConfig:  "lowercase" | "uppercase" | "capitalize" | "uncapitialize",
...items:  string[]
);
```
**`enum transform`** overload is used when the first item passed into the function is a string that matches one of the transformation strings. The transformation strings are

```ts
"lowercase" | "uppercase" | "capitalize" | "uncapitialize"
```
Based on the config value provided, the values connected to the keys provided will be adjusted both in value on the object and on the union type generated by to ensure a type and object that matches with the transform.

**Overload Library**
<a name="lowercase"></a>
#### a. lowercase
***Overload***
```ts
export  function  Enum<T  extends  string>(
firstOrConfig:  "lowercase",
...items:  string[]
);
```
***Usage:***
```ts
export  const [Roles, roleType] =  Enum( // Type: "user", "admin", "owner"
     "lowercase",
     "User",
     "Admin",
     "Owner"
);  // Enum { User: "User", Admin: "Admin", Owner: "Owner" }
```
#### b. uppercase
***Overload***
```ts
export  function  Enum<T  extends  string>(
firstOrConfig:  "uppercase",
...items:  string[]
);
```
***Usage:***
```ts
export  const [Roles, roleType] =  Enum( // Type: "USER", "ADMIN", "OWNER"
     "uppercase",
     "User",
     "Admin",
     "Owner"
);   // Enum { User: "USER", Admin: "ADMIN", Owner: "OWNER" }
```
#### c. capitalize
***Overload***
```ts
export  function  Enum<T  extends  string>(
firstOrConfig:  "capitalize",
...items:  string[]
);
```
***Usage:***
```ts
export  const [Roles, roleType] =  Enum( // Type: "User", "Admin", "Owner"
	"capitalize",
	"user",
	"admin",
	"owner"
); // Enum { user: "User", admin: "Admin", owner: "Owner" }
```
#### d. uncapitalize
***Overload***
```ts
export  function  Enum<T  extends  string>(
firstOrConfig:  "uncapitalize",
...items:  string[]
);
```
***Usage:***
```ts
export  const [Roles, roleType] =  Enum( // Type: "user", "admin", "owner"
     "lowercase",
     "User",
     "Admin",
     "Owner"
);  // Enum { User: "user", Admin: "admin", Owner: "owner" }
```
#### 4. standard enum
```ts
export  function  Enum<N  extends  number, T  extends  string>(
firstOrConfig:  string,
...items:  string[]
)
```
If none of the previous config values are provided, then your first value should just be the first key for your enum, the `Enum` object is able to generate a type system based on just the strings provided and the type extraction utility.
```ts
const [Roles, roles] =  Enum("User", "Admin", "Owner"); // Type: "User", "Admin", "Owner"
// Enum { User: "User", Admin: "Admin", Owner: "Owner" }
```
#### 5. generic enum
```ts
export  function  Enum<
	N  extends  number, 
	T  extends  string, 
	D  extends  Record<string, string  |  number>
	>(
		firstOrConfig:  N  |  T  |  D,	
		...items:  T[]
)
```
*Generic Enum  Logic*
- If the first argument is an `object`, it creates an enum from the object type.
- If the first argument is a `number`, it creates a number-based enum with the provided values.
- If the first argument is a `string` that matches one of the casing style options (`"lowercase", "uppercase", "capitalize", "uncapitalize"`), then generate enum with the provided key and the specified casing style for values.
- If the first argument is a `string`, it creates a simple enum with the provided values.

**alias**
```ts
import { Enum } from "enum-unions";
```
or
```ts
import { makeEnum } from "enum-unions";
```

Alias is provided because some developers prefer that their types and objects do not share names.

#### Enum Type
The `Enum` type is a utility type that extracts the enum values from an enum object. It supports all the enum types that can be created with the `Enum` function.

<a name="extract-const-obj"></a>
#### 1. Extracting Type From const object

**`const object`** is the one unique input value for `enum-unions` because unlike every other variation of the `Enum` function, this type does not return a tuple.  It just returns a read only object that can be extracted into a usable type with the `type Enum` effect.
```ts
const  ObjectType  =  Enum({
	User:  "user-type",
	Admin:  "admin-type",
	Owner:  "owner-type",
} as  const);

type  ObjectType  =  Enum<typeof  ObjectType>; // "user-type" | "admin-type" | "owner-type"
```
In this scenario, we pass in the `typeof ObjectType` directly into `type Enum` which is the result value from our `Enum` function call.  The result is a union type of the keys derived from the `const object` originally provided.

#### 2. Extracting Type From `index iterator

**`index iterator`** is the one of the first variations from the default implementation.  It completely eliminates a reliance on string values and instead provides an index based value system to help imitate the default behavior of typescripts `enum`.
```ts
const [Roles, roles] =  Enum(3, "User", "Admin", "Owner"); 
// { User: 0, Admin: 1, Owner: 2 }

export  type  RolesType =  Enum<typeof  roles>; // Type: 0, 1, 2
```
You'll notice the different return type shapes between `index iterator` and `const object` based on the `Enum` parameters, this is important to note when working with `const object` but its generally consistent across the other overloads.

`RolesType` is generated again from the `type Enum` based on the `roles` object rather than the `Roles` object.  This distinction is important because without the two seperate types we're unable to enforce the union types that our code is generation.

#### 3. Extracting Type From `string enum` & `enum transform

`string enum` & `enum transform` operate the exact same as `index iterator` so there isn't a lot to add to this section.  This pattern will generate any of the string values that your enum needs to generate.

*Lowercase:*
```ts
export  const [Roles, roles] =  Enum(
	"lowercase",
	"User",
	"Admin",
	"Owner"
); // { User: 'user', Admin: 'admin', Owner: 'owner' }
export  type  RolesType =  Enum<typeof  roles>; // Type: "user", "admin", "owner"
```
*Uppercase:*
```ts
export  const [Roles, roles] =  Enum(
	"uppercase",
	"User",
	"Admin",
	"Owner"
); // Type: "USER", "ADMIN", "OWNER"
export  type  RolesType =  Enum<typeof  roles>; // Type: "user", "admin", "owner"
```
*Capitalize:*
```ts
export  const [Roles, roles] =  Enum(
	"capitalize",
	"user",
	"admin",
	"owner"
); // Type: "User", "Admin", "Owner"
export  type  RolesType =  Enum<typeof  roles>; // Type: "user", "admin", "owner"
```
*Uncapitalize:*
```ts
export  const [Roles, roles] =  Enum(
	"uncapitalize",
	"User",
	"Admin",
	"Owner"
); // Type: "user", "admin", "owner"
export  type  RolesType =  Enum<typeof  roles>; // Type: "user", "admin", "owner"
```

`RolesType` is generated again from the `type Enum` based on the `roles` object rather than the `Roles` object.  This distinction is important because without the two seperate types we're unable to enforce the union types that our code is generation.

**alias**

```ts
import { Enum } from "enum-unions";
// or
import { type ExtractEnumType } from "enum-unions";
```

Alias is provided because some developers prefer that their types and objects do not share names.

### Conclusion

The `enum-unions` library is a powerful tool for TypeScript developers, offering a flexible and declarative way to generate enums and union types. It provides a variety of advanced configuration options, allowing you to create enums with different casing styles, number-based enums, and even enums from object types. This makes it an invaluable tool for enhancing type safety in your TypeScript projects.

Compared to TypeScript's native `enum` type, `enum-unions` offers more flexibility and advanced configuration options. It allows you to create union types from your enums, providing an extra layer of type safety. It also supports several configuration options for creating more complex enums, including different casing styles, number-based enums, and enums from object types.

Despite some sacrifices in terms of developer experience due to TypeScript's limitations, the library's benefits far outweigh these trade-offs. The `Enum` function's support for several configuration options allows for the creation of more complex enums, and the utility type `Enum` extracts the enum values from an enum object, supporting all the enum types that can be created with the `Enum` function.

The `enum-unions` library is a great addition to any TypeScript developer's toolbox. It's a powerful tool for developers who need more flexibility and control over enums and union types in TypeScript.

If you've got any thoughts, issues, or ideas for making it better, drop a note on our GitHub repo. Remember, it's all about making things better together.