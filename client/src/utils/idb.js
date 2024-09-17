import { openDB } from 'idb';

const initdb = async () =>
  openDB('recordings', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('recordings')) {
        console.log('recordings database already exists');
        return;
      }
      db.createObjectStore('recordings', { keyPath: 'id', autoIncrement: true });
      console.log('recordings database created');
    },
  });

export const postDb = async (content) => {
  console.log('Post to the recordings');
  const todosDb = await openDB('recordings', 1);
  const tx = todosDb.transaction('recordings', 'readwrite');
  const store = tx.objectStore('recordings');
  const request = store.add({ recording: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

export const getAllDb = async () => {
  console.log('GET all from the database');
  const todosDb = await openDB('recordings', 1);
  const tx = todosDb.transaction('recordings', 'readonly');
  const store = tx.objectStore('recordings');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);
  const todosDb = await openDB('recordings', 1); 
  const tx = todosDb.transaction('recordings', 'readwrite'); 
  const store = tx.objectStore('recordings');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();