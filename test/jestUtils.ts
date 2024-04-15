const testIf = (condition: boolean): jest.It => (condition ? test : test.skip);

const isNode = (): boolean => typeof window === "undefined";

// @ts-ignore
const isEdgeRuntime = (): boolean => typeof EdgeRuntime !== "undefined";

export { testIf, isNode, isEdgeRuntime };
