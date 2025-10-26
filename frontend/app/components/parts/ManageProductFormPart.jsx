"use client";
import { useState, useTransition } from "react";
import { AddProductAction } from "@/app/actions/AdminAction";

const ManageProductFormPart = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    startTransition(async () => {
      const res = await AddProductAction({ formData });
      if (res.success) {
        onAdd(res.product); // تحديث قائمة المنتجات في parent
        setTitle("");
        setDescription("");
        setPrice("");
        setImage(null);
      } else {
        alert(res.message || "Failed to add product");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-1 rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-1 rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-1 rounded"
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-1 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default ManageProductFormPart;