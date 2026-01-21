const { sql } = require('../config/db');

const getProducts = async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query(`
            SELECT p.*, c.Name as CategoryName 
            FROM Products p
            LEFT JOIN Categories c ON p.CategoryId = c.Id
            ORDER BY p.CreatedAt DESC
        `);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, price, categoryId, description } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('Name', sql.NVarChar, name)
            .input('Price', sql.Decimal(10, 2), price)
            .input('CategoryId', sql.Int, categoryId)
            .input('Description', sql.NVarChar, description)
            .query('INSERT INTO Products (Name, Price, CategoryId, Description) VALUES (@Name, @Price, @CategoryId, @Description)');
        res.status(201).json({ message: 'Product created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, categoryId, description } = req.body;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('Id', sql.Int, id)
            .input('Name', sql.NVarChar, name)
            .input('Price', sql.Decimal(10, 2), price)
            .input('CategoryId', sql.Int, categoryId)
            .input('Description', sql.NVarChar, description)
            .query('UPDATE Products SET Name = @Name, Price = @Price, CategoryId = @CategoryId, Description = @Description WHERE Id = @Id');
        res.json({ message: 'Product updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect();
        await pool.request()
            .input('Id', sql.Int, id)
            .query('DELETE FROM Products WHERE Id = @Id');
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
