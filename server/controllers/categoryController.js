const { sql } = require('../config/db');

const getCategories = async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Categories ORDER BY CreatedAt DESC');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('Name', sql.NVarChar, name)
            .input('Description', sql.NVarChar, description)
            .query('INSERT INTO Categories (Name, Description) VALUES (@Name, @Description)');
        res.status(201).json({ message: 'Category created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('Id', sql.Int, id)
            .input('Name', sql.NVarChar, name)
            .input('Description', sql.NVarChar, description)
            .query('UPDATE Categories SET Name = @Name, Description = @Description WHERE Id = @Id');
        res.json({ message: 'Category updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('Id', sql.Int, id)
            .query('DELETE FROM Categories WHERE Id = @Id');
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
