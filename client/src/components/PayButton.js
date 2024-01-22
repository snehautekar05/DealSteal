// import axios from "axios";
// import { useSelector } from "react-redux";
// import { url } from "../apicalls/axiosInstance";

// const PayButton = ({ cartItems }) => {
//   const user = useSelector((state) => state.auth);

// //   const handleCheckout = () => {
// //     axios
// //       .post(`${url}/stripe/create-checkout-session`, {
// //         cartItems,
// //         userId: user._id,
// //       })
// //       .then((response) => {
// //         if (response.data.url) {
// //           window.location.href = response.data.url;
// //         }
// //       })
// //       .catch((err) => console.log(err.message));
// //   };
// const handleCheckout = () => {
  

//     axios
//       .post(`${url}/stripe/create-checkout-session`, {
//         cartItems,
//         userId: user._id,
//       })
//       .then((response) => {
//         if (response.data.url) {
//           window.location.href = response.data.url;
//         } else {
//           // Handle the case where the response does not contain a URL.
//           // You can display an error message to the user.
//           console.error("Invalid response from the server.");
//         }
//       })
//       .catch((err) => {
//         // Handle the error. You can display an error message to the user.
//         console.error("An error occurred:", err);
//       });
//   };
  

//   return (
//     <>
//       <button onClick={() => handleCheckout()}>Check out</button>
//     </>
//   );
// };

// export default PayButton;

import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../../src/apicalls/axiosInstance";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;
// components/PayButton.js

// import axios from "axios";
// import { useSelector } from "react-redux";
// import { url } from "../../src/apicalls/axiosInstance";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const PayButton = ({ cartItems }) => {
//   const user = useSelector((state) => state.auth);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     setLoading(true);

//     axios
//       .post(`${url}/stripe/create-checkout-session`, {
//         cartItems,
//         userId: user._id,
//       })
//       .then((response) => {
//         if (response.data.url) {
//           window.location.href = response.data.url;
//         }
//       })
//       .catch((error) => {
//         console.error("Checkout error:", error.message);
//         // Handle errors here, e.g., show an error message to the user
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <>
//       <button onClick={handleCheckout} disabled={loading}>
//         {loading ? "Processing..." : "Proceed to Checkout"}
//       </button>
//     </>
//   );
// };

// export default PayButton;

