import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { IHasher } from "../contract/hasher";

@Injectable()
export class Bcrypt implements IHasher {

    private saltRounds = 12;

    hash(input: string): string {
        return bcrypt.hashSync(input, this.saltRounds);
    }

    compare(data: string, encrypted: string): boolean {
        return bcrypt.compareSync(data, encrypted);
    }
}