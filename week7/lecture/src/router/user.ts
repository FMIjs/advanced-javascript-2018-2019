import { Router } from 'express';

const userRouter = Router();

// import { UserModel } from '../db';
import { userModel } from '../models';

userRouter.put('/', (req, res) => {
  const { id, name, age } = req.body;
  if (!id || !name || !age) {
    res.status(400).render('pages/error', { message: '400 Bad Request' });
    return;
  }
  userModel.update({ _id: id }, { name, age }).exec().then(() => {
    res.redirect('/');
  });

  // UserModel.modify({ id: +id }, { name, age })
});

userRouter.post('/', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    res.status(400).render('pages/error', { message: '404 Bad Request' })
  }

  // UserModel.insert({ name, age })
  userModel.create({ name, age }).then(() => {
    res.redirect('/');
  });
});

export { userRouter };