export function logger<
  This,
  Args extends any[],
  Return,
  Fn extends (this: This, ...args: Args) => Return
>(target: Fn, context: ClassMethodDecoratorContext<ThisParameterType<Fn>, Fn>) {
  const { name: method } = context;
  const methodName = method.toString();

  function logMethod(
    this: ThisParameterType<Fn>,
    ...args: Parameters<Fn>
  ): Return {
    console.log(`Calling ${methodName}`);
    const returnValue = target.call(this, ...args);
    console.log(`Returning ${methodName}`);
    return returnValue;
  }

  return logMethod;
}
