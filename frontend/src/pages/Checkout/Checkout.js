import './Checkout.css';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";

function Checkout() {

    const [cart, setCart] = useState([]); //empty array
    const [productList, setProductList] = useState([]);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [total, setTotal] = useState(0);
    const [delivery, setDelivery] = useState(200);
    const [isComplete, setIsComplete] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));


    const getCart = async () => {
        try {
            const data = await fetch(`http://localhost:3000/api/users/cart?id=${id}`);
            const result = await data.json();

            setCart(result.cart ?? []); //only store cart array
        }
        catch (err) {
            console.log({ err: err.message });
        }
    }

    useEffect(() => {
        const getCart = async () => {
            try {
                const data = await fetch(`http://localhost:3000/api/users/cart?id=${id}`);
                const result = await data.json();

                setCart(result.cart ?? []); //only store cart array
            }
            catch (err) {
                console.log({ err: err.message });
            }
        }
        getCart();
    }, [id]);

    useEffect(() => {
        const fetchProductResults = async () => {
            const products = [];

            try {
                for (const item of cart) { //each item of cart, not the index, the item
                    const productid = item.productid; //cheez ka productid

                    const result = await fetch(`http://localhost:3000/api/products/details?id=${productid}`);

                    const data = await result.json();
                    products.push(data[0]); //since data gives array, we want object
                }
                setProductList(products);
            }
            catch (err) {
                console.log({ err: err.message });
            }
        }
        if (cart.length > 0) fetchProductResults();
    }, [cart])

    useEffect(() => {
        let t = 0;

        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            const product = productList[i];

            if (product) {
                t += product.price * item.quantity;
            }
            setTotal(t);
        }
    }, [cart, productList]);

    const navigate = useNavigate();

    return (<>
        <Header />
        <div className="checkout-page">
            <div className="shipping-info">
                <h2>Shipping information</h2>
                <div className="disp-flex">
                    <div className="input-container">
                        <div className="input-heading">First Name </div>
                        <input className='shipping-input' placeholder="First Name" defaultValue={user?.Fname}></input>
                    </div>
                    <div className="input-container">
                        <div className="input-heading">Last Name </div>
                        <input className='shipping-input' placeholder="Last Name" defaultValue={user?.Lname}></input>
                    </div>
                </div>

                <div className="disp-flex">
                    <div className="input-container">
                        <div className="input-heading">Email </div>
                        <input className='shipping-input' placeholder="Email" defaultValue={user?.email}></input>
                    </div>

                    <div className="input-container">
                        <div className="input-heading">Phone Number</div>
                        <input className='shipping-input' placeholder="Phone Number" defaultValue={user?.phone}></input>
                    </div>
                </div>

                <div className="disp-flex">
                    <div className="input-container">
                        <div className="input-heading">City</div>
                        <input className='shipping-input' placeholder="City" defaultValue={user?.city}></input>
                    </div>
                </div>

                <div className="disp-flex">
                    <div className="input-container">
                        <div className="input-heading">Description</div>
                        <input className='description-input'></input>
                    </div>
                    <div className="cod-box">
                        <h>Shipping Type</h>
                        <label className="radio-label">
                            <input type='radio' value='cod' className="radio-input" defaultChecked />Cash on Delivery (COD)
                        </label>
                    </div>
                </div>
            </div>
            <div className="chk-cart-info">
                <div className="chk-cart-info-h"> Order Summary</div>
                {
                    cart.map((item, index) => (
                        <>
                            <div className='chk-cart-item' key={item._id}>

                                {/* because load ka time lagta so ternary is imp */}
                                {productList[index] ?
                                    (
                                        <>
                                            <img src={productList[index].image} alt="product-image"></img>
                                            <div className='chk-item-info'>
                                                <div className='chk-c-productname'> {productList[index].name}  </div>
                                                <div className='chk-c-properties'>properties</div>
                                            </div>

                                            <div className='chk-qty-bill'>
                                                <div className='chk-c-price'>Rs.{productList[index].price}</div>
                                                {/* <div className='item-qty'> {item.quantity}</div> */}
                                            </div>
                                        </>
                                    ) : (<p>Loading</p>)
                                }

                            </div >
                        </>
                    ))

                }


                <div className='chk-total'>
                    <p>Subtotal</p>
                    <div>Rs. {total}</div>
                </div>
                <div className='chk-delivery'>
                    <p>Delivery</p>
                    <div>Rs. {delivery}</div>
                </div>
                <div className='chk-d-line'></div>
                <div className='chk-total-bill-box'>
                    <p>Total</p>
                    <div>Rs. {total + delivery}</div>
                </div>
                <div className='complete-btn' onClick={() => { setIsComplete(true) }} ><p>Complete Order</p></div>

                {isComplete ? (
                    <div className='overlay'>
                        <div className='order-done'>
                            Thankyou for shopping with us
                        </div>
                        <button onClick={() => { navigate("/") }}>Shop More</button>
                    </div>
                ) : (<p></p>)}
            </div>
        </div >
        <Footer />
    </>);
}

export default Checkout;