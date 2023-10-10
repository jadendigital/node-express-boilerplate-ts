import { Mutex } from 'async-mutex'

import { Foo } from '../types/Foo'
import { knex } from '../util/knex'

const mutex = new Mutex()

export async function getFooNames() {
    // this is not protecting race conditions that could lead to bugs, its just an optimization
    // strategy to prevent multiple queries from being sent to the database at the same time, given
    // the data is user agnostic and is immediately cached in memory. we want the second caller to
    // hit cache instead of the database.

    const dbResults = await mutex.runExclusive(async () => {
        return knex<Foo>('foos').select()
    })

    return dbResults.map((foo) => foo.name)
}
