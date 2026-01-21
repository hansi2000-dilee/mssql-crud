import { useState, useEffect } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { Pencil, Trash2, Plus } from 'lucide-react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

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
                await api.put(`/categories/${editingId}`, form);
            } else {
                await api.post('/categories', form);
            }
            setForm({ name: '', description: '' });
            setEditingId(null);
            setIsFormOpen(false);
            fetchCategories();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (cat) => {
        setForm({ name: cat.Name, description: cat.Description });
        setEditingId(cat.Id);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.delete(`/categories/${id}`);
            fetchCategories();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Categories</h1>
                <button 
                    className="btn btn-primary flex items-center gap-2"
                    onClick={() => {
                        setForm({ name: '', description: '' });
                        setEditingId(null);
                        setIsFormOpen(!isFormOpen);
                    }}
                >
                    <Plus size={18} /> {isFormOpen ? 'Close Form' : 'Add Category'}
                </button>
            </div>

            {isFormOpen && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>{editingId ? 'Edit Category' : 'New Category'}</h2>
                    <form onSubmit={handleSubmit}>
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
                            <label>Description</label>
                            <input 
                                className="form-input" 
                                value={form.description} 
                                onChange={(e) => setForm({...form, description: e.target.value})}
                            />
                        </div>
                        <div className="flex gap-2">
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
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <tr key={cat.Id}>
                                    <td>#{cat.Id}</td>
                                    <td>{cat.Name}</td>
                                    <td>{cat.Description}</td>
                                    <td className="flex gap-2">
                                        <button className="btn btn-sm" style={{ backgroundColor: 'var(--primary)', color: 'white' }} onClick={() => handleEdit(cat)}>
                                            <Pencil size={14} />
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.Id)}>
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

export default Categories;
