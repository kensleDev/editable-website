/** Use a singleton DB instance */
const db = _db.instance;
import _db from '../_db';

/**
 * TODO: Turn this into a Postgres function
 */
export async function createOrUpdateCounter(counterId) {
  return await db.tx('create-or-update-counter', async t => {
    const counterExists = await t.oneOrNone(
      'SELECT counter_id FROM counters WHERE counter_id = $1',
      [counterId]
    );
    if (counterExists) {
      return await t.one(
        'UPDATE counters SET count = count + 1 WHERE counter_id = $1 RETURNING count',
        [counterId]
      );
    } else {
      return await t.one('INSERT INTO counters (counter_id, count) values($1, 1) RETURNING count', [
        counterId
      ]);
    }
  });
}
