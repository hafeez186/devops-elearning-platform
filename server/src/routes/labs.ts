import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Labs routes' });
});

export default router;
