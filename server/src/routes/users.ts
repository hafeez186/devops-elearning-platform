import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Users routes' });
});

export default router;
