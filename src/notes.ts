import { Request, Response } from 'express';
// eslint-disable-next-line @cspell/spellchecker
import { v4 as uuidv4 } from 'uuid';

interface Note {
  id: string;
  title: string;
  body: string;
}

let notes: Note[] = [];

export function getNotes(req: Request, res: Response) {
  res.json(notes);
}

export function getNote(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  const note = notes.find((note) => note.id === id);
  res.json(note);
}

export function createNote(req: Request, res: Response) {
  const { title, body } = req.body as Note;
  // eslint-disable-next-line @cspell/spellchecker, @typescript-eslint/no-unsafe-call
  const id = uuidv4() as unknown as string;
  notes.push({ id, title, body });
  res.send();
}

export function updateNote(req: Request, res: Response) {
  const { id } = req.query as { id: string };
  const index = notes.findIndex((note) => note.id === id);
  const { title, body } = req.body as Note;
  notes[index] = { id, title, body };
  res.send();
}

export function removeNote(req: Request, res: Response) {
  const { id } = req.params as { id: string };
  notes = notes.filter((note) => note.id !== id);
  res.send();
}
