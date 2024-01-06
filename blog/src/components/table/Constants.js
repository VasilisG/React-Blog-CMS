export const POST_TABLE_COLUMNS = [
    {
        value: '_id',
        label: '# ID',
        type: 'string'
    },
    {
        value: 'title',
        label: 'Title',
        type: 'string',
        sortable: true
    },
    {
        value: 'date_created',
        label: 'Date Created',
        type: 'date',
        sortable: true
    },
    {
        value: 'categories',
        label: 'Categories',
        type: 'object',
        objectKey: 'name'
    },
    {
        value: 'tags',
        label: 'Tags',
        type: 'object',
        objectKey: 'name'
    },
    {
        value: 'enabled',
        label: 'Enabled',
        type: 'boolean'
    }
];

export const COMMENT_TABLE_COLUMNS = [
    {
        value: '_id',
        label: '# ID',
        type: 'string'
    },
    {
        value: 'postId',
        label: 'Post Title',
        type: 'string',
    },
    {
        value: 'content',
        label: 'Content',
        type: 'string',
    },
    {
        value: 'date_created',
        label: 'Date Created',
        type: 'date',
        sortable: true
    },
    {
        value: 'enabled',
        label: 'Enabled',
        type: 'boolean',
        sortable: true
    }
];

export const TAG_TABLE_COLUMNS = [
    {
        value: '_id',
        label: '# ID',
        type: 'string'
    },
    {
        value: 'name',
        label: 'Name',
        type: 'string',
        sortable: true
    }
];