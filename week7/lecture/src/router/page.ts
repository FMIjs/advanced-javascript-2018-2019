import { Router } from 'express';
import { userModel } from '../models';

const pageRouter = Router();

pageRouter.get('/edit/:id', (req, res) => {
  const id = req.params.id
  userModel.findById(id).then(user => {
    if (user === null) {
      res.render('pages/error', { message: '404 Page Not Found' })
    }
    res.render('pages/entity', { user });
  });
});

pageRouter.get('/', (req, res) => {

  // userModel.find().then(([firstUser]) => {
  //   bookModel.create({ title: 'One', user: firstUser.id }).then((book) => {
  //     bookModel.findById(book.id).populate('user').exec().then(sameBook => {
  //       console.log(sameBook);
  //     });
  //   })
  // });
  userModel.find().then(users => {
    res.render('pages/index', { users });
  });
});

pageRouter.get('/add', (req, res) => {
  res.render('pages/entity', { user: { name: '', age: '' } });
});

export { pageRouter };