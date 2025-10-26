"use client";
import { useTransition } from "react";
import { DeleteProductAction, UpdateProductAction } from "@/app/actions/AdminAction";

const ManageProductButtons = ({ product, onDelete, onUpdate }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await DeleteProductAction({ id: product.id });
      if (res.success) {
        onDelete(product.id);
      } else {
        alert(res.message || "Failed to delete product");
      }
    });
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("title", product.title + " Updated");
    formData.append("description", product.description);
    formData.append("price", product.price);
    startTransition(async () => {
      const res = await UpdateProductAction({ id: product.id, formData });
      if (res.success) {
        onUpdate(product.id, formData);
      } else {
        alert(res.message || "Failed to update product");
      }
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleUpdate}
        className="bg-yellow-500 text-white px-3 py-1 rounded"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default ManageProductButtons;