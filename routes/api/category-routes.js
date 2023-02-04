const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categories = await Category.findAll({
    include: {model: Product}
  });
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const category = await Category.findByPk(req.params.id, {
      include: {model: Product}
    });
    if(!category){
      res.status(404).json({message: 'No category found with this id!'});
      return;
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  if(!req.body.category_name){
    res.status(400).json({message: 'Please enter a category name!'});
    return;
  }
  const newCategory = await Category.create(req.body);
  res.json(newCategory);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  if(!req.body.category_name){
    res.status(400).json({message: 'Please enter a category name!'});
    return;
  }
  try{
    const category = await Category.findByPk(req.params.id);
    if(!category){
      res.status(404).json({message: 'No category found with this id!'});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
  const updatedCategory = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.json(updatedCategory);

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!deletedCategory){
      res.status(404).json({message: 'No category found with this id!'});
      return;
    } else {
      res.json(deletedCategory);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
