import { Foo } from '../types/Foo'
import { knex } from '../util/knex'

export async function getFooNames() {
    const foos = await knex<Foo>('foos').select()
    return foos.map((foo) => foo.name)
}
