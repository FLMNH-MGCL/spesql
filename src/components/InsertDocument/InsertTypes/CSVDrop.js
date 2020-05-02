import React, { useCallback } from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";

export default function CSVDrop({ setCSV }) {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    if (acceptedFiles.length > 1 || acceptedFiles.length === 0) {
      alert("ruh roh");
      return;
    }

    // read
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      console.log(binaryStr);
      setCSV(binaryStr);
    };
    reader.readAsText(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Segment placeholder>
          <Header icon>
            <Icon name="pdf file outline" />
            Nice file! Just drop it here!
          </Header>
        </Segment>
      ) : (
        <Segment placeholder>
          <Header icon>
            <Icon name="pdf file outline" />
            Drag and drop a CSV file
          </Header>
        </Segment>
      )}
    </div>
  );
}
