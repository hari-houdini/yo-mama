export function logger<
  This,
  Args extends any[],
  Return,
  Fn extends (self: This, ...args: Args) => Return
>(target: Fn, context: ClassMethodDecoratorContext<This, Fn>) {
  const { name: method } = context;
  const methodName = method.toString();

  function logMethod(self: This, ...args: Args): Return {
    console.log(`Calling ${methodName}`);

    // @ts-ignore
    const returnValue = target.call(self, ...args);
    console.log(`Returning ${methodName}`);
    return returnValue;
  }

  return logMethod;
}
