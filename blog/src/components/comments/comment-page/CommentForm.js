import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BooleanField from "../../fields/form/BooleanField";
import TextField from "../../fields/form/TextField";
import TextAreaField from "../../fields/form/TextAreaField";
import { COMMENT_INITIAL_STATE } from "../Constants";
import { updateComment, deleteComment } from "../../../store";
import API from "../../../utils/api";
import toast from "react-hot-toast";

const CommentForm = () => {

  const [commentData, setCommentData] = useState(COMMENT_INITIAL_STATE);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { commentId } = useParams();

  const getCommentById = async (commentId) => {
    const response = await API.get(`comments/${commentId}`);
    const responseData = response.data;
    const data = responseData.data;
    setCommentData({
        content: data.content,
        post_title: data.postId.title,
        enabled: data.enabled
      }
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const eventType = event.nativeEvent.submitter.name;
    if(eventType === 'hide' || eventType === 'show') {
      let enabled = eventType === 'hide' ? false : true;
      putComment(enabled)
      .then(() => {
        getCommentById(commentId)
        toast.success('Comment status updated.');
      });
    }
    else {
      removeComment();
      toast.success('Comment removed.');
      navigate('/comments', { replace: true });
    }
  }

  const handleChange = (event) => {
    event.preventDefault();
  }

  const putComment = async (enabled) => {
    await dispatch(
      updateComment({
        ...commentData,
        enabled,
        commentId
      }
    ));
  }

  const removeComment = async () => {
    await dispatch(
      deleteComment({
        commentId
      })
    );
  }

  useEffect(() => {
    if(commentId !== undefined){
      getCommentById(commentId);
    }
  }, [commentId]);

  return (
    <form className="post-comment-form" onSubmit={handleSubmit}>
      <BooleanField 
        name="enabled" 
        label="Enabled" 
        id="enabled"
        disabled="disabled"
        value={commentData.enabled}
        changeCallback={handleChange}
      />
      <TextField 
        name="title"
        label="Post Title"
        id="title"
        disabled="disabled"
        value={commentData.post_title}
        changeCallback={handleChange}
      />
      <TextAreaField 
        name="comment"
        label="Comment"
        id="comment"
        disabled="disabled"
        value={commentData.content}
        changeCallback={handleChange}
      />
      <div className="form-group d-flex justify-content-end my-4">
        <button
          type="submit"
          className="btn comment-action delete-comment mx-2"
          name="delete"
          value="delete"
        >
          Delete
        </button>
        <button
          type="submit"
          className="btn comment-action hide-comment mx-2"
          name={commentData.enabled ? 'hide' : 'show'}
          value={commentData.enabled ? 'hide' : 'show'}
        >
          {commentData.enabled ? 'Hide' : 'Show'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
