import * as pg from 'pg';

export let postgres: pg.Client;

export async function initialize() {
    postgres = new pg.Client();
    await postgres.connect();
}
