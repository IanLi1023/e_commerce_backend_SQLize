const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll(
      {
        include: [{ model: Product }],
      }
    );

    res.json(categories);
  } catch (e) {
    res.json(e);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk({
      include: [{ model: Product }],
    });
    res.json(category);
  } catch (e) {
    res.json(e);
  }
});

router.post('/', (req, res) => {
  // create a new category
  const { category_name } = req.body;
  try {
    const newCategory = await Category.create(
      {
        category_name
      });
    res.json(newCategory);
  } catch (e) {
    res.json(e);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const { category_name } = req.body;
  try {
    await Category.update(
      {
        category_name
      },
      {
        where: {
          id: req.params.id
        }
      });
    const updatedCategory = await Category.findByPk(req.params.id);
    res.json(updatedCategory)
  } catch (e) {
    res.json(e);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.findByPk(req.params.id)
    await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json(deletedCategory);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
