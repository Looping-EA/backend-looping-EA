import { Router } from 'express';
import { addEntry, getEntrys, updateEntry, deleteEntry } from '../controllers/entry.controller'

const entry_router = Router();

entry_router.route('/entry/add')
    .post(addEntry)

entry_router.route('/entry/')
    .get(getEntrys)

entry_router.route('/entry/update')
    .put(updateEntry)

entry_router.route('/entry/delete')
    .delete(deleteEntry)

export default entry_router;