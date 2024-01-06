exports.createCommentTree = (comments) => {

  let commentTree = [];

  for(let comment of comments){

    if(comment.parent === null){

      comment.children = getCommentChildren(comments, comment._id);

      commentTree.push(comment);

    }

  }

  return commentTree;

}

const getCommentChildren = (comments, commentId) => {

  let children = [];

  for(let comment of comments){

    if(comment.parent !== null && comment.parent.equals(commentId)){

      children.push(comment);

      children[children.length - 1].children = getCommentChildren(comments, comment._id);

    }

  }

  return children;

}