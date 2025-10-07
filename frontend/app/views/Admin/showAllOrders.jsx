const showAllOrders = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    let accessToken = user?.accessToken;

    let res = await fetch("http://localhost:5000/api/orders/GetAllOrder", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      cache: "no-cache",
      credentials: "include"
    });

    let data = await res.json();

    
    if (res.status === 401) {
      const RefRes = await fetch("http://localhost:5000/api/users/refreshToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include"
      });

      const RefData = await RefRes.json();

      if (RefRes.ok && RefData.accessToken) {
        user.accessToken = RefData.accessToken;
        localStorage.setItem("user", JSON.stringify(user));

        res = await fetch("http://localhost:5000/api/orders/GetAllOrder", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${RefData.accessToken}`
          },
          cache: "no-cache",
          credentials: "include"
        });

        data = await res.json();

        if (res.ok) return { success: true, msg: "Orders fetched successfully", data };
        else return { success: false, msg: data?.msg || "Failed after refresh" };
      } else {
        return { success: false, msg: "Refresh token failed" };
      }
    }

    
    if (res.ok) return { success: true, msg: "Orders fetched successfully", data };
    else return { success: false, msg: data?.msg || "Request failed" };
  } catch (err) {
    console.error("showAllOrders error:", err);
    return { success: false, msg: "Server error", details: err.message };
  }
};

export default showAllOrders;