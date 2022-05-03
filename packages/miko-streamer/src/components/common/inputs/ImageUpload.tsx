// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import React, { forwardRef, useState } from 'react';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ImageUpload = forwardRef<FilePond>(({}, ref) => {
  const [files, setFiles] = useState<any[]>([]);
  return (
    <FilePond
      ref={ref}
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={false}
      maxFiles={1}
      //   server="/api"
      name="files"
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  );
});

export default ImageUpload;
