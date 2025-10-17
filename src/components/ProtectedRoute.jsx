import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { userAuth } = useAuth();
  
  if (!userAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
