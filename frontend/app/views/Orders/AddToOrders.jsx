const AddToOrders = async ({ accessToken, shoppingInfo }) => {
  try {
    let res = await fetch("http://localhost:5000/api/orders/AddOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      credentials: "include",
      body: JSON.stringify({shoppingInfo})
    });

    let data = await res.json();

    
    if (res.status === 401) {
      const RefRes = await fetch("http://localhost:5000/api/users/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include"
      });

      const RefData = await RefRes.json();

      if (RefRes.ok && RefData.accessToken) {
        
        const user = JSON.parse(localStorage.getItem("user"));
        user.accessToken = RefData.accessToken;
        localStorage.setItem("user", JSON.stringify(user));

        
        res = await fetch("http://localhost:5000/api/orders/AddOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${RefData.accessToken}`
          },
          credentials: "include",
          body: JSON.stringify({shoppingInfo})
        });

        data = await res.json();
      } else {
        return { success: false, msg: "Refresh token failed" };
      }
    }

    if (res.ok) {
      return { success: true, data };
    } else {
      return { success: false, msg: data.msg || "Request failed" };
    }
  } catch (err) {
    console.error("AddToOrders error:", err);
    return { success: false, msg: "Server error" };
  }
};

export default AddToOrders;