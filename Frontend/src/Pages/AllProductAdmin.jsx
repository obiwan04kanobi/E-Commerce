import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllProduct } from "../Redux/Products/ProductReducer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import axios from "axios";


const AllProductAdmin = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    Id: "",
    Name: "",
    Price: "",
    Stock: "",
    Category: "",
    Description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const products = useSelector((state) => state.product.products || []);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get_products/");
      dispatch(FetchAllProduct(response.data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
      setLoading(false);
      toast.error("Error fetching products");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete_product/${productId}/`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Error deleting product: " + error.message);
      console.error("Error deleting product:", error);
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setUpdateFormData({
      Id: product._id,
      Name: product.name,
      Price: product.price,
      Stock: product.stock,
      Category: product.category,
      Description: product.description,
    });
    setShowForm(true);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setUpdateFormData({
      Id: "",
      Name: "",
      Price: "",
      Stock: "",
      Category: "",
      Description: "",
    });
    setShowForm(false);
  };

  const handleUpdateChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    const { Id, Name, Price, Stock, Description, Category } = updateFormData;
    try {
      await axios.put(`http://localhost:8000/api/update_product/${Id}/`, {
        name: Name,
        price: Price,
        stock: Stock,
        category: Category,
        description: Description,
      });
      toast.success("Product updated successfully");
      cancelEditing();
      fetchProducts();
    } catch (error) {
      toast.error("Error updating product: " + error.message);
      console.error("Error updating product:", error);
    }
  };

  const categories = ["all", "Ethnic", "Kurti", "Umbrella", "Nayra", "Pant", "Dupatta"];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="max-w-screen-lg mx-auto mt-4">
        <h2 className="text-center text-2xl font-bold mb-4">Product Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="p-3 border">{product._id}</td>
                  <td className="p-3 border">{product.name}</td>
                  <td className="p-3 border">{product.price}</td>
                  <td className="p-3 border">{product.stock}</td>
                  <td className="p-3 border">{product.category}</td>
                  <td className="p-3 border">{product.description}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => startEditing(product)}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showForm && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Edit Product</h3>
            <form onSubmit={submitUpdate} className="space-y-4">
              <input
                type="text"
                name="Name"
                value={updateFormData.Name}
                onChange={handleUpdateChange}
                placeholder="Name"
                className="border p-2 w-full"
                required
              />
              <input
                type="number"
                name="Price"
                value={updateFormData.Price}
                onChange={handleUpdateChange}
                placeholder="Price"
                className="border p-2 w-full"
                required
              />
              <input
                type="number"
                name="Stock"
                value={updateFormData.Stock}
                onChange={handleUpdateChange}
                placeholder="Stock"
                className="border p-2 w-full"
                required
              />
              <select
                name="Category"
                value={updateFormData.Category}
                onChange={handleUpdateChange}
                className="border p-2 w-full"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <textarea
                name="Description"
                value={updateFormData.Description}
                onChange={handleUpdateChange}
                placeholder="Description"
                className="border p-2 w-full"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Update Product
              </button>
              <button
                onClick={cancelEditing}
                className="px-4 py-2 bg-gray-500 text-white rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProductAdmin;
