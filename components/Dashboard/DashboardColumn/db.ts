import Dexie from 'dexie';

export const db = new Dexie('DashboardColumnDB');

db.version(1).stores({
  cardOrders: '&columnId',
});

export const cardOrdersTable = db.table('cardOrders');
