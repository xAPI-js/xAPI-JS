import { toBasicAuth } from "./toBasicAuth";

const pairs = [
  ["tom", "1234"],
  ["BUG-mb'5#,:,fC83", "4jXGtgwY%\\'xm.k;"],
  ["Mr}VBHb^)zyc39`<", '?YrAhvP{}"s94:%%'],
];

const encodedPairs = [
  "Basic dG9tOjEyMzQ=",
  "Basic QlVHLW1iJzUjLDosZkM4Mzo0alhHdGd3WSVcJ3htLms7",
  "Basic TXJ9VkJIYl4penljMzlgPDo/WXJBaHZQe30iczk0OiUl",
];

test("converts username and password into Basic Auth header", () => {
  const helperFunction = (pair) => toBasicAuth(pair[0], pair[1]);

  const results = pairs.map((pair, index) => {
    return encodedPairs[index] === helperFunction(pair);
  });

  return expect(results).not.toContain(false);
});

test("still converts using Buffer if btoa is not supported", () => {
  // @ts-expect-error Overriding global/window btoa
  if (typeof btoa === "function") btoa = undefined;

  const helperFunction = (pair) => toBasicAuth(pair[0], pair[1]);

  const results = pairs.map((pair, index) => {
    return encodedPairs[index] === helperFunction(pair);
  });

  expect(results).not.toContain(false);
  expect(() => toBasicAuth("", "")).not.toThrow();
});

test("throws error if environment not supported", () => {
  // @ts-expect-error Overriding global/window btoa
  if (typeof btoa === "function") btoa = undefined;
  // @ts-expect-error Overriding global/window Buffer
  if (Buffer) Buffer = undefined;
  expect(() => toBasicAuth("", "")).toThrow(
    new Error("Environment does not support base64 conversion.")
  );
});
