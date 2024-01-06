createCategoryTree = (categories) => {

  let categoryTree = [];

  for(let category of categories){

    if(category.parent === ''){

      category.children = getCategoryChildren(categories, category._id);

      categoryTree.push(category);

    }

  }

  return categoryTree;

}

const getCategoryChildren = (categories, categoryId) => {

  let children = [];

  for(let category of categories){

    if(category.parent !== '' && category.parent == categoryId){

      children.push(category);

      children[children.length - 1].children = getCategoryChildren(categories, category._id);

    }

  }

  return children;

}

const getCategoryPath = (category, categoryLookup) => {

  let parent = categoryLookup[category._id].parent;

  if(parent !== '') {

    return `${getCategoryPath(categoryLookup[parent], categoryLookup)} > ${category.name}`;
  }

  else return category.name;

}

module.exports = { createCategoryTree, getCategoryPath };