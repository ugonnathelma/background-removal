import { Link } from "react-router-dom";
import { Image } from "./Image";

export const UntitledFolder = ({
  prevImages,
}: {
  prevImages: { url: string; id: string | number; folder?: string }[];
}) => {
  return (
    <div>
      <Link to="/">Go back to Home</Link>
      <br />
      <br />
      <br />
      <div className="images-list">
        {prevImages.map(({ url, id, folder }) => {
          return url && !folder ? (
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
