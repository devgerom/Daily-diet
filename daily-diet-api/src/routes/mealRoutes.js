const router = require('express').Router();
const mealController = require('../controllers/mealController');
const auth = require('../middlewares/auth');

router.use(auth);

router.post('/', mealController.create);
router.get('/', mealController.list);
router.get('/metrics', mealController.metrics);
router.get('/:id', mealController.show);
router.put('/:id', mealController.update);
router.delete('/:id', mealController.remove);

module.exports = router;