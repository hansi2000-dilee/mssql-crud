import { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';

const Dashboard = () => {
    const [stats, setStats] = useState({ categories: 0, products: 0 });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [catsRes, prodsRes] = await Promise.all([
                api.get('/categories'),
                api.get('/products')
            ]);
            setStats({
                categories: catsRes.data.length,
                products: prodsRes.data.length
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Dashboard</h1>
            <div className="grid grid-cols-2">
                <div className="card">
                    <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Categories</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{stats.categories}</div>
                </div>
                <div className="card">
                    <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Products</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{stats.products}</div>
                </div>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>Welcome Back</h2>
                <p style={{ color: 'var(--text-muted)' }}>Use the sidebar to manage your categories and products.</p>
            </div>
        </Layout>
    );
};

export default Dashboard;
