import './Admin.css';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Admin() {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const date = new Date().toLocaleDateString('en-US', options);

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(null);
    const [selected, setSelected] = useState("dashboard");
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const verifylogin = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/verifyE?email=${email}&password=${password}`);
            const result = await res.json();

            if (res.status === 200) {
                if (result.role !== 'admin') {
                    alert("Access denied. Admins only.");
                    return;
                }

                setAdmin(result);
                setIsSignedIn(true);
                localStorage.setItem("admin", JSON.stringify(result));
            } else {
                alert("Invalid credentials");
            }
        } catch (err) {
            console.error(err);
            alert("Login error occurred");
        }
    }

    const logout = () => {
        setIsSignedIn(false);
        localStorage.removeItem("admin");
        setAdmin(null);
    }

    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            const parsed = JSON.parse(storedAdmin);
            if (parsed.role === 'admin') {
                setAdmin(parsed);
                setIsSignedIn(true);
            } else {
                localStorage.removeItem("admin");
            }
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/users`);

            if (res.ok) {
                const result = await res.json();
                setUsers(result);
            }
            else {
                const text = await res.text();
                throw new Error(`Request failed: ${res.status} ${text}`);

            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const fetchProducts = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/products/all`);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    return (
        <>
            <Header />
            {isSignedIn ? (
                <div className='admin-profile-container'>
                    <div className='admin-profile-panel-section'>
                        <div className='admin-brandname'>Admin Panel</div>
                        <div className='admin-pp-line'></div>
                        <div className='admin-pp-section' onClick={() => setSelected("dashboard")}><i className="fa-solid fa-chart-line"></i><p>Dashboard</p></div>
                        <div className='admin-pp-section' onClick={() => { setSelected("manageUsers"); fetchUsers() }}><i className="fa-solid fa-users"></i><p>Manage Users</p></div>
                        <div className='admin-pp-section' onClick={() => { setSelected("manageProducts"); fetchProducts(); }}><i className="fa-solid fa-box"></i><p>Manage Products</p></div>

                        <div className='admin-pp-section' onClick={() => setSelected("orders")}><i className="fa-solid fa-clipboard-list"></i><p>Orders</p></div>
                        <div className='admin-pp-section' onClick={() => setSelected("settings")}><i className="fa-solid fa-gear"></i><p>Settings</p></div>
                        <div className='admin-pp-logout' onClick={logout}><p>Logout</p><i className="fa-solid fa-right-from-bracket"></i></div>
                    </div>

                    <div className='admin-profile-main-section'>



                        {selected === "dashboard" && (
                            <div className='profile-main-section'>
                                <div className='profile-search-bar'>
                                    <div className='todays-date'>{date}</div>
                                </div>
                                <div className='myprofile-text'>
                                    My Profile
                                    <div className='line'></div>
                                </div>
                                <div className='profilepic-name'>
                                    <img className='profile-pic' src={admin.profilepic} alt="profile-pic"></img>
                                    <div className='name-location'>
                                        <div className='name-logout'>
                                            <div className='name'>{admin.Fname} {admin.Lname}</div>
                                            <i id="logout-icon" className="fa-solid fa-right-from-bracket" onClick={() => { logout() }}></i>
                                        </div>
                                        <div className='user-text'>Admin</div>
                                        <div className='location'>{admin.city}, Pakistan</div>
                                    </div>
                                </div>
                                <div className='personal-info'>
                                    <div className='pi-text'>Personal Information</div>
                                    <div className='pi-line'></div>


                                    <div className='name-dob'>
                                        <div className='pi-fn'><h>First Name</h><p>{admin.Fname}</p></div>
                                        <div className='pi-fn'><h>Last Name</h><p>{admin.Lname}</p></div>
                                        <div className='pi-fn'><h>DOB</h><p>{new Date(admin.DOB).toLocaleDateString()}</p></div>
                                    </div>
                                    <div className='email-phone'>
                                        <div className='pi-email'><h>Email</h><p>{admin.email}</p></div>
                                        <div className='pi-fn'><h>Phone</h><p>{admin.phone}</p></div>
                                    </div>


                                </div>

                                <div className='address'>
                                    <div className='add-text'>Address</div>
                                    {/* <div className='add-line'></div> */}
                                    <div className='add-info'>
                                        <div className='pi-fn'><h>Country</h><p>Pakistan</p></div>
                                        <div className='pi-fn'><h>City</h><p>{admin.city}</p></div>
                                    </div>
                                </div>
                            </div>
                        )
                        }

                        {selected === "manageUsers" && <div>
                            <div className='mu-section'>
                                <div className='h-add'>
                                    <h3>Manage Users</h3>
                                    <div className='mu-action-btn add'>
                                        <i className="fa-solid fa-plus"></i>
                                    </div>
                                </div>

                                {users.map((u, i) =>
                                (
                                    <div className='mu-card' key={u._id}>
                                        <div className='mu-details'>
                                            <i id="mu-icon" className="fa-solid fa-user"></i>
                                            <p>{(u.Fname || 'Loading') + ' ' + (u.Lname || 'Loading')}</p>
                                            <p id="mu-email">{u.email}</p>
                                            <p>{u.phone}</p>
                                            <p>{u.password}</p>
                                            <div className='mu-action-btn'>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </div>
                                            <div className='mu-action-btn delete'>
                                                <i className="fa-solid fa-trash"></i>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                }

                            </div>
                        </div>}
                        {selected === "manageProducts" && <div>
                            <div className='mp-section'>
                                <div className='h-add'>
                                    <h3>Manage Products</h3>
                                    <div className='mp-action-btn add'>
                                        <i className="fa-solid fa-plus"></i>
                                    </div>
                                </div>

                                {products.map((p, i) => (
                                    <div className='mp-card' key={p._id}>
                                        <div className='mp-details'>
                                            <img className='mp-img' src={p.image} alt="product" />
                                            <p>{p.name}</p>
                                            <p>{p.category}</p>
                                            <p>Rs. {p.price}</p>
                                            <p>{p.stock} left</p>
                                            <div className='mp-action-btn'>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </div>
                                            <div className='mp-action-btn delete'>
                                                <i className="fa-solid fa-trash"></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>}

                        {selected === "orders" && <div>📑 View Orders Section</div>}
                        {selected === "settings" && <div>⚙️ Settings Section</div>}
                    </div>
                </div>
            ) : (
                <div className='admin-pop-up-container'>
                    <div className='admin-pop-up'>
                        <h>Admin Login</h>
                        <p>Enter your admin credentials to login</p>

                        <input className='admin-input-email' placeholder='Enter Admin Email'
                            onChange={(e) => setEmail(e.target.value)} />

                        <input className='admin-input-password' placeholder='Password' type="password"
                            onChange={(e) => setPassword(e.target.value)} />

                        <button className='admin-login-btn' onClick={verifylogin}>Login</button>

                        <div style={{ marginTop: '10px', color: 'gray' }}>
                            Admin access only
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default Admin;
