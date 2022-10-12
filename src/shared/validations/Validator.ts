export interface Validator<Request> {
  execute: (request: Request) => Promise<Request>
}
