import { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { Pencil, Trash2, Plus } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', categoryId: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/products/${editingId}`, form);
            } else {
                await api.post('/products', form);
            }
            setForm({ name: '', price: '', categoryId: '', description: '' });
            setEditingId(null);
            setIsFormOpen(false);
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (prod) => {
        setForm({ 
            name: prod.Name, 
            price: prod.Price, 
            categoryId: prod.CategoryId, 
            description: prod.Description 
        });
        setEditingId(prod.Id);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Products</h1>
                <button 
                    className="btn btn-primary flex items-center gap-2"
                    onClick={() => {
                        setForm({ name: '', price: '', categoryId: '', description: '' });
                        setEditingId(null);
                        setIsFormOpen(!isFormOpen);
                    }}
                >
                    <Plus size={18} /> {isFormOpen ? 'Close Form' : 'Add Product'}
                </button>
            </div>

            {isFormOpen && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>{editingId ? 'Edit Product' : 'New Product'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2">
                            <div className="form-group">
                                <label>Name</label>
                                <input 
                                    className="form-input" 
                                    value={form.name} 
                                    onChange={(e) => setForm({...form, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input 
                                    type="number"
                                    step="0.01"
                                    className="form-input" 
                                    value={form.price} 
                                    onChange={(e) => setForm({...form, price: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select 
                                    className="form-input"
                                    value={form.categoryId}
                                    onChange={(e) => setForm({...form, categoryId: e.target.value})}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.Id} value={cat.Id}>{cat.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input 
                                    className="form-input" 
                                    value={form.description} 
                                    onChange={(e) => setForm({...form, description: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" className="btn" style={{ backgroundColor: 'var(--bg-dark)' }} onClick={() => setIsFormOpen(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(prod => (
                                <tr key={prod.Id}>
                                    <td>{prod.Name}</td>
                                    <td>{prod.CategoryName || '-'}</td>
                                    <td>${prod.Price}</td>
                                    <td>{prod.Description}</td>
                                    <td className="flex gap-2">
                                        <button className="btn btn-sm" style={{ backgroundColor: 'var(--primary)', color: 'white' }} onClick={() => handleEdit(prod)}>
                                            <Pencil size={14} />
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(prod.Id)}>
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
