// File: src/pages/ResultsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultsPage.css";
import ToolFilterSort from "./ToolFilterSort";
import Header from "./Header";
import Footer from "./Footer";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { card } = location.state || {}; // card info passed from Home

  const [results, setResults] = useState([]);   // store fetched list
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state

  // ✅ reusable fetch function
  const fetchTools = async (options = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams(options);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/service/get-all-tools?${params.toString()}`
      );

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setResults(Array.isArray(data.tools) ? data.tools : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ initial fetch when card changes
  useEffect(() => {
    if (!card) return;

    // by default, fetch all tools (or only category-related if you want)
    fetchTools({ category: card.title }); // auto filter by card category
  }, [card]);

  if (!card) return <div>No card selected.</div>;

  useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);
  

  return (
    <div>
      <Header/>
      <div className="tool-list">
        <button className="btn-back" onClick={() => navigate('/')}>← Back</button>
        <h2 style={{padding:'0px', marginBottom:'0px'}}>{card.title}</h2>

        {/* 🔹 filter + sort UI */}
        <ToolFilterSort onApply={fetchTools} />

        <div className="card-box">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          {!loading && !error && (
            <ul>
              <br />
              <h3 className="list-heading">Here is the list:-</h3> <br />
              {results.map((tool) => (
                <li key={tool._id} className="tool-card">
                  <div className="price-badge">💰 {tool.rentPrice} {tool.rentUnit}</div>

                  <strong>{tool.name}</strong> ({tool.category})
                  <div className="tool-details">
                    {tool.description} <br /><br />
                    <span className="provider">🏢 {tool.serviceProvider?.name}</span> <br />
                    <span className="contact">📞 Phone: {tool.serviceProvider?.contact}</span>
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

// // File: src/pages/ResultsPage.jsx
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./ResultsPage.css"
// import ToolFilterSort from "./ToolFilterSort";

// export default function ResultsPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { card } = location.state || {}; // card info passed from Home

//   const [results, setResults] = useState([]);   // store fetched list
//   const [loading, setLoading] = useState(true); // loading state
//   const [error, setError] = useState(null);     // error state

//   useEffect(() => {
//     if (!card) return;

//     // const fetchData = async () => {
//     //   try {
//     //     // Full API endpoint
//     //     const res = await fetch("http://localhost:5000/service/get-all-tools");

//     //     if (!res.ok) throw new Error("Failed to fetch data");

//     //     const data = await res.json();

//     //     //  Extract tools array
//     //     setResults(Array.isArray(data.tools) ? data.tools : []);
//     //   } catch (err) {
//     //     setError(err.message);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };



//     const ToolPage = () => {
//       // const [results, setResults] = useState([]);

//       const fetchTools = async (options) => {
//         const params = new URLSearchParams(options);
//         const res = await fetch(`http://localhost:5000/service/get-all-tools?${params.toString()}`);
//         const data = await res.json();
//         setResults(data.tools);
//       };

//       return (
//         <div>
//           <ToolFilterSort onApply={fetchTools} />
//           <div>
//             {results.map((tool) => (
//               <div key={tool._id}>{tool.name}</div>
//             ))}
//           </div>
//         </div>
//       );
//     };

//     // export default ToolPage;

//     ToolPage();
//   }, [card]);

//   if (!card) return <div>No card selected.</div>;

//   return (
//     <div className="tool-list">
//       <button onClick={() => navigate(-1)}>← Back</button>
//       <h2>{card.title}</h2>

//       {loading && <p>Loading...</p>}
//       {error && <p >Error: {error}</p>}

//       {!loading && !error && (

//         <ul>
//           {/* <h1>{location.data}</h1> */}
//           {results.map((tool) => (
//             <li key={tool._id} className="tool-card">
//               <strong>{tool.name}</strong> ({tool.category}) <br />
//               {tool.description} <br />
//               💰 {tool.rentPrice} {tool.rentUnit} <br />
//               🏢 {tool.serviceProvider?.name} • 📞{" "}
//               {tool.serviceProvider?.contact}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
