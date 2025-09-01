// Am Abhishek :)
import React, { useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import AiBot from './AiBot';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';
import Header from './Header';
import tractorIcon from '../assets/tractor.svg'
import supplier from '../assets/supplier.svg'
import seed from '../assets/seed.svg'
import water from '../assets/water.svg'
import plant from '../assets/plant.svg'
import pesticide from '../assets/pesticide.svg'
import combined from '../assets/combined.svg'
import fertilizer from '../assets/fertilizer.svg'
import HomeHeading from './HomeHeading';


// File: src/pages/Home.jsx

const CARDS = [
  { 
    id: 'tractorOwners', 
    title: 'Tractor Owners Near me..', 
    description: 'Find tractor owners in your area', 
    apiPath: 'tractor-owners',
    icon: tractorIcon,
    available: true
  },
  { 
    id: 'suppliers', 
    title: 'Suppliers Near me..', 
    description: 'Local suppliers and vendors', 
    apiPath: 'suppliers',
    icon: supplier,
    available: true
  },
  { 
    id: 'combinedMachineOwners', 
    title: 'Combined Machine Owners Near me..', 
    description: 'Combine-harvester owners', 
    apiPath: 'combined-machine-owners',
    icon: combined,
    available: false
  },
  { 
    id: 'fertilizerManufacturers', 
    title: 'Fertilizer Manufacturers Near me..', 
    description: 'Fertilizer producers nearby', 
    apiPath: 'fertilizer-manufacturers',
    icon: fertilizer,
    available: false
  },

  // ✅ New 4 cards
  { 
    id: 'seedSuppliers', 
    title: 'Seed Suppliers Near me..', 
    description: 'Find high-quality seed suppliers', 
    apiPath: 'seed-suppliers',
    icon: seed,
    available: false
  },
  { 
    id: 'pesticideDealers', 
    title: 'Pesticide Dealers Near me..', 
    description: 'Local pesticide and agro-chemical dealers', 
    apiPath: 'pesticide-dealers',
    icon: pesticide,
    available: false
  },
  { 
    id: 'irrigationServices', 
    title: 'Irrigation Services Near me..', 
    description: 'Drip & sprinkler irrigation service providers', 
    apiPath: 'irrigation-services',
    icon: water,
    available: false
  },
  { 
    id: 'veterinaryDoctors', 
    title: 'Plants Doctors Near me..', 
    description: 'Find local animal doctors and clinics', 
    apiPath: 'veterinary-doctors',
    icon: plant,
    available: false
  },
];


function Card({ card, onClick }) {
  return (
    <button className="card" onClick={() => onClick(card)}>
      <img src={card.icon} alt={card.title} className="card__icon" />
      <div className="card__title">{card.title}</div>
      <div className="card__desc">{card.available === true ? card.description:"Coming Soon..."}</div>
    </button>
  );
}


export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/checkAuth`, {
          credentials: 'include',
        });
        const data = await res.json();

        if (data.message === 'Not Authenticated') {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [setIsLoggedIn]);

  const handleCardClick = (card) => {
    if (card.id === 'tractorOwners') {
      navigate('/results', { state: { card } });
    } else if (card.id === 'suppliers') {
      navigate('resultSuppliers', { state: { card } });
    }
  };

  return (
    <div>
        <Header />
        <div className="home-container">
          {isLoggedIn && (
            <div className="inner-container">
              <HomeHeading/>
              {/* <h1 className="text-gradient">Welcome to EasFarm</h1>
               <p class="home-subheading">Crafting digital experiences with precision and passion</p> */}
              <br /><br />
              <div className="home-card">
                <h1 className="home-title">Local Services</h1>

                <div className="cards-grid">
                  {CARDS.map((c) => (
                    <Card key={c.id} card={c} onClick={handleCardClick} />
                  ))}
                </div>
                <AiBot apiEndpoint="/api/ai-agent" />
              </div>
            </div>
          )}

          {!isLoggedIn && (
            <div className="notlog-div">
              <h1 className="notlog-welcome" style={{color:"#640D5F"}}>Hey Farmer! Welcome to EasFarm</h1>
              <h3 className="notlog-welcome" style={{color:"#5e0359ff"}}>Choose your role and Get your connection today</h3> <br /><br />

              <p className="notlog-welcome">
                Dear Farmer,<br />Make your connection today
              </p>
              <div className="twoBtn">
                <button className="navBtn" onClick={() => navigate('/login')}>
                  <h1>Customer Login</h1>
                  <br />
                  <p>Click If You Are A Farmer or Customer</p>
                </button>
                <button className="navBtn" onClick={() => navigate('/ownerlogin')}>
                  <h1>Owner Login</h1>
                  <br />
                  <p>Click If You Are A Owner/Supplier or <br />a Manufacturer</p>
                </button>
              </div>
              <p className="notlog-welcome">
                <br /> EasFarm is one stop solution for all your farming related requirements,<br /> Get connected to the <b>Machine-Owners, Seed-Suppliers, Fertilizer-manufacturer</b> in single click,
              </p>
            </div>
          )}
        </div>
                  <Footer />

    </div>
  );
}

// // File: src/pages/Home.jsx
// import React, { useEffect } from 'react';
// import './Home.css';
// import { useNavigate } from 'react-router-dom';
// import AiBot from './AiBot';
// import { useAuth } from '../context/AuthContext';
// import Footer from './Footer';
// import Header from './Header';

// const CARDS = [
//   { id: 'tractorOwners', title: 'Tractor Owners Near me..', description: 'Find tractor owners in your area', apiPath: 'tractor-owners' },
//   { id: 'suppliers', title: 'Suppliers Near me..', description: 'Local suppliers and vendors', apiPath: 'suppliers' },
//   { id: 'combinedMachineOwners', title: 'Combined Machine Owners Near me..', description: 'Combine-harvester owners', apiPath: 'combined-machine-owners' },
//   { id: 'fertilizerManufacturers', title: 'Fertilizer Manufacturers Near me..', description: 'Fertilizer producers nearby', apiPath: 'fertilizer-manufacturers' },
// ];

// function Card({ card, onClick }) {
//   return (
//     <button className="card" onClick={() => onClick(card)}>
//       <div className="card__title">{card.title}</div>
//       <div className="card__desc">{card.description}</div>
//     </button>
//   );
// }



// export default function Home() {

//   const navigate = useNavigate();
//     const {isLoggedIn, setIsLoggedIn} = useAuth();
  

//   useEffect(async()=>{
//       const checkauth = (await fetch('http://localhost:5000/user/checkAuth')).json().message;
//       if(checkauth !== 'Not Authenticated'){
//         setIsLoggedIn(false);
//       }else{
//         setIsLoggedIn(true);
//       }
//   },[]);


//   const handleCardClick = (card) => {
//     if(card.id === 'tractorOwners'){
//         navigate('/results', {state: {card}});
//     }
//     else if(card.id === 'suppliers'){
//         navigate('resultSuppliers', {state:{card}});
//     }
// };

//   return (
//     <div className="home-container">
//       {isLoggedIn && (
//         <div className="inner-container">
//           <Header/>
//           <h1 className="welcome-abhi">Welcome Abhishek!</h1>
//           <h3 className="welcome-abhi">Please select an option -</h3>
//           <br /><br />
//           <div className="home-card">
//             <h1 className="home-title">Local Services</h1>

//             <div className="cards-grid">
//               {CARDS.map((c) => (
//                 <Card key={c.id} card={c} onClick={handleCardClick} />
//               ))}
//             </div>
//             <Footer/>
//             <AiBot apiEndpoint="/api/ai-agent" />
//           </div>
//         </div>
//       )}

//       {!isLoggedIn && (
//         <div className='notlog-div'>
//           <Header/>
//           <h1 className="notlog-welcome">Hey Farmer! Welcome to EasFarm</h1>
//           <h3 className="notlog-welcome">Choose your role and Get your connection today</h3> <br /><br />

//           <p className="notlog-welcome">
//             Dear Farmer,<br />Make your connection today
//           </p>
//           <div className="twoBtn">
//             <button className="navBtn" onClick={() => navigate('/login')}>
//               <h1>Customer Login</h1>
//               <br />
//               <p>Click If You Are A Farmer or Customer</p>
//             </button>
//             <button className="navBtn" onClick={() => navigate('/ownerlogin')}>
//               <h1>Owner Login</h1>
//               <br />
//               <p>Click If You Are A Owner/Supplier or <br />a Manufacturer</p>
//             </button>
//           </div>
//           <p className="notlog-welcome">
//             <br /> EasFarm is one stop solution for all your farming related requirements,<br /> Get connected to the <b>Machine-Owners, Seed-Suppliers, Fertilizer-manufacturer</b> in single click,
//           </p>
//           <Footer/>
//         </div>
//       )}
      
//     </div>
//   );
// }










// // File: src/pages/Home.jsx
// import React, { useState } from 'react';
// import './Home.css';
// import { useNavigate } from 'react-router-dom';
// import AiBot from './AiBot';
// import { useAuth } from '../context/AuthContext';



// // Simple card definitions. `apiPath` is the endpoint path used for fetch.
// const CARDS = [
// { id: 'tractorOwners', title: 'Tractor Owners Near me..', description: 'Find tractor owners in your area', apiPath: 'tractor-owners' },
// { id: 'suppliers', title: 'Suppliers Near me..', description: 'Local suppliers and vendors', apiPath: 'suppliers' },
// { id: 'combinedMachineOwners', title: 'Combined Machine Owners Near me..', description: 'Combine-harvester owners', apiPath: 'combined-machine-owners' },
// { id: 'fertilizerManufacturers', title: 'Fertilizer Manufacturers Near me..', description: 'Fertilizer producers nearby', apiPath: 'fertilizer-manufacturers' },
// ];


// function Card({ card, onClick, active, disabled }) { //card taking prop
//     return (
//     <button
//         className={`card ${active ? 'card--active' : ''}`}
//         onClick={() => onClick(card)}//?
//         disabled={disabled}
//         aria-pressed={active}
//         >
//         <div className="card__title">{card.title}</div>
//         <div className="card__desc">{card.description}</div>
//     </button>
//     );
// }


// function ResultList({ items }) {
// if (!items || items.length === 0) return <div className="empty">No results found.</div>;


// return (
// <ul className="result-list"> {/**items is an array of object */ }
//     {items.map((it) => (
//     <li key={it.id} className="result-item">
//         <div className="result-item__title">{it.name}</div>
//         <div className="result-item__meta">{it.village || it.area || ''} {it.phone ? `• ${it.phone}` : ''}</div>
//         <div className="result-item__sub">{it.tractorModel ? `Tractor: ${it.tractorModel}` : it.info || ''}</div>
//     </li>
//     ))}
// </ul>
// );
// }


// export default function Home() {
// const [selectedCard, setSelectedCard] = useState(null);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);
// const [results, setResults] = useState([]);
// const navigate = useNavigate();
// const {isLoggedIn,setIsLoggedIn} = useAuth();



// // Replace this with real area detection or prop
// const area = 'my-area';


// const handleCardClick = async (card) => {
// // If user clicks same card, we can toggle (optional)
// if (selectedCard && selectedCard.id === card.id) return;


// setSelectedCard(card);
// setLoading(true);
// setError(null);
// setResults([]);


// try {
// // Example API path: /api/tractor-owners?area=my-area
// // Change base URL or add auth headers as needed
// const res = await fetch(`/api/${card.apiPath}?area=${encodeURIComponent(area)}`);
// if (!res.ok) throw new Error(`Server returned ${res.status}`);
// const data = await res.json();


// // Expecting an array; adapt if your API returns { data: [...] }
// if (!Array.isArray(data)) {
// // try to handle common wrapper
// setResults(data.data || []);
// } else {
// setResults(data);
// }
// } catch (err) {
// console.error(err);
// setError(err.message || 'Unknown error');
// } finally {
// setLoading(false);
// }
// };

// return (
// <div className="home-container">
//     {isLoggedIn && <div className='inner-container'>
//         <h1 className='welcome-abhi'>Welcome Abhishek!</h1>
//         <h3 className='welcome-abhi'>Please select an option -</h3>
//         <br /><br />
//         <div className='home-card'>
//             <h1 className="home-title">Local Services</h1>


//             <div className="cards-grid">
//                 {CARDS.map((c) => (
//                     <Card 
//                         key={c.id} 
//                         card={c} 
//                         onClick={handleCardClick} 
//                         active={selectedCard?.id === c.id} 
//                         disabled={loading && selectedCard?.id !== c.id} 
//                     />
//                 ))}
//             </div>


//             <div className="results-area">
//                 <h2 className="results-title">{selectedCard ? selectedCard.title : 'Select a card'}</h2>


//                 {loading && <div className="loading">Loading...</div>}
//                 {error && <div className="error">Error: {error}</div>}


//                 {!loading && !error && <ResultList items={results} />}
//             </div>
//             <AiBot apiEndpoint="/api/ai-agent"/>
//         </div>
        
//     </div>}

//     {!isLoggedIn && <div>
//         <h1 className='notlog-welcome'>Hey Farmer! Welcome to EasFarm</h1>
//         <h3 className='notlog-welcome'>Choose your role and Get your connection today</h3> <br /><br />

//         <p className='notlog-welcome'>Dear Farmer,<br />Make your connection today</p>
//         <div className='twoBtn'>
//                 <button className='navBtn' onClick={()=>navigate('/login')}> <h1>Customer Login</h1> <br /><p>Click If You Are A Farmer or Customer</p></button>
//                 <button className='navBtn' onClick={()=>navigate('/ownerlogin')}> <h1>Owner Login</h1> <br /> <p>Click If You Are A Owner/Supplier or <br />a Manufacturer</p>  </button>
//         </div>
//         <p className='notlog-welcome'><br /> EasFarm is one stop solution for all your farming related requirements,<br /> Get connected to the <b>Machine-Owners, Seed-Suppliers, Fertilizer-manufacturer</b> in single click, </p>
//     </div> }
        
// </div>
// );
// }