const prisma = require('../lib/prisma');

module.exports = {
  async create(req, res) {
    const { name, description, datetime, isOnDiet } = req.body;

    if (!name || !description || !datetime || isOnDiet === undefined) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const meal = await prisma.meal.create({
      data: {
        name,
        description,
        datetime: new Date(datetime),
        isOnDiet,
        userId: req.userId,
      },
    });

    return res.status(201).json(meal);
  },

  async list(req, res) {
    const meals = await prisma.meal.findMany({
      where: { userId: req.userId },
      orderBy: { datetime: 'desc' },
    });
    return res.json(meals);
  },

  async show(req, res) {
    const { id } = req.params;

    const meal = await prisma.meal.findFirst({
      where: { id, userId: req.userId },
    });

    if (!meal) {
      return res.status(404).json({ error: 'Refeição não encontrada' });
    }

    return res.json(meal);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, description, datetime, isOnDiet } = req.body;

    const mealExists = await prisma.meal.findFirst({
      where: { id, userId: req.userId },
    });

    if (!mealExists) {
      return res.status(404).json({ error: 'Refeição não encontrada' });
    }

    const meal = await prisma.meal.update({
      where: { id },
      data: {
        name: name ?? mealExists.name,
        description: description ?? mealExists.description,
        datetime: datetime ? new Date(datetime) : mealExists.datetime,
        isOnDiet: isOnDiet ?? mealExists.isOnDiet,
      },
    });

    return res.json(meal);
  },

  async remove(req, res) {
    const { id } = req.params;

    const meal = await prisma.meal.findFirst({
      where: { id, userId: req.userId },
    });

    if (!meal) {
      return res.status(404).json({ error: 'Refeição não encontrada' });
    }

    await prisma.meal.delete({ where: { id } });
    return res.status(204).send();
  },

  async metrics(req, res) {
    const meals = await prisma.meal.findMany({
      where: { userId: req.userId },
      orderBy: { datetime: 'asc' },
    });

    const totalMeals = meals.length;
    const onDietMeals = meals.filter((m) => m.isOnDiet).length;
    const offDietMeals = totalMeals - onDietMeals;

    let bestStreak = 0;
    let currentStreak = 0;

    for (const meal of meals) {
      if (meal.isOnDiet) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    return res.json({
      totalMeals,
      onDietMeals,
      offDietMeals,
      bestOnDietStreak: bestStreak,
    });
  },
};