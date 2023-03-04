import React, { ChangeEvent, useState } from "react";
import "./App.css";
import AddButton from "./components/AddButton";

import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { uploadImageToServer } from "./utils";
import { Home } from "./components/Home";
import { UntitledFolder } from "./components/UntitledFolder";
import { Folder } from "./components/Folder";

function App() {
  const [result, setResult] = useState<string | null>(null);
  const [folders, setFolder] = useState<string[]>(
    JSON.parse(localStorage.getItem("folders") || "[]")
  );
  const [prevImages, setPrevImages] = useState<
    { url: string; id: string | number }[]
  >(JSON.parse(localStorage.getItem("prev-images") || "[]"));

  const onAddPreviousImage = (url: string) => {
    const prevImages = JSON.parse(localStorage.getItem("prev-images") || "[]");
    localStorage.setItem(
      "prev-images",
      JSON.stringify([...prevImages, { id: prevImages.length, url }])
    );
    setPrevImages([...prevImages, url]);
  };

  const handleCreateFolder = () => {
    const folderName = "Folder" + (folders.length + 1);
    setFolder([...folders, folderName]);
    localStorage.setItem("folders", JSON.stringify([...folders, folderName]));
  };

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleCreateFolder={handleCreateFolder}
                setPrevImages={onAddPreviousImage}
                setResult={setResult}
                result={result}
                folders={folders}
              />
            }
          ></Route>
          <Route
            path="/untitled-folder"
            element={<UntitledFolder prevImages={prevImages} />}
          />
          {folders.map((folder) => (
            <Route
              path={`/${folder}`}
              element={<Folder prevImages={prevImages} folder={folder} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
