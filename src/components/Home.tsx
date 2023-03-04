import React, { ChangeEvent, useState } from "react";

import { Link } from "react-router-dom";
import { uploadImageToServer } from "../utils";
import AddButton from "./AddButton";

export const Home = ({
  setPrevImages,
  result,
  setResult,
  folders,
  handleCreateFolder,
}: {
  result: string | null;
  setResult: (url: string) => void;
  setPrevImages: (url: string) => void;
  folders: string[];
  handleCreateFolder: () => void;
}) => {
  let onImageAdd = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { image, upload } = await uploadImageToServer(e.target.files[0]);
      setPrevImages(upload);
      setResult(image);
    } else {
      console.error("No file was picked");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <br />
          <button onClick={handleCreateFolder}>Create Folder</button>
          <br />
          <br />
          <br />
          <div className="folders">
            {" "}
            <Link to={`/untitled-folder`}>Untitled Folder</Link>
            {folders.map((folder) => {
              return <Link to={`/${folder}`}>{folder}</Link>;
            })}
          </div>
          <br />
          {result && <img src={result} width={300} alt="result from the API" />}
          {<AddButton onImageAdd={onImageAdd} />}
        </div>
      </header>
    </div>
  );
};
