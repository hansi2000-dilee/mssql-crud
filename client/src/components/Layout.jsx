import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LayoutDashboard, Layers, Package, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active-link' : '';

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border fixed h-full" style={{ width: '250px', backgroundColor: 'var(--bg-card)', borderRight: '1px solid var(--border)', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
                <div className="p-6">
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>InventoryApp</h1>
                </div>
                <nav className="p-4 grid gap-2">
                    <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/categories" className={`nav-link ${isActive('/categories')}`}>
                        <Layers size={20} /> Categories
                    </Link>
                    <Link to="/products" className={`nav-link ${isActive('/products')}`}>
                        <Package size={20} /> Products
                    </Link>
                </nav>
                <div className="p-4 mt-auto absolute bottom-0 w-full" style={{ boxSizing: 'border-box' }}>
                    <div className="flex items-center gap-2 mb-4 text-sm text-muted">
                        <span>Logged in as <strong>{user?.username}</strong></span>
                    </div>
                    <button onClick={logout} className="btn btn-danger w-full flex items-center justify-center gap-2" style={{ width: '100%' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ marginLeft: '250px', width: 'calc(100% - 250px)', padding: '2rem' }}>
                {children}
            </main>

            <style>{`
                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    color: var(--text-muted);
                    transition: all 0.2s;
                }
                .nav-link:hover, .active-link {
                    background-color: var(--primary);
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default Layout;
