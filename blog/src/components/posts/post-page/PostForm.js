import { React, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import BooleanField from "../../fields/form/BooleanField";
import DropdownField from "../../fields/form/DropdownField";
import TextField from "../../fields/form/TextField";
import ImageField from "../../fields/form/ImageField";
import TextAreaField from "../../fields/form/TextAreaField";
import EditorField from "../../fields/form/EditorField";
import { POST_INITIAL_STATE, QUILL_MODULES } from "../Constants";
import { createPost, deletePost } from "../../../store";
import { BASE_DIR } from "../../../config/env";
import { switchSlashes } from "../../../utils/switchSlashes";
import { updatePost } from "../../../store/thunks/posts";
import API from "../../../utils/api";

const PostForm = () => {

  const [postData, setPostData] = useState(POST_INITIAL_STATE);

  const [editorData, setEditorData] = useState(POST_INITIAL_STATE.content);

  const [categoryOptions, setCategoryOptions] = useState([]);

  const [tagOptions, setTagOptions] = useState([]);

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const { postId } = useParams();

  const isCreate = location.pathname.indexOf('create') !== -1;

  const getImageValue = (imageKey) => {
    if(isCreate){
      return postData[imageKey];
    }
    else return postData[imageKey] && typeof postData[imageKey] != 'object' 
                ? switchSlashes(BASE_DIR + postData[imageKey]) 
                : '';
  }

  const handleChange = (key) => event => {

    switch(key){
      case 'content':
        setEditorData(event);
        break;
      
      case 'image':
      case 'thumbnail':
        setPostData({
          ...postData,
          [key]: event.target.files ? event.target.files[0] : null
        });
        break;

      case 'categories':
      case 'tags':
        setPostData({ 
          ...postData, 
          [key]: [...event.target.selectedOptions].map(option => option.value) 
        });
        break;
      
      case 'enabled':
      case 'enable_comments':
        setPostData({ 
          ...postData, 
          [key]: event.target.checked
        });
        break;

      default:
        setPostData({ 
          ...postData, 
          [key]: event.target.value 
        });
        break;
    }

  }

  const addPost = async () => {
    await dispatch(
      createPost({
        ...postData,
        content: editorData
      }
    ));
  }

  const putPost = async () => {
    await dispatch(
      updatePost({
        postId,
        postData
      })
    );
  }

  const removePost = async () => {
    await dispatch(
      deletePost({postId})
    );
  }

  const getPostById = async (postId) => {
    const response = await API.get(`posts/${postId}`);
    const responseData = response.data;
    const data = responseData.data;
    setPostData(
      {
        enabled: data.enabled,
        title: data.title,
        content: data.content,
        url: data.url,
        categories: data.categories,
        tags: data.tags,
        image: data.image,
        thumbnail: data.thumbnail,
        enable_comments: data.enable_comments,
        meta_title: data.meta_title,
        meta_description: data.meta_description
      }
    );
    setEditorData(data.content);
  }

  const handleSubmit = (isCreate) => event => {
    event.preventDefault();
    if(isCreate) addPost();
    else putPost();
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    removePost();
    navigate('/posts', { replace: true });
  }

  const handleCancelClick = (event) => {
    event.preventDefault();
    navigate('/posts', { replace: true });
  }

  const getDropdownOptions = useCallback(async (entity, entityCallback) => {
    const response = await API.get(`${entity}/options`);
    const result = response.data;
    entityCallback(result.data);
  }, []);

  useEffect(() => {
    getDropdownOptions('categories', setCategoryOptions);
    getDropdownOptions('tags', setTagOptions);
  }, [getDropdownOptions]);

  useEffect(() => {
    if(postId !== undefined){
      getPostById(postId);
    }
  }, [postId]);

  return (
    <form 
      className="post-category-form" 
      encType="multipart/form-data" 
      onSubmit={handleSubmit(isCreate)}
    >
      <BooleanField 
        name="enabled"
        value={postData.enabled} 
        label="Enabled" 
        id="enabled"
        changeCallback={handleChange('enabled')}
      />
      <TextField 
        name="title" 
        value={postData.title}
        label="Title" 
        id="title" 
        smallText="Post title." 
        required="required"
        changeCallback={handleChange('title')}
      />
      <EditorField
        value={editorData}
        label="Content"
        placeholder={"Write your post's content..."}
        modules={QUILL_MODULES}
        smallText="Post content."
        changeCallback={handleChange('content')}
      />
      <TextField 
        name="url"
        value={postData.url} 
        label="URL key" 
        id="url" 
        smallText="Post URL."
        changeCallback={handleChange('url')}
      />
      <DropdownField 
        name="categories"
        valueKey="_id"
        labelKey="path"
        value={postData.categories} 
        label="Categories" 
        id="categories" 
        options={categoryOptions} 
        multiple="multiple"
        smallText="Post categories."
        changeCallback={handleChange('categories')}
      />
      <DropdownField 
        name="tags"
        valueKey="_id"
        labelKey="name" 
        value={postData.tags}
        label="Tags" 
        id="tags" 
        options={tagOptions} 
        multiple="multiple"
        smallText="Post tags."
        changeCallback={handleChange('tags')}
      />
      <ImageField 
        name="image" 
        imageValue={getImageValue('image')}
        label="Image" 
        id="image" 
        smallText="Post image."
        changeCallback={handleChange('image')}
      />  
      <ImageField 
        name="thumbnail" 
        imageValue={getImageValue('thumbnail')}
        label="Thumbnail" 
        id="thumbnail" 
        smallText="Post thumbnail."
        changeCallback={handleChange('thumbnail')}
      />
      <BooleanField 
        name="enable_comments" 
        value={postData.enable_comments}
        label="Enable Comments" 
        id="enable_comments"
        changeCallback={handleChange('enable_comments')}
      />
      <TextField 
        name="meta_title" 
        value={postData.meta_title}
        label="Meta title" 
        id="meta_title" 
        smallText="Post meta title."
        changeCallback={handleChange('meta_title')}
      />
      <TextAreaField 
        name="meta_description"
        value={postData.meta_description}
        label="Meta description"
        id="meta_description"
        smallText="Post meta description."
        changeCallback={handleChange('meta_description')}
      />
      <div className="form-group d-flex justify-content-end my-4">
        <button
          type="submit"
          className="btn post-action update-post mx-2"
          value="save"
        >
          Save
        </button>
        <button
          type="button"
          className="btn post-action delete-post mx-2"
          value={isCreate ? 'delete' : 'cancel'}
          onClick={isCreate ? handleCancelClick : handleDeleteClick}
        >
          {isCreate ? 'Cancel' : 'Delete'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;