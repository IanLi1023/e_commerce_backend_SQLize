const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = Tag.findAll(
      {
        include: [{ model: Product }],
      }
    );

    res.json(tags);
  } catch (e) {
    res.json(e);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = Tag.findByPk({
      include: [{ model: Product }],
    });
    res.json(tag);
  } catch (e) {
    res.json(e);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  const { tag_name } = req.body;
  try {
    const newTag = Tag.create(
      {
        tag_name
      });
    res.json(newTag);
  } catch (e) {
    res.json(e);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const { tag_name } = req.body;
  try {
    Tag.update(
      {
        tag_name
      },
      {
        where: {
          id: req.params.id
        }
      });
    const updatedTag = Tag.findByPk(req.params.id);
    res.json(updatedTag)
  } catch (e) {
    res.json(e);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` 
  try {
    const deletedTag = Tag.findByPk(req.params.id)
    Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json(deletedTag);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
