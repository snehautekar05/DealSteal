import axios from 'axios';
export const url = "https://stealdeal-backend.onrender.com/api";


export const axiosInstance=axios.create({
    headers:{
       authorization:`Bearer ${localStorage.getItem('token')}`
    }
})
export default axiosInstance;

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

