/* eslint-disable @next/next/no-img-element */
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import ImagesZoom from "./imagesZoom";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = () => {
    setShowImagesZoom(true);
  };
  console.log("image", images);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  if (images.legnth === 1) {
    return (
      <>
        <img
          role="presentation"
          width="100%"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick
          {...onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
          }}
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick
          {...onZoom}
        />
        <img
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
          }}
          src={`http://localhost:3065/${images[1].src}`}
          alt={images[1].src}
          onClick
          {...onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img
          role="presentation"
          style={{
            width: "50%",
          }}
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick
          {...onZoom}
        />
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

export default PostImages;
