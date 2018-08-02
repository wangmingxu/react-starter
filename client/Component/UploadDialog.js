import React from 'react';
import uploading from 'assets/loveletter/uploading.png';

const UploadDialog = (props) => {
  const { status } = props;
  return (
    status ? (<div className="mask">
      <div className="upload-dialog">
        <div >音频上传中..</div>
        <img src={uploading} alt="uploading" className="icon" />
      </div>
    </div>) : null
  );
};

export default UploadDialog;

