"use server";
import { cookies } from "next/headers";
import { getFetch, postFetch } from "../utils/fetch";
import { putFetch } from "../utils/fetch";
import { deleteFetch } from "../utils/fetch";

import { FormDataPostFetch } from "../utils/FormDataFetch";
import { FormDataPutFetch } from "../utils/FormDataFetch";

//Order Panel
const AllOrderAction = async () => {
  const cookieStore = await cookies();
  const user_token = cookieStore.get("user_token");

  if (!user_token) {
    const error = "token problem";
    console.log(error);
    return { error };
  }

  /* Get */
  const data = await getFetch({
    url: "orders/allOrders",
    headers: {
      Authorization: `Bearer ${user_token.value}`,
    },
  });

  if (data.status === "success") {
    return {
      success: true,
      message: "Fetched successfully",
      orders: data.orders,
    };
  } else {
    return { success: false, message: data.message };
  }
};

const DeleteOrderAction = async ({ id }) => {
  const cookieStore = await cookies();
  const user_token = cookieStore.get("user_token");

  if (!user_token) {
    const error = "token problem";
    console.log(error);
    return { error };
  }

  /* Delete */
  const data = await deleteFetch({
    url: `orders/destroy/${id}`,
    headers: {
      Authorization: `Bearer ${user_token.value}`,
    },
  });

  if (data.status === "success") {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

const UpdateOrderAction = async ({ id, status }) => {
  const cookieStore = await cookies();
  const user_token = cookieStore.get("user_token");

  if (!user_token) {
    const error = "token problem";
    console.log(error);
    return { error };
  }

  /* Put */
  const data = await putFetch({
    url: `orders/update/${id}`,
    body: { status },
    headers: {
      Authorization: `Bearer ${user_token.value}`,
    },
  });

  if (data.status === "success") {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

// Product Panel
const AddProductAction = async ({ _, formData }) => {
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const image = formData.get("image");

  const cookieStore = await cookies();
  const user_token = cookieStore.get("user_token");

  if (!user_token) {
    return { error: "token problem" };
  }

  const form = new FormData();
  form.append("title", title);
  form.append("description", description);
  form.append("price", price);
  if (image && image.size > 0) {
    form.append("image", image);
  }

  const data = await FormDataPostFetch({
    url: "product/store",
    headers: { Authorization: `Bearer ${user_token.value}` },
    body: form,
  });

  if (data.status === "success") {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message, details: data.details };
  }
};

const UpdateProductAction = async ({ _, formData, id }) => {
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  const image = formData.get("image");

  const cookieStore = await cookies();
  const user_token = cookieStore.get("user_token");

  if (!user_token) {
    return { error: "token problem" };
  }

  const form = new FormData();
  form.append("title", title);
  form.append("description", description);
  form.append("price", price);
  if (image && image.size > 0) {
    form.append("image", image);
  }

  const data = await FormDataPutFetch({
    url: `product/update/${id}`,
    headers: { Authorization: `Bearer ${user_token.value}` },
    body: form,
  });

  if (data.status === "success") {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message, details: data.details };
  }
};

const DeleteProductAction = async ({ id }) => {
  const cookieStore = await cookies();
  const user_token = cookieStore.get("user_token");

  if (!user_token) {
    const error = "token problem";
    console.log(error);
    return { error };
  }

  const data = await deleteFetch({
    url: `product/destroy/${id}`,
    headers: {
      Authorization: `Bearer ${user_token.value}`,
    },
  });
  if (data.status === "success") {
    return { success: true, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
};

export {AllOrderAction,DeleteOrderAction,UpdateOrderAction,
  AddProductAction,UpdateProductAction,DeleteProductAction};
