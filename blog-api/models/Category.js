const mongoose = require('mongoose');
const slugify = require('slugify');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add category name.']
  },
  description: {
    type: String,
  },
  url: String,
  image: {
    type: String,
    default: ''
  },
  enabled: {
    type: Boolean,
    default: false
  },
  parent: {
    type: String,
    default: ''
  }
});

CategorySchema.pre('save', function(next){
  if(this.url === null || !this.url.length){
    this.url = slugify(this.name, {lower: true});
  }
  next();
});

CategorySchema.pre('findOneAndUpdate', async function(next){
  if(this._update.url !== undefined && (this._update.url === null || !this._update.url.length)){
    if(this._update.name){
      this._update.url = slugify(this._update.name, {lower: true});
    }
  }
  next();
});

CategorySchema.pre('remove', async function(next){
  const children = await Category.find({parent: this._id});
  if(children){
    for(let child of children){
      child.remove();
    }
  }
  next();
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;