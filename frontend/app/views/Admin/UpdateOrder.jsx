const UpdateOrder = async ({ Order_Id,status }) => {
  const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
  let res = await fetch(
    `http://localhost:5000/api/orders/ChangeStatus/${Order_Id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body:JSON.stringify({status})
    }
  );
  let data = await res.json();

  if (res.status === 401) {
    const RefRes = await fetch("http://localhost:5000/api/users/refreshToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    const RefData = await RefRes.json();

    if (RefData.ok) {
      const user = JSON.parse(localStorage.getItem("user"));
      user.accessToken = RefData.accessToken;
      localStorage.setItem("user", JSON.stringify(user));
      res = await fetch(
        `http://localhost:5000/api/orders/ChangeStatus/${Order_Id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${RefData.accessToken}`,
          },
          body:JSON.stringify({status})
        }
      );

      data = await res.json();

      if (!res.ok) {
        return { success: false, msg: "error in second" };
      }
    } else {
      return { success: false, msg: "Refresh Invalid" };
    }
  }
  if (res.ok) {
    return { success: false, msg: data?.errors?.[0]?.msg || data?.msg || "Something went wrong" };
  } else {
    return { success: false, msg: data?.errors?.[0]?.msg || data?.msg || "Something went wrong" };

  }
};

export default UpdateOrder;
