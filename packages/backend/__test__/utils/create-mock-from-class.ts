type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type MockClass<T> = Record<FunctionPropertyNames<T>, jest.Mock>;

const isFunction = (item: unknown): item is (...args: any[]) => any => typeof item === 'function';

const isNotConstructor = (methodName: string): boolean => methodName !== 'constructor';

function createMockedMethods<T extends Record<string, any>>(mockedMethods: Partial<Record<FunctionPropertyNames<T>, jest.Mock>>, methodName: keyof T, ClassPrototype: T) {
  if (isNotConstructor(methodName as string) && isFunction(ClassPrototype[methodName])) {
    mockedMethods[methodName as FunctionPropertyNames<T>] = jest.fn();
  }
  return mockedMethods;
}

function mockMethods<T extends Record<string, any>>(ClassPrototype: T) {
  return (mockedMethods: Partial<Record<FunctionPropertyNames<T>, jest.Mock>>, methodName: keyof T) => {
    return createMockedMethods(mockedMethods, methodName, ClassPrototype);
  };
}

export function createMockFromClass<T extends { new(...args: any[]): any; }>(Class: T): MockClass<T> {
  const methodNames = Object.getOwnPropertyNames(Class.prototype) as Array<keyof InstanceType<T>>;
  return methodNames.reduce(mockMethods(Class.prototype), {}) as Record<FunctionPropertyNames<InstanceType<T>>, jest.Mock<any, any, any>>;
}
