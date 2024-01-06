const mongoose = require('mongoose');
const slugify = require('slugify');

const PostSchema = mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Please add title.']
    },
    content: {
      type: String,
      required: [true, 'Please add content.']
    },
    url: String,
    date_created: {
      type: Date,
      default: Date.now
    },
    date_updated: {
      type: Date,
      default: Date.now
    },
    categories: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}]
    },
    comments: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    },
    tags: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
    },
    image: {
      type: String
    },
    thumbnail: {
      type: String
    },
    enabled: {
      type: Boolean,
      default: false
    },
    enable_comments: {
      type: Boolean,
      default: true
    },
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: {
      createdAt: 'date_created',
      updatedAt: 'date_updated'
    }
  }
);

PostSchema.pre('save', function(next){
  if(this.url === null || !this.url.length){
    this.url = slugify(this.title, {lower: true});
  }
  next();
});

PostSchema.pre('findOneAndUpdate', function(next){
  if(this._update.url !== undefined && (this._update.url === null || !this._update.url.length)){
    if(this._update.title){
      this._update.url = slugify(this._update.title, {lower: true});
    }
  }
  next();
});

PostSchema.pre('remove', async function(next){
  await this.model('Comment').deleteMany({ postId: this._id });
  next();
});

module.exports = mongoose.model('Post', PostSchema);