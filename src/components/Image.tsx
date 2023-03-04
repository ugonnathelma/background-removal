import { useState } from "react";

export const Image = (props: any) => {
  const [shouldShowMenu, setShouldShowMenu] = useState(false);
  const [folders, setFolders] = useState(
    JSON.parse(localStorage.getItem("folders") || "[]")
  );

  const showMenu = () => {
    setShouldShowMenu(!shouldShowMenu);
  };

  const setFolder = (folder: string | null) => {
    let prevImages = JSON.parse(localStorage.getItem("prev-images") || "[]");

    const filterImages = prevImages.filter(
      ({ id }: { id: string | number }) => id !== props.id
    );

    localStorage.setItem(
      "prev-images",
      JSON.stringify([
        ...filterImages,
        { id: props.id, url: props.src, folder: folder },
      ])
    );
    showMenu();
    setFolders([...folders]);
  };

  return (
    <div>
      <img {...props} onClick={showMenu} />{" "}
      {shouldShowMenu && (
        <div>
          Move to{" "}
          <ul>
            <li>
              <button
                onClick={() => {
                  setFolder(null);
                  setShouldShowMenu(false);
                }}
              >
                Untitled Folder
              </button>
            </li>
            {folders.map((folder: string) => (
              <li>
                <button
                  onClick={() => {
                    setFolder(folder);
                  }}
                >
                  {folder}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
