exports.getUpdatedAsset = (req, assetKey) => {

  const files = { ...req.files };

  if(files[assetKey]) {

    return files[assetKey][0].path;
  }
  else {

    let requestAsset = req.body[assetKey];

    if(!requestAsset) {

      return '';
    }

    else return requestAsset;
  }
}