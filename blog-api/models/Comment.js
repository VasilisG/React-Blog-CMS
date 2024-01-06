let mongoose = require('mongoose');

let CommentSchema = mongoose.Schema({
    content: {
      type: String,
      required: [true, 'Please add content.']
    },
    date_created: {
      type: Date,
      default: Date.now,
    },
    date_updated: {
      type: Date,
      default: Date.now
    },
    enabled: {
      type: Boolean,
      default: true
    },
    seen: {
      type: Boolean,
      default: false
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      default: null
    }
  },
  {
    timestamps: {
      createdAt: 'date_created',
      updatedAt: 'date_updated'
    }
  }
);

CommentSchema.post('save', async function(doc, next){
  const post = await this.model('Post').findById(this.postId);
  if(post){
    post.comments.push(this._id);
    await post.save();
  }
  next();
});

CommentSchema.post('remove', async function(doc, next){
  await this.model('Post').findOneAndUpdate(
    {_id: this.postId},
    {$pull: {comments: this._id.toString()}}
  );
  next();
});

module.exports = mongoose.model('Comment', CommentSchema);