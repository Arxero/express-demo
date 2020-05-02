import express, { Request, Response, Router } from 'express';
import { Course, CourseDB, validateCourse } from '../models';
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router: Router = express.Router();

router.get('/', auth, async (req: Request, res: Response) => {
  const result = await CourseDB.find()
    .sort({ name: 1 })
    .limit(10);
  res.send(result);
});

router.post('/', async (req: Request, res: Response) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = new CourseDB({ name: req.body.name } as Course);

  try {
    const result = await course.save();
    res.send(result);
  } catch (ex) {
    res.status(500).send('Something failed.');
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await CourseDB.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      updatedAt: new Date(Date.now()),
    } as Course,
    {
      new: true,
    }
  ).select(['name', 'createdAt', 'updatedAt']);

  if (!result) return res.status(404).send('Not Found');
  res.send(result);
});

router.delete('/:id', [auth, admin], async (req: Request, res: Response) => {
  const result = await CourseDB.findByIdAndRemove(req.params.id);
  if (!result) return res.status(404).send('Not Found');
  res.send(result);
});

router.get('/:id', async (req: Request, res: Response) => {
  const result = await CourseDB.findById(req.params.id).select(['name', 'createdAt', 'updatedAt']);
  if (!result) return res.status(404).send('Not Found');
  res.send(result);
});

module.exports = router;
