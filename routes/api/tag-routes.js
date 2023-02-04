const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tags = await Tag.findAll({
    include: {model: Product}
  });
  res.json(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
    const tag = await Tag.findByPk(req.params.id, {
      include: {model: Product}
    });
    if(!tag){
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    } else {
      res.json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  if(!req.body.tag_name){
    res.status(400).json({message: 'Please enter a tag name!'});
    return;
  }
  const newTag = await Tag.create(req.body);
  res.json(newTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  if(!req.body.tag_name){
    res.status(400).json({message: 'Please enter a tag name!'});
    return;
  }
  try{
    const tag = await Tag.findByPk(req.params.id);
    if(!tag){
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
  const updatedTag = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.json(updatedTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(deletedTag);

});

module.exports = router;
