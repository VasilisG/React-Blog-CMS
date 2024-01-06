const express = require('express');
const { 
    getProfile, 
    createProfile, 
    updateProfile, 
    deleteProfile
} = require('../../controllers/profile');
const { authenticate } = require('../../middleware/auth');
const { profileAssetUpload } = require('../../config/storage');

const router = express();

router.route('/')
    .get(authenticate, getProfile)
    .post(authenticate, createProfile)
    .put(authenticate, profileAssetUpload, updateProfile);

router.route('/:id')
    .delete(authenticate, deleteProfile);

module.exports = router;