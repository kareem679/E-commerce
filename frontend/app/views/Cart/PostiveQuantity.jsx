const PostiveQuantity = async ({ product_id }) => {
    try {
        let accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;

        let res = await fetch("http://localhost:5000/api/cart/postive", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ productId:product_id })
        });

        let data = await res.json();

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

                const newToken = user.accessToken;

                res = await fetch("http://localhost:5000/api/cart/postive", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${newToken}`
                    },
                    body: JSON.stringify({ productId:product_id })
                });

                data = await res.json();

                if (res.ok) {
                    return { success: true, msg: "successfully", data };
                } else {
                    return { success: false, msg: data.msg || "Something went wrong" };
                }
            } else {
                return { success: false, msg: "failed Refresh" };
            }
        } else {
            if (!res.ok) {
                return { success: false, msg: data.msg || "Something went wrong" };
            } else {
                return { success: true, msg: "successfully", data };
            }
        }
    } catch (err) {
        return { success: false, msg: "Server error", details: err.message };
    }
};

export default PostiveQuantity;
