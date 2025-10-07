const AddToOrders = async ({shoppingInfo}) => {
try {
        let accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
        console.log("Sending AddOrder request 1 with token:", accessToken);
        let res = await fetch("http://localhost:5000/api/orders/AddOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            credentials: "include",
            body: JSON.stringify({ shoppingInfo })
        });
        
        let data = await res.json();
        console.log("Response status:", res.status);
        console.log("Response data:", data);
        if (res.status === 401) {
            
            const RefreshRes = await fetch("http://localhost:5000/api/users/refreshToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                credentials: "include"
            });

            const RefreshData = await RefreshRes.json();

            if (RefreshRes.ok) {
                const user = JSON.parse(localStorage.getItem("user"));
                user.accessToken = RefreshData.accessToken;
                localStorage.setItem("user", JSON.stringify(user));
                console.log("Sending AddOrder request 1 with token:", accessToken);
                res = await fetch("http://localhost:5000/api/orders/AddOrder", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${RefreshData.accessToken}`
                    },
                    body: JSON.stringify({ shoppingInfo }),
                    credentials: "include"
                });

                data = await res.json();

                if (res.ok) {
                    return { success: true, msg: "successfully", data };
                } else {
                    return { success: false, msg: data?.errors?.[0]?.msg || "Something went wrong" };
                }
            } else {
                return { success: false, msg: "failed Refresh" };
            }
        } else {
            if (!res.ok) {
                return { success: false, msg: data?.errors?.[0]?.msg || data.msg || "Something went wrong" };
            } else {
                return { success: true, msg: "successfully", data };
            }
        }
    } catch (err) {
        return { success: false, msg: "Server error", details: err.message };
    }
};

export default AddToOrders;