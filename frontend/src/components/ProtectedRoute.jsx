// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
    const { userStats } = useAppContext();

    if (!userStats || !userStats.username) {
        alert("Please login First");
        return <Navigate to="/login" replace />;
    }

  return children;
};

export default ProtectedRoute;
