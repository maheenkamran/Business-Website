import './Profile.css'
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
function Profile() {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const date = new Date().toLocaleDateString('en-US', options); //only date, not time

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState();

    const verifylogin = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/verifyE?email=${email}&password=${password}`);
            const result = await res.json();

            if (res.status === 200) {
                setUser(result);
                setIsSignedIn(true);
                localStorage.setItem("user", JSON.stringify(result)); //browsers feature, key-value //object->string(stringify)
            } else {
                alert("Invalid credentials"); // Or handle error more nicely
            }
        } catch (err) {
            console.error(err);
            alert("Login error occurred");
        }
    }

    const logout = () => {
        setIsSignedIn(false);
        localStorage.removeItem("user");
        setUser(null);
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); //string to object (parse)
            setIsSignedIn(true);
        }
    }, []);
    //It will run once only, right after the Profile component mounts — because of the empty dependency array [].
    //as when page refreshes components mounts again

    return (
        <>
            <Header />
            {isSignedIn ? (<div className='profile-container'>
                <div className='profile-panel-section'></div>
                <div className='profile-main-section'>
                    <div className='profile-search-bar'>
                        <div className='todays-date'>{date}</div>
                    </div>
                    <div className='myprofile-text'>
                        My Profile
                        <div className='line'></div>
                    </div>
                    <div className='profilepic-name'>
                        <img className='profile-pic' src={user.profilepic} alt="profile-pic"></img>
                        <div className='name-location'>
                            <div className='name-logout'>
                                <div className='name'>{user.Fname} {user.Lname}</div>
                                <i id="logout-icon" className="fa-solid fa-right-from-bracket" onClick={() => { logout() }}></i>
                            </div>
                            <div className='user-text'>User</div>
                            <div className='location'>{user.city}, Pakistan</div>
                        </div>
                    </div>
                    <div className='personal-info'>
                        <div className='pi-text'>Personal Information</div>
                        <div className='pi-line'></div>
                        <div className='pi-fn'>{user.Fname}</div>
                        <div className='pi-ln'>{user.Lname}</div>
                        <div className='pi-dob'>{user.DOB}</div>
                        <div className='pi-email'>{user.email}</div>
                        <div className='pi-phone'>{user.phone}</div>
                    </div>
                    <div className='address'>

                        <div className='add-text'>Address</div>
                        <div className='add-line'></div>
                        <div className='add-country'>Pakistan</div>
                        <div className='add-city'>{user.city}</div>
                    </div>
                </div>
            </div>
            ) : (
                <div className='pop-up-container'>
                    <div className='pop-up'>
                        <h>Login</h>
                        <p>Enter your details to login</p>

                        <input className='input-email' placeholder='Enter Email/Phone No'
                            onChange={(e) => { setEmail(e.target.value) }}></input>

                        <input className='input-password' placeholder='Password'
                            onChange={(e) => { setPassword(e.target.value) }}></input>

                        <button className='login-btn' onClick={() => { verifylogin() }}>Login</button>
                        <div>login with google etc</div>
                        <div className='signup-container'>
                            <p>Don't have an account?</p>
                            <p className='signup-text'>Sign Up</p>
                            {/* make signup page */}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default Profile;