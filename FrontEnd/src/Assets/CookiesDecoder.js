import jwt from "jsonwebtoken"
export const getDataFromToken=()=>{
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
        console.log("Decoded User Information:", decodedData);
      } catch (err) {
        console.error("Error decoding token:", err.message);
        // Handle invalid or expired token on the client-side (e.g., redirect to login)
      }
    }
    else {
        console.log("token is not availble")
    }
}
