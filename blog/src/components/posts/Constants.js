export const FILTER_INITIAL_STATE = {
  id: '',
  title: '',
  creation_from: '',
  creation_to: '',
  enabled: ''
};

export const POST_INITIAL_STATE = {
  enabled: false,
  title: '',
  content: '',
  url: '',
  image: '',
  thumbnail: '',
  enable_comments: false,
  meta_title: '',
  meta_description: ''
}

export const QUILL_MODULES = {
  toolbar: [
    [{ 'header': [2, 3, false] }],
    ['image'],
    ['bold', 'italic', 'underline', 'strike', { 'align': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['blockquote', 'code-block'],
    [{ 'color': [] }],
    ['clean'],
  ]
};

export const ORDER_ASC = 'asc';
export const ORDER_DESC = 'desc';