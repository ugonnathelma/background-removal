import { Link } from "react-router-dom";
import { Image } from "./Image";

export const Folder = ({
  prevImages,
  folder,
}: {
  prevImages: { url: string; id: string | number; folder?: string }[];
  folder: string;
}) => {
  console.log("here yes");
  return (
    <div>
      <Link to="/">Go back to Home</Link>
      <br />
      <br />
      <br />
      <div className="images-list">
        {prevImages.map(({ url, id, folder: f }) => {
          console.log({ url, f, folder });
          return url && folder === f ? (
            <Image
              id={id}
              src={url}
              width={300}
              alt="result from the API"
              className="prev-images"
            />
          ) : null;
        })}
      </div>
    </div>
  );
};
