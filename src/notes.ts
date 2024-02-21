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
  res.status(200);
  res.json(notes);
}

export function getNote(req: Request, res: Response) {
  const { id } = req.params as { id: string };

  if (!id) {
    res.status(400);
    return res.send();
  }

  const index = notes.findIndex((note) => note.id === id);

  if (index < 0) {
    res.status(404);
    return res.send();
  }

  res.status(200);
  res.json(notes[index]);
}

export function createNote(req: Request, res: Response) {
  const { title, body } = req.body as Note;

  if (!title || !body) {
    res.status(400);
    return res.send();
  }

  // eslint-disable-next-line @cspell/spellchecker, @typescript-eslint/no-unsafe-call
  const id = uuidv4() as unknown as string;
  notes.push({ id, title, body });
  res.status(201);
  res.send({ id, title, body });
}

export function updateNote(req: Request, res: Response) {
  const { id } = req.params as { id: string };

  if (!id) {
    res.status(400);
    return res.send();
  }

  const index = notes.findIndex((note) => note.id === id);

  if (index < 0) {
    res.status(404);
    return res.send();
  }

  const { title, body } = req.body as Note;

  if (!title || !body) {
    res.status(400);
    return res.send();
  }

  notes[index] = { id, title, body };
  res.status(201);
  res.send(notes[index]);
}

export function removeNote(req: Request, res: Response) {
  const { id } = req.params as { id: string };

  if (!id) {
    res.status(400);
    return res.send();
  }

  const index = notes.findIndex((note) => note.id === id);

  if (index < 0) {
    res.status(404);
    return res.send();
  }

  notes = notes.filter((note) => note.id !== id);
  res.status(204);
  res.send();
}
