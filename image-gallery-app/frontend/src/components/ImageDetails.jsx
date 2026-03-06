import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ImageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single image
  const fetchImage = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/images/${id}`);
      const result = await res.json();

      if (!res.ok || !result.data) {
        throw new Error("Image not found");
      }

      setImage(result.data);
    } catch (error) {
      toast.error("Failed to load image");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  // Delete image
  const deleteImage = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/images/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      toast.success("Image deleted successfully");
      navigate("/");
    } catch {
      toast.error("Failed to delete image");
    }
  };

  useEffect(() => {
    fetchImage();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p className="fw-semibold">Loading image...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Back Button */}
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row g-4 align-items-start">
        {/* Image Preview */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm border-0">
            <img
              src={image.imageURL}
              alt={image.originalName}
              className="img-fluid rounded"
              style={{ maxHeight: "450px", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Image Details */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold mb-3">Image Details</h4>

            <p>
              <strong>Name:</strong> {image.originalName}
            </p>
            <p>
              <strong>Type:</strong> {image.mimeType}
            </p>
            <p>
              <strong>Size:</strong>{" "}
              {(image.size / 1024).toFixed(2)} KB
            </p>
            <p>
              <strong>Uploaded:</strong>{" "}
              {new Date(image.createdAt).toLocaleString()}
            </p>

            <div className="d-flex gap-3 mt-4">
              <button
                className="btn btn-danger w-100"
                onClick={deleteImage}
              >
                Delete Image
              </button>

              <button
                className="btn btn-outline-primary w-100"
                onClick={() => navigate("/")}
              >
                Go to Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;