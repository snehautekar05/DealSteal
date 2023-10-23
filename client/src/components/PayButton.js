import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../apicalls/axiosInstance";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

//   const handleCheckout = () => {
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
//       .catch((err) => console.log(err.message));
//   };
const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        } else {
          // Handle the case where the response does not contain a URL.
          // You can display an error message to the user.
          console.error("Invalid response from the server.");
        }
      })
      .catch((err) => {
        // Handle the error. You can display an error message to the user.
        console.error("An error occurred:", err);
      });
  };
  

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;