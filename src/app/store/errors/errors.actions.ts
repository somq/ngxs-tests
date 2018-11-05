export class SetError {
  static readonly type = '[Errors] Set error';
  constructor(public payload: { error: string }) {}
}