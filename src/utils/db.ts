import sqlite3 from "better-sqlite3";

export const db = new sqlite3("recall.db", {
  verbose: console.log,
  fileMustExist: false,
});

db.pragma("journal_mode = WAL");

export const dbQuery = (query: string, ...params: any) => {
  const row = db.prepare(query).get(...params);
  return row;
};

export const dbMutate = (query: string, ...params: any) => {
  const row = db.prepare(query).run(...params);
  return row;
};
