const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Category = require('../models/Category');
const { createCategoryTree, getCategoryPath } = require('../utils/categories');

exports.getCategories = asyncHandler(async (req, res, next) => {

  const categories = await Category.find();

  res.status(200).json({
    success: true,
    data: categories
  });

});

exports.getCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.findById(req.params.id);

    if(!category){
      next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: category
    });
});

exports.getCategoryByUrl = asyncHandler(async (req, res, next) => {

  const category = await Category.findOne({url: req.params.url});

  if(!category){
    next(new ErrorResponse(`Category not found with url of ${req.params.url}`, 404));
  }

  res.status(200).json({
    success: true,
    data: category
  });

});

exports.getCategoryTree = asyncHandler(async (req, res, next) => {

  const categories = await Category.find().lean();

  const categoryTree = createCategoryTree(categories);

  res.status(200).json({
    success: true,
    data: categoryTree
  });

});

exports.getCategoryOptions = asyncHandler(async (req, res, next) => {
  
  const categories = await Category.find().lean();

  const categoryOptions = [];

  const categoryLookup = {};

  for(let category of categories) {

    categoryLookup[category._id] = category;

  }

  for(let category of categories) { 

    let categoryPath = getCategoryPath(category, categoryLookup);

    categoryOptions.push({
      _id: category._id,
      path: categoryPath
    });
  }

  res.status(200).json({
    success: true,
    data: categoryOptions
  });

});

exports.getCategoryPath = asyncHandler(async (req, res, next) => {

  let category = await Category.findOne({url: req.params.url});

  if(!category) {
    return next(new ErrorResponse(`Category not found with url ${url}.`, 404));
  }

  const categoryPath = [];

  while(true) {

    categoryPath.push({
      name: category.name,
      url: category.url
    });

    if(category.parent === null || category.parent === '') {
      break;
    }

    category = await Category.findById(category.parent);

  }

  categoryPath.reverse();

  const finalCategoryPath = [];

  for(const index in categoryPath) {

    const newUrl = categoryPath.slice(0, parseInt(index)+1).map(catItem => catItem.url).join('/');

    finalCategoryPath.push({
      name: categoryPath[index].name,
      url: newUrl
    });

  }

  res.status(200).json({
    success: true,
    data: finalCategoryPath
  });

});

exports.createCategory = asyncHandler(async (req, res, next) => {

  const files = { ...req.files };

  const postBody = { ...req.body };

  let { parent } = req.body;

  parent = (parent.length || parent == 'null') ? null : parent;

  let { enabled } = req.body;

  postBody.enabled = enabled == 'true' ? true : false;

  const data = { 
    ...postBody,
    image: files.image ? files.image[0].path : '',
  };

  const category = await Category.create(data);

  res.status(200).json({
    success: true,
    data: category
  });

});

exports.updateCategory = asyncHandler(async (req, res, next) => {

  let category = await Category.findById(req.params.id);

  if(!category) {
    next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404))
  }

  const files = { ...req.files };

  const postBody = { ...req.body };

  let newImage;

  if(files.image) {

    newImage = files.image[0].path;
  }
  else {

    let { image } = req.body;

    if(!image) {

      newImage = '';
    }

    else newImage = image;
  }

  const data = { 
    ...postBody,
    image: newImage
  };

  category = await Category.findOneAndUpdate({ _id: req.params.id }, data, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: category
  });

});

exports.deleteCategory = asyncHandler(async (req, res, next) => {

  let category = await Category.findById(req.params.id);

  if(!category){
    next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404))
  }

  await category.remove();

  res.status(200).json({
    success: true,
    data: category
  });
  
});

exports.imageUpload = (req, res, next) => {

  const filedata = req.file || {};

  res.status(200).json({
    success: true,
    data: filedata
  });
  
}