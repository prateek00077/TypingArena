// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAppContext();

  if (loading) return <div>Loading...</div>;

  // if (!user || !user.username) {
  //     alert("Please login First");
  //     return <Navigate to="/login" replace />;
  // }

  if (!user) {
    return <Login />;
  }

  return children;
};

export default ProtectedRoute;
