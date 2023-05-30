import { User } from '@entities/User'

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    export interface Request {
      user: Partial<User>
    }
  }
}
