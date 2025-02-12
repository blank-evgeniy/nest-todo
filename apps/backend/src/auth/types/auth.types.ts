import { Request } from 'express';
import { UserProfile } from 'src/user/types/user.types';

export interface JwtPayload {
  email: string;
  name: string | null;
  sub: number;
}

export interface RequestWithUser extends Request {
  user: UserProfile;
}
