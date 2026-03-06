import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ImageGallary = () => {
  const [imageList, setImageList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchAllImages = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/images");
      const result = await res.json();
      setImageList(result.data);
    } catch (error) {
      toast.error("Failed to fetch images");
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setUploading(true);
      const res = await fetch(
        "http://localhost:8080/api/images/upload-images",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Images uploaded successfully");
      fetchAllImages();
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  //to delete images
  const deleteImage = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/images/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        toast.success("Image deleted");
        setImageList((prev) => prev.filter((img) => img._id !== id));
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  return (
    <div className="container py-5">
      {/* Title */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Your Image Gallery</h1>
        <p className="text-muted">Drag, drop or browse images to upload</p>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border border-2 border-dashed rounded p-5 text-center mb-5 ${
          isDragActive ? "border-primary bg-light" : "border-secondary"
        }`}
        style={{ cursor: "pointer" }}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <p className="text-primary fw-semibold">Uploading...</p>
        ) : isDragActive ? (
          <p className="fw-semibold">Drop images here</p>
        ) : (
          <>
            <p className="fw-semibold mb-2">
              Drag & drop images here
            </p>
            <p className="text-muted mb-3">or</p>
            <button
              type="button"
              className="btn btn-outline-primary"
            >
              Browse Images
            </button>
          </>
        )}
      </div>

      {/* Image Grid */}
      <div className="row g-4">
        {imageList.map((image) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            key={image._id}
          >
            <div className="card h-100 shadow-sm border-0">
              <img
                src={image.imageURL}
                className="card-img-top"
                alt="gallery"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="imageName text-center p-0">
                <p>{image.originalName}</p>
              </div>

              <div className="card-body d-flex flex-column">
                <div className="mt-auto d-flex gap-2">
                  <Link
                    to={`/${image._id}`}
                    className="btn btn-outline-primary btn-sm w-100"
                  >
                    View Details
                  </Link>

                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={() => deleteImage(image._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {imageList.length === 0 && (
          <p className="text-center text-muted">
            No images uploaded yet
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageGallary;