export class SetCurrentFilter {
  static readonly type = '[Filter] Set current filter';
  constructor(public payload: { filter: string }) {}
}