import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";
import { useCart } from "../CartContext";
// import { ThreeDots } from "react-loader-spinner";

const VerificationPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const sendData = async () => {
    const url = window.location.href;
    const indexOfVerify = url.indexOf("verify");
    if (indexOfVerify !== -1) {
      const queryParamsString = url.substring(
        indexOfVerify + "verify".length + 1
      );
      const params = new URLSearchParams(queryParamsString);
      const queryParams = {};
      for (const param of params.entries()) {
        queryParams[param[0]] = param[1];
      }
      console.log(queryParams);
      try {
        const response = await axios.post(
          "http://localhost:2300/api/v1/pay/verify-payment",
          queryParams,
          { withCredentials: true }
        );
        if (response.status == 200) {
          clearCart()
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 2500,
          });
          navigate("/");
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: response.data.message,
            showConfirmButton: false,
            timer: 2500,
          });
          navigate("/");
        }
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/");
      }
    }
  };

  useEffect(() => {
    sendData();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", margin: "20% auto 0 auto" }}>
        <p>Please wait, while we confirm your transaction</p>
        <FaSpinner style={{ fontSize: "8rem", marginTop: "3rem" }} />
      </div>
    </>
  );
};

export default VerificationPage;
