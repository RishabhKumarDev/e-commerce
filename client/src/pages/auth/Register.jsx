import CommonForm from "@/components/common/Form";
import { registerFormConfig } from "@/config/formConfig";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialValue = {
  userName: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const [formData, setFormData] = useState(initialValue);
  const onSubmit = (formData) => {};
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
