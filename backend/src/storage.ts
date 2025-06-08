import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  username: string;
  password: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  theme: string;
  status: string;
  userId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

class Storage {
  private usersFile: string;
  private notesFile: string;

  constructor() {
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    this.usersFile = path.join(dataDir, 'users.json');
    this.notesFile = path.join(dataDir, 'notes.json');
    this.initializeFiles();
  }

  private initializeFiles() {
    if (!fs.existsSync(this.usersFile)) {
      fs.writeFileSync(this.usersFile, JSON.stringify([]));
    }
    if (!fs.existsSync(this.notesFile)) {
      fs.writeFileSync(this.notesFile, JSON.stringify([]));
    }
  }

  private readFile<T>(file: string): T[] {
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
  }

  private writeFile<T>(file: string, data: T[]): void {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }

  // User methods
  async createUser(username: string, password: string): Promise<User> {
    const users = this.readFile<User>(this.usersFile);
    if (users.some(u => u.username === username)) {
      throw new Error('Username already exists');
    }
    const user: User = {
      id: uuidv4(),
      username,
      password
    };
    users.push(user);
    this.writeFile(this.usersFile, users);
    return user;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const users = this.readFile<User>(this.usersFile);
    return users.find(u => u.username === username) || null;
  }

  // Note methods
  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const notes = this.readFile<Note>(this.notesFile);
    const newNote: Note = {
      ...note,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    notes.push(newNote);
    this.writeFile(this.notesFile, notes);
    return newNote;
  }

  async getNotesByUserId(userId: string): Promise<Note[]> {
    const notes = this.readFile<Note>(this.notesFile);
    return notes.filter(n => n.userId === userId).sort((a, b) => a.order - b.order);
  }

  async updateNote(id: string, userId: string, updates: Partial<Note>): Promise<Note | null> {
    const notes = this.readFile<Note>(this.notesFile);
    const index = notes.findIndex(n => n.id === id && n.userId === userId);
    if (index === -1) return null;

    notes[index] = {
      ...notes[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.writeFile(this.notesFile, notes);
    return notes[index];
  }

  async deleteNote(id: string, userId: string): Promise<boolean> {
    const notes = this.readFile<Note>(this.notesFile);
    const initialLength = notes.length;
    const filteredNotes = notes.filter(n => !(n.id === id && n.userId === userId));
    if (filteredNotes.length === initialLength) return false;
    this.writeFile(this.notesFile, filteredNotes);
    return true;
  }
}

export const storage = new Storage(); 