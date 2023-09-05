type ExecuteMethod<P, R> = P extends undefined
  ? () => Promise<R>
  : (payload: P) => Promise<R>;

export interface Service<P = undefined, R = null> {
  execute: ExecuteMethod<P, R>;
}
