import sqlite3 from "better-sqlite3";

export const db = new sqlite3("recall.db", {
  verbose: console.log,
  fileMustExist: false,
});

db.pragma("journal_mode = WAL");
