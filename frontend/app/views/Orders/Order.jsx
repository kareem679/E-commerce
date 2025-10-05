

const Order = async ({accessToken}) => {
    try{
        let res = await fetch("http://localhost:5000/api/orders/ShowOrder",{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Authorization":`Bearer ${accessToken}`
            },
            cache:"no-cache",
            credentials:"include"
        })

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

        
                res = await fetch("http://localhost:5000/api/orders/ShowOrder", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${RefData.accessToken}`
                    },
                    cache:"no-cache",
                    credentials: "include",
                    
                });

                data = await res.json();
                }else {
                    return { success: false, message: "Refresh token failed" };
                }
        }

        if (res.ok) {
            return { success: true, data };
        } else {
            return { success: false, msg: data?.msg || "Request failed" };
        }
    }catch(err){
        console.error("Order error:", err);
        return { success: false, msg: "Server error" };
    }
}

export default Order