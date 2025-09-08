import { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Login() {
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState('')
  const [isLogin, setIsLogin] = useState('login')
  const [location, setLocation] = useState('')
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    mobileNumber: '',
    villageOrCity: '',
    district: '',
    state: '',
    pincode: '',
    alternateMobile: '',
    gpsLocation:'33.3,44.4',  //  object, not string
    allowDataSharing: false,
    role: 'farmer',
    acceptTerms: false
  })

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    const checked = e.target.checked;
    console.log(name, value, type, checked);

    if (name === "gpsLocation") {
      setFormData(prev => ({
        ...prev,
        gpsLocation : value
      }))
      
    } 
    else{
      setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (isLogin=='login') {
            console.log('Login attempt:', { mobileNumber: formData.mobileNumber, emailId: formData.emailId, password: formData.password })
            // Add your login logic here
            if (formData.emailId && !emailRegex.test(formData.emailId)) { 
              alert("Invalid email format");
              return;
            }
            if (formData.mobileNumber && !phoneRegex.test(formData.mobileNumber)) {
              alert("Invalid phone number");
              return
            }
            console.log("API URL:", import.meta.env.VITE_API_URL);

            const resp = await fetch(`${import.meta.env.VITE_API_URL}/user/sendotp`,{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({emailId:formData.emailId, mobileNumber:formData.mobileNumber})
            })
            if(resp.ok){
              const msg = await resp.text();
              navigate('/otpPage', {state:{emailId:formData.emailId}});
              alert(msg);
            }
            else{
              const msg = await resp.text();
              alert(msg + " | Invalid Mobile Or Email")
            }
    } 
    else if(isLogin=='signup') {
            if (formData.emailId && !emailRegex.test(formData.emailId)) { 
              alert("Invalid email format");
              return;
            }
            if (formData.mobileNumber && !phoneRegex.test(formData.mobileNumber)) {
              alert("Invalid phone number");
              return
            }
            if (formData.password !== formData.confirmPassword) {
              alert('Passwords do not match!')
              return
            }
            if (!formData.acceptTerms) {
              alert('Please accept the terms and conditions!')
              return
            }
            const [lat, lng] = formData.gpsLocation.split(",").map(Number); // "34.0836,74.7973" → [34.0836, 74.7973]
            const payload={
              ...formData,
              gpsLocation:{type:"Point", coordinates:[lng, lat]}
            }
            
            console.log('Signup attempt:', payload)
            // Add your signup logic here
            try{
              const res = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`,{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
              });

              const data = await res.json();

              if(data.success){
                alert(data.message);
                // navigate('/login')
                setIsLogin('login')
              }
              else{
                alert(data.message || 'Signup failed');
              }
            }
            catch(err){
              console.error('Signup error:', err);
              alert('Something went wrong! Please try again.');
            }
    }
  }

  const toggleMode = () => {
    if(isLogin === 'login') setIsLogin('signup');
    else if(isLogin === 'signup') setIsLogin('login')
    setFormData({
      emailId: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      mobileNumber: '',
      villageOrCity: '',
      district: '',
      state: '',
      pincode: '',
      alternateMobile: '',
      gpsLocation: '33.33,44.44',
      allowDataSharing: false,
      role: 'farmer',
      acceptTerms: false
    })
  }
  

  return (
    <div className='login-div-out'>
      <Header/>
    <div className="app">
      <div className="auth-container">
        {/* {isLogin == 'login' && <div><h1 className='hello-farmer'>Hello Farmer! Welcome to 'EasFarm'</h1></div>} */}

        {(isLogin === 'signup'|| isLogin==='login') && <div className="auth-card">
          <div className="auth-header">
            <h1>{(isLogin === 'login') ? 'Welcome To EasFarm' : 'Create Account:'}</h1>
            <p>{(isLogin === 'login') ? 'Sign in to your account' : 'Join us today'}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {isLogin == 'signup' && (
              <>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    // required
                  />
                </div>
              </>
            )}
                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={(e)=>{
                      handleInputChange(e);
                      setPhoneError("");
                    }}
                    placeholder="Enter your mobile number"
                    required
                    onBlur={() => {
                      if (formData.mobileNumber && !phoneRegex.test(formData.mobileNumber)) {
                        setPhoneError("Invalid phone number");
                      } else {
                        setPhoneError("");
                      }
                    }}
                  />
                  {phoneError && <p style={{ color: "#800303" }}>{phoneError}</p>}
                </div>
            {isLogin == 'signup' && (
              <>
                <div className="form-group">
                  <label htmlFor="villageOrCity">Village/City *</label>
                  <input
                    type="text"
                    id="villageOrCity"
                    name="villageOrCity"
                    value={formData.villageOrCity}
                    onChange={handleInputChange}
                    placeholder="Enter your village or city"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="district">District *</label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Enter your district"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter your state"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter your pincode"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="alternateMobile">Alternate Mobile</label>
                  <input
                    type="tel"
                    id="alternateMobile"
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    onChange={handleInputChange}
                    placeholder="Enter alternate mobile number (optional)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gpsLocation">GPS Location *</label>
                  <input
                    type="text"
                    id="gpsLocation"
                    name="gpsLocation"
                    value={formData.gpsLocation}
                    onChange={handleInputChange}
                    onBlur={() => {
                      if (!formData.gpsLocation.trim()) {
                        setFormData({ ...formData, gpsLocation: "30.3,30.3" });
                      }
                    }}
                    placeholder="Enter GPS. eg - 32.04,45.21"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="farmer">farmer</option>
                    <option value="admin">admin</option>
                    <option value="serprovider">serprovider</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="emailId">EmailId *</label>
              <input
                type="emailId"
                id="emailId"
                name="emailId"
                value={formData.emailId}
                onChange={(e)=>{
                  handleInputChange(e);
                  setEmailError("");
                }}
                placeholder="Enter your emailId"
                required
                onBlur={() => { 
                  if (formData.emailId && !emailRegex.test(formData.emailId)) { 
                    setEmailError("Invalid email format");
                  } else {
                    setEmailError(""); 
                  }
                }}
              />
              {emailError && <p style={{ color: "#800303" }}>{emailError}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {isLogin == 'signup' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {isLogin == 'signup' && (
              <>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="allowDataSharing"
                      checked={formData.allowDataSharing}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Allow data sharing for better service
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="checkmark"></span>
                    I accept the terms and conditions *
                  </label>
                </div>
              </>
            )}

            <button type="submit" className="submit-btn">
              {isLogin=='login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-footer">
            <p className='bottom-para'>
              {(isLogin==='login') ? "Don't have an account? " : "Already have an account? "}
              <button onClick={toggleMode} className="toggle-btn">
                {isLogin==='login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>


            <p className='bottom-para'>
              {(isLogin ==='login') ? "I am a owner ": "Owner Register Here "}
              <button className='ownerBtn' onClick={()=>{navigate('/ownerlogin')}}>
                Owner Register
              </button>
            </p>

          </div>
        </div>} {/*auth card ends here! */}
        
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Login
