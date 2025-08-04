import './Signup.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';

function Signup() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");

    const signupuser = async () => {
        if (!fname || !email || !password) {
            alert("Please fill in all required fields.");
            return;
        }

        const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Fname: fname,
                Lname: lname,
                DOB: dob,
                email: email,
                phone: phone,
                password: password,
                city: city
            })
        })
        if (!data.ok) {
            const errorData = await data.json();
            alert("Error: " + (errorData.message || "Can't sign in"));
            console.log(errorData);
        }
        else {
            const result = await data.json();
            alert("User created successfully!");
        }
    }
    return (
        <>
            <Header />
            <div className='signup-page'>
                <img src="https://images.pexels.com/photos/18288706/pexels-photo-18288706.jpeg" alt="signup-img" />

                <div className="signup-info">
                    <div className='logo-signup'>
                        <img id="s-logo" src="/images/icon.png" alt="logo" />
                        <img id="s-brand-name" src="/images/brandname.png" alt="brand" />
                    </div>

                    <h2>Create your account</h2>

                    <div className="disp-flex">
                        <div className="input-container">
                            <div className="input-heading">First Name</div>
                            <input
                                className='shipping-input'
                                placeholder="First Name"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                            />
                        </div>

                        <div className="input-container">
                            <div className="input-heading">Last Name</div>
                            <input
                                className='shipping-input'
                                placeholder="Last Name"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="disp-flex">
                        <div className="input-container">
                            <div className="input-heading">Email</div>
                            <input
                                className='shipping-input'
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-container">
                            <div className="input-heading">Phone Number</div>
                            <input
                                className='shipping-input'
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="disp-flex">
                        <div className="input-container">
                            <div className="input-heading">City</div>
                            <input
                                className='shipping-input'
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <div className="input-heading">DOB</div>
                            <input
                                className='shipping-input'
                                placeholder="Date of Birth"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="disp-flex">
                        <div className="input-container">
                            <div className="input-heading">Password</div>
                            <input
                                className='shipping-input'
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className='signup-btn-done' onClick={() => { signupuser() }}>Sign Up</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Signup;
