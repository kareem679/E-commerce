"use server";

import { cookies } from "next/headers";
import { postFetch } from "../utils/fetch";
import { getFetch } from "../utils/fetch";

const AuthActionRegister = async (_, formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const cookieStore = await cookies();

  const response = await postFetch({
    url: "users/register",
    body: { name, email, password },
  });

  console.log(response);

  if (response.user_token) {
      cookieStore.set({
      name: "user_token",
      value: response.user_token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return { success: true, message: response.message, user: response.user };
  } else {
    return { success: false, message: response.message };
  }
};

const AuthActionLogin = async (_, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const cookieStore = await cookies();
  const response = await postFetch({
    url: "users/login",
    body: { email, password },
  });

  if (response.user_token) {
    cookieStore.set({
      name: "user_token",
      value: response.user_token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, message: response.message, user: response.user };
  } else {
    return { success: false, message: response.message };
  }
};

const AuthActionLogout = async () => {
  const cookieStore = await cookies();
  const user_token = cookieStore.get("user_token");

  if (!user_token) {
    return { success: false, message: "User not logged in" };
  }

  const response = await postFetch({
    url: "users/logout",
    headers: {
      Authorization: `Bearer ${user_token.value}`,
    },
  });

  if (response.success) {
    cookieStore.delete("user_token");
    return { success: true, message: response.message };
  } else {
    return { success: false, message: response.message };
  }
};

const AuthActionMe = async () => {
  const cookieStore = await cookies();
  const user_token = cookieStore.get("user_token");

  if (!user_token) {
    return {
      error: "You are not logged in",
    };
  }

  const data = await getFetch({
    url: "users/me",
    headers: {
      Authorization: `Bearer ${user_token.value}`,
    },
  });
  if (data.message === "success") {
    return {
      message: "success",
      user: data.user,
    };
  } else {
    return {
      message: "User Forbidden",
    };
  }
};

export { AuthActionRegister, AuthActionLogin, AuthActionLogout, AuthActionMe };
