import express from 'express';
import { getNotes, createNote, updateNote, removeNote, getNote } from './notes';
const router = express.Router();

router.route('/notes').get(getNotes).post(createNote).put(updateNote);

router.route('/notes/:id').get(getNote).delete(removeNote);

export default router;
