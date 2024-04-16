const testIf = (condition: boolean): jest.It => (condition ? test : test.skip);

const isNode = (): boolean => typeof window === "undefined";

// @ts-expect-error EdgeRuntime is not present in local environment
const isEdgeRuntime = (): boolean => typeof EdgeRuntime !== "undefined";

export { testIf, isNode, isEdgeRuntime };
