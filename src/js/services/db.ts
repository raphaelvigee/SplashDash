import Dexie from 'dexie';

export class AppDatabase extends Dexie {
    images: Dexie.Table<IImage, string>;

    constructor() {
        super('dashboard');

        let db = this;

        db.version(1).stores({
            images: `id`
        });
    }
}

export interface IImage {
    id: string
}

export default new AppDatabase();
