import { UserType } from '../enum/user.type';

export interface User {
    id: number,
    email: string;
    type: UserType,
}