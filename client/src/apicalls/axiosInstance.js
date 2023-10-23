import axios from 'axios';
export const url = "http://localhost:5000/api";

// export const setHeaders = () => {
//   const headers = {
//     headers: {
//       "x-auth-token": localStorage.getItem("token"),
//     },
//   };

//   return headers;
// };
export const axiosInstance=axios.create({
    headers:{
       authorization:`Bearer ${localStorage.getItem('token')}`
    }
})
// import axios from 'axios';

// export const url = 'http://localhost:5000/api';

// // Create an Axios instance without the authorization header
// const axiosInstance = axios.create({ baseURL: url });

// // Create a function to set the authorization header
// export const setAuthorizationHeader = (token) => {
//   axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };

// // Use this function to set the authorization header when you have the token
// // For example, you can call this function after a user logs in
// // setAuthorizationHeader(localStorage.getItem('token'));

// export default axiosInstance;
