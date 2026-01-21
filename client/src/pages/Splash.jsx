import { Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Splash = () => {
    const { user, loading } = useAuth();

    if (loading) return <div></div>; // Or a nice loader

    // If user is already logged in, redirect to dashboard
    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="splash-container">
            <div className="splash-content">
                <h1 className="splash-title">Inventory<span className="text-primary">Master</span></h1>
                <p className="splash-subtitle">
                    Streamline your business with our powerful inventory management solution.
                    Track products, manage categories, and grow your sales.
                </p>
                <div className="splash-actions">
                    <Link to="/login" className="btn btn-lg btn-primary shine-effect">
                        Login to Continue <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
            {/* Decorative circles */}
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
        </div>
    );
};

export default Splash;
