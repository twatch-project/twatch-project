// import { Button } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import React, { ChangeEvent, useRef, useState } from 'react';
// import Nav from '../components/Nav';

// const MultipleFileInput: React.FC = () => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

//   const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...Array.from(files)]);
//     }
//   };

//   const handleAddFile = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       for (const file of selectedFiles) {
//         console.log('Selected file:', file.name);
//         const formData = new FormData();
//         formData.append('file', file);

//         const response = await fetch('your_upload_endpoint', {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           console.log(`File "${file.name}" uploaded successfully.`);
//         } else {
//           console.log(`File "${file.name}" upload failed.`);
//         }
//       }

//       setSelectedFiles([]);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div>
//       <Nav />
//       <h1>Multiple File Input Example</h1>
//       <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelect} multiple />
//       <button type="button" onClick={handleAddFile}>
//         Add File
//       </button>
//       <Button variant="contained" endIcon={<SendIcon />} onClick={handleUpload} disabled={selectedFiles.length === 0}>
//         Submit
//       </Button>
//       <ul>
//         {selectedFiles.map((file, index) => (
//           <li key={index}>{file.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MultipleFileInput;

import React, { ChangeEvent, useState } from 'react';

const MultipleFileInput: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Here you can handle the file upload logic.
      // For example, you can use Axios or Fetch API to send the file to the server.
      // Replace the URL with the endpoint where you want to upload the file.
      const uploadUrl = 'https://example.com/upload';
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          // Handle the response from the server if needed.
          console.log('File uploaded successfully:', response);
        })
        .catch((error) => {
          // Handle errors during the file upload.
          console.error('Error uploading file:', error);
        });
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default MultipleFileInput;
