import CommonForm from "@/components/common/Form";
import { loginFormConfig } from "@/config/formConfig";
import { loginUser } from "@/features/auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialValue = {
  email: "",
  password: "",
};
function AuthLogin() {
  const [formData, setFormData] = useState(initialValue);
  const dispatch = useDispatch();
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await dispatch(loginUser(formData)).unwrap();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.data.message || "Something went worong");
    }
  };
  return (
    <>
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign In to your account
          </h1>
          <p className="mt-2">
            Don't have an Account
            <Link
              to="/register"
              className="ml-2 font-medium hover:underline text-primary"
            >
              Register
            </Link>
          </p>
        </div>
        <CommonForm
          formData={formData}
          formControls={loginFormConfig}
          setFormData={setFormData}
          buttonText={"Sign In"}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}

export default AuthLogin;
