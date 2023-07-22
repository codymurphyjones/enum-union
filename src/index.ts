type Indices<
  N extends number,
  R extends readonly number[] = []
> = R["length"] extends N ? R[number] : Indices<N, [...R, R["length"]]>;
type EnumMap<T extends string> = { _type: "enum" } & Record<T, T>;
type LowercaseEnumMap<T extends string> = { _type: "lowercase" } & Record<
  T,
  Lowercase<T>
>;
type UppercaseEnumMap<T extends string> = { _type: "uppercase" } & Record<
  T,
  Uppercase<T>
>;
type CapitalizeEnumMap<T extends string> = { _type: "capitalize" } & Record<
  T,
  Capitalize<T>
>;
type UncapitalizeEnumMap<T extends string> = { _type: "uncapitalize" } & Record<
  T,
  Uncapitalize<T>
>;

type ConfigOptions =
  | "enum"
  | "lowercase"
  | "uppercase"
  | "capitalize"
  | "uncapitalize";

type OmitType<T> = Omit<T, "_type">;

type EnumConfiguration<
  T extends string,
  U extends string
> = U extends "lowercase"
  ? LowercaseEnumMap<T>
  : U extends "uppercase"
  ? UppercaseEnumMap<T>
  : U extends "capitalize"
  ? CapitalizeEnumMap<T>
  : U extends "uncapitalize"
  ? UncapitalizeEnumMap<T>
  : EnumMap<T>;

type EnumFromStrings<T extends string[], V extends number> = { _type: V } & {
  [U in T[number]]: Indices<V>;
};

export type Enum<T> = T extends { _type: infer U }
  ? U extends "lowercase"
    ? Lowercase<string & T[keyof Omit<T, "_type">]>
    : U extends "uppercase"
    ? Uppercase<string & T[keyof Omit<T, "_type">]>
    : U extends "capitalize"
    ? Capitalize<string & T[keyof Omit<T, "_type">]>
    : U extends "uncapitalize"
    ? Uncapitalize<string & T[keyof Omit<T, "_type">]>
    : U extends number
    ? Indices<U>
    : T[keyof Omit<T, "_type">]
  : ExtractEnumObjValues<T>;

type ExtractEnumObjValues<T> = T extends Record<string, infer U> ? U : never;


function makeEnumObj<T extends Record<string, string | number>>(obj: T): T {
  return Object.freeze(obj);
}

function makeEnumNumber<N extends number, T extends string[]>(
  length: N,
  ...items: T
): [OmitType<EnumFromStrings<T, N>>, EnumFromStrings<T, N>] {
  if (items.length > length) {
    throw new Error(
      `makeEnumNumber: The number of items (${items.length}) cannot be more than the provided length (${length})`
    );
  }

  const obj: Record<string, number> = {};

  items.forEach((key, index) => {
    obj[key] = index;
  });
  obj._type = 0;

  return [Object.freeze(obj) as OmitType<EnumFromStrings<T, N>>, Object.freeze(obj) as EnumFromStrings<T, N>];
}

