export interface JwtPayload {
  email: string;
  name: string | null;
  sub: number;
}
