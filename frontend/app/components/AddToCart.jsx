const AddToCart = async ({ productId, quantity, currentToken }) => {
  try {
    let res = await fetch("http://localhost:5000/api/cart/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${currentToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ productId, quantity }),
    });

    let data = await res.json();

    if (res.status === 401) {
      
      const refreshRes = await fetch("http://localhost:5000/api/users/refreshToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include",
      });

      const refreshData = await refreshRes.json();

      if (!refreshRes.ok || !refreshData.accessToken) {
        return { success: false, msg: "Session expired. Please login again." };
      }

      
      let user = JSON.parse(localStorage.getItem("user")) || {};
      user.accessToken = refreshData.accessToken;
      localStorage.setItem("user", JSON.stringify(user));

      
      res = await fetch("http://localhost:5000/api/cart/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${refreshData.accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });

      data = await res.json();

      if (!res.ok) {
        return { success: false, msg: data?.errors?.[0]?.msg || data?.msg || "Something went wrong" };
      }

     
      return { success: true, msg: "Created successfully", newToken: refreshData.accessToken };
    }

    if (!res.ok) {
      return { success: false, msg: data?.errors?.[0]?.msg || data?.msg || "Something went wrong" };
    }

    return { success: true, msg: "Created successfully" };

  } catch (err) {
    return {
      success: false,
      msg: "Something went wrong",
      details: err.message,
    };
  }
};

export default AddToCart;