function makeEnumString<T extends string>(
  firstOrConfig: "lowercase",
  ...items: T[]
): [
  OmitType<EnumConfiguration<T, "lowercase">>,
  EnumConfiguration<T, "lowercase">
];
function makeEnumString<T extends string>(
  firstOrConfig: "uppercase",
  ...items: T[]
): [
  OmitType<EnumConfiguration<T, "uppercase">>,
  EnumConfiguration<T, "uppercase">
];
function makeEnumString<T extends string>(
  firstOrConfig: "capitalize",
  ...items: T[]
): [
  OmitType<EnumConfiguration<T, "capitalize">>,
  EnumConfiguration<T, "capitalize">
];
function makeEnumString<T extends string>(
  firstOrConfig: "uncapitalize",
  ...items: T[]
): [
  OmitType<EnumConfiguration<T, "uncapitalize">>,
  EnumConfiguration<T, "uncapitalize">
];
function makeEnumString<T extends string>(
  firstOrConfig: T,
  ...items: T[]
): [OmitType<EnumConfiguration<T, "enum">>, EnumConfiguration<T, "enum">];
function makeEnumString<T extends string>(
  firstOrConfig: T,
  ...items: T[]
): [
  OmitType<EnumConfiguration<T, ConfigOptions>>,
  EnumConfiguration<T, ConfigOptions>
] {
  const configOptions = [
    "lowercase",
    "uppercase",
    "capitalize",
    "uncapitalize",
  ];

  if (configOptions.includes(firstOrConfig)) {
    const enumMap: { [key: string]: string } = {};
    items.forEach((item) => {
      switch (firstOrConfig) {
        case "lowercase":
          enumMap[item] = item.toLowerCase();
          break;
        case "uppercase":
          enumMap[item] = item.toUpperCase();
          break;
        case "capitalize":
          enumMap[item] = item.charAt(0).toUpperCase() + item.slice(1);
          break;
        case "uncapitalize":
          enumMap[item] = item.charAt(0).toLowerCase() + item.slice(1);
          break;
        default:
          enumMap[item] = item;
          break;
      }
    });
    return [
      Object.freeze(enumMap) as OmitType<EnumConfiguration<T, T>>,
      Object.freeze(enumMap) as EnumConfiguration<T, T>,
    ];
  } else {
    const enumMap: { [key: string]: string } = {};
    items.forEach((item) => {
      enumMap[item] = item;
    });
    return [
      Object.freeze(enumMap) as OmitType<EnumConfiguration<T, T>>,
      Object.freeze(enumMap) as EnumConfiguration<T, T>,
    ];
  }
}

export function Enum<D extends Record<string, string | number>>(
  firstOrConfig: D
): { [K in keyof D]: D[K] };
export function Enum<N extends number, T extends string>(
  firstOrConfig: N,
  ...items: T[]
): [OmitType<EnumFromStrings<T[], N>>, EnumFromStrings<T[], N>];
export function Enum<T extends string>(
  firstOrConfig: "lowercase",
  ...items: T[]
): [
  OmitType<EnumConfiguration<T, "lowercase">>,
  EnumConfiguration<T, "lowercase">
];
export function Enum<T extends string>(
  firstOrConfig: "uppercase",
  ...items: T[]
): [
  OmitType<EnumConfiguration<T, "uppercase">>,
  EnumConfiguration<T, "uppercase">
];
export function Enum<T extends string>(
  firstOrConfig: "capitalize",
  ...items: T[]
): [
  OmitType<EnumConfiguration<T, "capitalize">>,
  EnumConfiguration<T, "capitalize">
];
export function Enum<T extends string>(
  firstOrConfig: "uncapitalize",
  ...items: T[]
): [
  OmitType<EnumConfiguration<T, "uncapitalize">>,
  EnumConfiguration<T, "uncapitalize">
];
export function Enum<T extends string>(
  firstOrConfig: T,
  ...items: T[]
): [OmitType<EnumConfiguration<T, "enum">>, EnumConfiguration<T, "enum">];
export function Enum<N extends number, T extends string>(
  firstOrConfig: T,
  ...items: T[]
): [
  OmitType<EnumConfiguration<T, ConfigOptions>>,
  EnumConfiguration<T, ConfigOptions>
];
export function Enum<N extends number, T extends string, D extends Record<string, string | number>>(
  firstOrConfig: N | T | D,
  ...items: T[]
):
  |  { [K in keyof D]: D[K] }
  | [OmitType<EnumFromStrings<T[], N>>, EnumFromStrings<T[], N>]
  | [
      OmitType<EnumConfiguration<T, ConfigOptions>>,
      EnumConfiguration<T, ConfigOptions>
    ] {
  const configOptions = [
    "lowercase",
    "uppercase",
    "capitalize",
    "uncapitalize",
  ];

  if (typeof firstOrConfig === "object") {
    return makeEnumObj(firstOrConfig);
  } else if (typeof firstOrConfig === "number") {
    return makeEnumNumber(firstOrConfig, ...items);
  } else {
    const hasConfig = configOptions.includes(firstOrConfig);
    const configValue = hasConfig ? firstOrConfig : "enum";
    const itemList = hasConfig ? items : [firstOrConfig, ...items];
    return makeEnumString(configValue, ...itemList);
  }
}

export type ExtractEnumType<T> = Enum<T>;
export const makeEnum = Enum;
