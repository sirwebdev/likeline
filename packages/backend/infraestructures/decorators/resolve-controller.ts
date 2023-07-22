import { container, InjectionToken } from 'tsyringe';

export function ResolveController<
  T extends new (...args: any[]) => any,
  ControllerInstance = InstanceType<T>
>(ControllerClass: T) {
  return function(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(req: any, res: any, next: any) {
      const controllerInstance = container.resolve<ControllerInstance>(ControllerClass as InjectionToken<ControllerInstance>);
      return originalMethod.call(controllerInstance, req, res, next);
    };
  };
}
