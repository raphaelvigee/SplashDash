import Dexie from 'dexie';

const db = new Dexie('dashboard');

db.version(1).stores({
  images: `id`
});

export default db;
