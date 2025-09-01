import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultSuppliers.css";
import SupplierFilterSort from "./SupplierFilterSort";
import Header from "./Header";
import Footer from "./Footer";

export default function ResultsSuppliers() {
  const location = useLocation();
  const navigate = useNavigate();
  const { card } = location.state || {}; // card info passed from Home

  const [products, setProducts] = useState([]);   // store fetched list
  const [loading, setLoading] = useState(true);   // loading state
  const [error, setError] = useState(null);       // error state

  // ✅ reusable fetch function
  const fetchProducts = async (options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams(options);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/service/getAllproduct?${params.toString()}`
      );

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ initial fetch when card changes
  useEffect(() => {
    if (!card) return;

    fetchProducts({ category: card.title }); // auto filter by card category
  }, [card]);

  if (!card) return <div>No card selected.</div>;

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  return (
    <div>
      <Header/>
      <div className="supplier-list">
        <button className="btn-back" onClick={() => navigate('/')}>← Back</button>
        <h2 style={{padding:'0px', marginBottom:'0px'}}>{card.title}</h2>

        {/* 🔹 filter + sort UI */}
        <SupplierFilterSort onApply={fetchProducts} />

        <div className="card-box">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          {!loading && !error && (
            <ul>
              <br />
              <h3 className="list-heading">Here is the list:-</h3> <br />
              {products.map((product) => (
                <li key={product._id} className="supplier-card">
  <div className="price-rating">
    <span className="price">💰 {product.price}</span>
    <span className="rating">⭐ {product.rating}</span>
  </div>

  <strong>{product.name}</strong> ({product.category})
  <div className="details">
    Brand: {product.brand} <br />
    {product.isOrganic 
      ? <span className="organic">🌿 Organic</span> 
      : <span className="non-organic">⚠️ Non-Organic</span>} <br />
    Weight: {product.weight} {product.weightUnit} <br />
    Discount: {product.discount}% <br />
    Stock: {product.stockAvailable ? "Available" : "Out of Stock"} <br />
    Supplier: 🏢 {product.serviceProvider?.name} <br />
    Location: 📍 {product.serviceProvider?.location?.coordinates.join(", ")}
  </div>
</li>

              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
