import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import TextField from "../../fields/form/TextField";
import { TAG_INITIAL_STATE } from "../Constants";
import { createTag } from "../../../store/thunks/tags/createTag";
import { updateTag } from "../../../store/thunks/tags/updateTag";
import { deleteTag } from "../../../store";
import API from "../../../utils/api";

const TagForm = () => {

  const [tagData, setTagData] = useState(TAG_INITIAL_STATE);

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const { tagId } = useParams();

  const isCreate = location.pathname.indexOf('create') !== -1;

  const getTagById = async (tagId) => {
    const response = await API.get(`tags/${tagId}`);
    const responseData = response.data;
    const data = responseData.data;
    setTagData({
        name: data.name,
        url: data.url
      }
    );
  }

  const handleChange = key => (event) => {
    setTagData({
      ...tagData,
      [key]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const eventType = event.nativeEvent.submitter.name;
    if(eventType === 'save') {
      if(isCreate) {
        addTag();
        navigate('/tags', { replace: true });
      }
      else putTag();
    }
    else {
      removeTag();
      navigate('/tags', { replace: true });
    }
  };

  const addTag = async () => {
    await dispatch(
      createTag({
        ...tagData
      }
    ));
  }

  const putTag = async () => {
    await dispatch(
      updateTag({
        tagData,
        tagId
      }
    ));
  }

  const removeTag = async () => {
    await dispatch(
      deleteTag({
        tagId
      })
    );
  }

  useEffect(() => {
    if(tagId !== undefined){
      getTagById(tagId);
    }
  }, [tagId]);

  return (
    <form className="post-tag-form" onSubmit={handleSubmit}>
      <TextField 
        name="name"
        value={tagData.name}
        label="Tag Name"
        id="name"
        required="required"
        changeCallback={handleChange('name')}
      />
      <TextField 
        name="url"
        value={tagData.url}
        label="Tag Url"
        id="url"
        required="required"
        changeCallback={handleChange('url')}
      />
      <div className="form-group d-flex justify-content-end my-4">
        <button
          type="submit"
          className="btn tag-action save-tag mx-2"
          value="save"
          name="save"
        >
          Save
        </button>
        <button
          type="submit"
          className="btn tag-action delete-tag mx-2"
          value="delete"
          name="delete"
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default TagForm;
