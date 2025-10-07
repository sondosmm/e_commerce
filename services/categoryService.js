const Category = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

//@des get all categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  const categories = await Category.find().skip(skip).limit(limit);

  res.status(200).json({ total: categories.length, page, data: categories });
});

//@des get single category
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404).json({ message: `no category for this id: ${id}` });
  } else {
    res.status(200).json({ data: category });
  }
});

//@des create category
// @route POST /api/v1/categories
// @access Public
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const category = await Category.create({ name, slug: slugify(name) });
  res
    .status(201)
    .json({ message: "Category created successfully", data: category });
});

//@des update category
// @route PUT /api/v1/categories/:id
// @access Private

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name ,slug:slugify (name)},
    { new: true }
  );
  if (!category) {
    res.status(404).json({ message: `no category for this id: ${id}` });
  } else {
    res.status(200).json({ data: category });
  }
});


//@des delete category
// @route DELETE /api/v1/categories/:id
// @access Private

exports.deleteCategory = asyncHandler(async(req, res) => {
  const{id}=req.params
  const category = await Category.findByIdAndDelete(id)
  if (!category) {
    res.status(404).json({ message: `no category for this id: ${id}` });
  } else {
    res.status(204).send();
  }
})
