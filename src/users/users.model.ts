export class User {
  // самая простенькая модель
  constructor(
    public id: string,
    public firstname: string,
    public lastname: string,
    public bio: string,
    public age: number,
  ) {}
}
