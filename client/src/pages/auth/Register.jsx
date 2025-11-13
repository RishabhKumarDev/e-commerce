import CommonForm from "@/components/common/Form";
import { registerFormConfig } from "@/config/formConfig";
import { registerUser } from "@/features/auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { data, Link, useNavigate } from "react-router-dom";

const initialValue = {
  userName: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const [formData, setFormData] = useState(initialValue);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await dispatch(registerUser(formData)).unwrap();
      console.log(data);
      if (data?.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create New Account
          </h1>
          <p className="mt-2">
            Already have an account?
            <Link
              to="/login"
              className="ml-2 font-medium hover:underline text-primary"
            >
              Log In
            </Link>
          </p>
        </div>
        <CommonForm
          formData={formData}
          formControls={registerFormConfig}
          setFormData={setFormData}
          buttonText={"Sign up"}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}

export default AuthRegister;
