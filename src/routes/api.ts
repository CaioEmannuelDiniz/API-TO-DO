import { Router } from "express";

import * as TodoController from '../controllers/TodoController';

const  router = Router();

//post (CREATE)
router.post('/todo',TodoController.add);
//get (READ)
router.get('/todo',TodoController.all);
//put (UPDATE)
router.put('/todo/:id',TodoController.update)
//delete (DELETE)
router.delete('/todo/:id',TodoController.remove);
export default router;