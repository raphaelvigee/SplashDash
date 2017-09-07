import Dexie from 'dexie';

const db = new Dexie('dashboard');

db.version(1).stores({
  images: `id`,
});

db.version(2).stores({
  history: '++id,imageId'
});

export default db;
