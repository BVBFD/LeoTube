import React from 'react';

type UploadPropsType = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Upload = ({ setOpen }: UploadPropsType) => {
  return (
    <div>
      <span>Upload</span>
    </div>
  );
};

export default Upload;
