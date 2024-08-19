import { db } from "./db";

export const seed = () => {
  db.exec(
    `CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT '',
      folder_id INTEGER,
      modified_date TEXT DEFAULT CURRENT_TIMESTAMP,
      folder_index INTEGER,

      FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE  
    );

    CREATE INDEX IF NOT EXISTS idx_folders_name ON folders(name);
    CREATE INDEX IF NOT EXISTS idx_folders_modified_date ON folders(modified_date);
    CREATE INDEX IF NOT EXISTS idx_folders_folder_id ON folders(folder_id);
    
    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      folder_id INTEGER,  -- Reference to the folder table
      ai_summary TEXT,
      link TEXT NOT NULL,
      icon TEXT, 
      last_opened TEXT, 
      bookmark_index INTEGER,
      favorited BOOLEAN DEFAULT 0,  
      downloaded_content_path TEXT,
      note TEXT,  -- Optional text
      ai_tags TEXT,  -- Optional text
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE  
    );
    
    CREATE INDEX IF NOT EXISTS idx_bookmarks_last_opened ON bookmarks(last_opened);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_ai_summary ON bookmarks(ai_summary);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_ai_tags ON bookmarks(ai_tags);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_name ON bookmarks(name);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_folder_id ON bookmarks(folder_id);
    `,
  );
};
