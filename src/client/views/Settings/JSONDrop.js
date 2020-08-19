import React, { useCallback } from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";

export default function JSONDrop({ setJson, createError }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 1 || acceptedFiles.length === 0) {
        alert("Either too many or no files selected");
        return;
      }

      // read
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onabort = () => {
        createError({
          type: "error",
          message: "File reading forcibly aborted",
        });
      };
      reader.onerror = () => {
        createError({ type: "error", message: "File reading errored" });
      };
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        // console.log(binaryStr);
        setJson(binaryStr);
      };
      reader.readAsText(file);
    },
    [setJson, createError]
  );
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
            Drag and drop a JSON file
          </Header>
        </Segment>
      )}
    </div>
  );
}
