import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>You are not authorized to access this page!!!</h1>
      <Button
        onClick={() => {
          navigate("/shopping/home");
        }}
      >
        Take me Home...
      </Button>
    </div>
  );
}

export default Unauthorized;
