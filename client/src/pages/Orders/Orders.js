import './Orders.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Orders() {

    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);
    const [productList, setProductList] = useState([]);
    const [isSignedIn] = useState(!!user);
    const [fetchedProductIds, setFetchedProductIds] = useState(new Set());
    const [currentReviewProductId, setCurrentReviewProductId] = useState(null); //product we are reviewing
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (user) {
            const fetchOrders = async () => {
                try {
                    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${user._id}`);
                    const data = await res.json();

                    if (res.ok) {
                        setOrders(data);
                    } else {
                        console.log(data);
                    }
                } catch (err) {
                    console.log("Network fetch error:", err.message);  // <--- key line
                }
            }
            fetchOrders();
        }
    }, [user]);

    useEffect(() => {
        const fetchProductResults = async () => {
            try {
                const productIds = [];

                for (const order of orders) {
                    for (const item of order.products) {
                        const id = item.productid;
                        if (!fetchedProductIds.has(id)) {
                            productIds.push(id);
                        }
                    }
                }
                if (productIds.length === 0) return;
                const fetches = productIds.map(id =>
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/details?id=${id}`)
                        .then(res => res.json())
                        .then(data => data[0])
                );

                const results = await Promise.all(fetches);

                setProductList(prev => [...prev, ...results]);
                setFetchedProductIds(prev => new Set([...prev, ...productIds]));
            } catch (err) {
                console.log("Product fetch error:", err.message);
            }
        };

        if (orders.length > 0) {
            fetchProductResults();
        }
    }, [orders, fetchedProductIds]);

    const navigate = useNavigate();

    const reviewComplete = async (productid) => {

        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userid: user._id,
                username: user.Fname + ' ' + user.Lname,
                productid: productid,
                rating: rating,
                reviewtext: review
            })
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Request failed: ${res.status} ${text}`);
        }
    }

    return (
        <>
            {isSignedIn ? (
                <div className='orders-container'>
                    <h2>My Orders</h2>
                    {
                        orders.map(orderItem => (
                            <div key={orderItem._id} className='order-item'>
                                <div className='id-date'>
                                    <div className='order-id'>Order ID: {orderItem._id}</div>
                                    <div className='order-date'> {new Date(orderItem.date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                    </div>
                                </div>
                                {
                                    orderItem.products.map((p, i) => {

                                        const product = productList.find(prod => prod._id === p.productid);
                                        //productlist kay item ki id matches order keh product ki id 
                                        return (
                                            <div key={i}>{product ? (

                                                <div className='product-box' >
                                                    <div className='img-name' onClick={() => { navigate(`/product-details?id=${product._id}`) }}>
                                                        <div className='op-image'><img src={product.image} alt="product-img" width="50" height="50"
                                                        ></img></div>
                                                        <div className='op-qty'>{p.quantity} x </div>
                                                        <div className='op-name'>{product.name}</div>
                                                    </div>

                                                    <div className='price-review'>
                                                        <div>Rs. {product.price}</div>
                                                        <button onClick={() => { setCurrentReviewProductId(product._id) }}>Review</button>

                                                        {currentReviewProductId === product._id ? (
                                                            <div className='review-popup'>
                                                                <div className='review-box'>
                                                                    <div className='review-popup-close-btn' onClick={() => { setCurrentReviewProductId() }}>
                                                                        <i className="fa-solid fa-xmark"></i>
                                                                    </div>
                                                                    <h2>Give a Review</h2>

                                                                    <div className='review-product'>
                                                                        <img src={product.image} alt="product-img" width="50" height="50"></img>
                                                                        <div className='op-name'>{product.name}</div>
                                                                    </div>


                                                                    <div className='stars'>
                                                                        <div className='rating-star'> <i className={`fa-solid fa-star ${rating >= 1 ? 'selected' : ''}`} onClick={() => { setRating(1) }}></i></div>
                                                                        <div className='rating-star'> <i className={`fa-solid fa-star ${rating >= 2 ? 'selected' : ''}`} onClick={() => { setRating(2) }}></i></div>
                                                                        <div className='rating-star'> <i className={`fa-solid fa-star ${rating >= 3 ? 'selected' : ''}`} onClick={() => { setRating(3) }}></i></div>
                                                                        <div className='rating-star'> <i className={`fa-solid fa-star ${rating >= 4 ? 'selected' : ''}`} onClick={() => { setRating(4) }}></i></div>
                                                                        <div className='rating-star'> <i className={`fa-solid fa-star ${rating === 5 ? 'selected' : ''}`} onClick={() => { setRating(5) }}></i></div>
                                                                    </div>

                                                                    <input className='review-text-box' placeholder='How was your product?'
                                                                        value={review} onChange={(e) => { setReview(e.target.value) }} />

                                                                    <button onClick={() => { reviewComplete(product._id, rating); setCurrentReviewProductId(null); setRating(0); setReview("") }}>Done</button>
                                                                </div>
                                                            </div>
                                                        ) : <p></p>
                                                        }
                                                    </div>

                                                </div>

                                            ) : 'Loading'}
                                            </div>
                                        );
                                    })
                                }

                            </div>
                        ))
                    }
                </div>
            ) : (
                <p>Signed out</p>
            )}
        </>

    );
}

export default Orders;