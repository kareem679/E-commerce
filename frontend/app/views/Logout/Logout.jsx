const Logout = async (AccessToken ) => {
  try {
    const res = await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${AccessToken}`,
      },
      credentials: "include",
    });

    const data = await res.json()

    if(res.status === 401){
      const RefreshRes = await fetch("http://localhost:5000/api/users/refreshToken",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
        },
        credentials:"include"
      })

      const RefreshData = await RefreshRes.json()

      if(RefreshRes.ok){
        localStorage.setItem("user", JSON.stringify({ accessToken: RefreshData.accessToken }));
        const logout2 = await fetch("http://localhost:5000/api/users/logout",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${RefreshData.accessToken}`,
          },
          credentials: "include",
        })

        const data2 = await logout2.json()

        if(logout2.ok){
          localStorage.removeItem("user")
          return {success:true,msg:"logout successfully"}
        }else{
          return {success:false,msg:"something went wrong"}
        }

      }else{
        return {success:false,msg:"invaild Refresh"}
      }

    }else{
      if(res.ok){
        localStorage.removeItem("user")
        return {success:true,msg:"logout successfully"}
      }else{
        return {success:false,msg:data.msg || "something went wrong"}
      }
    }

  }
  catch(err){
    return {success:false,msg:"server err",details: err.message}
  }
};

export default Logout;
