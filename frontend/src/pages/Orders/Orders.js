import './Orders.css'
import { useState, useEffect } from 'react';

function Orders() {

    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);
    const [productList, setProductList] = useState([]);
    const [isSignedIn] = useState(!!user);
    const [fetchedProductIds, setFetchedProductIds] = useState(new Set());

    useEffect(() => {
        if (user) {
            const fetchOrders = async () => {
                try {
                    const res = await fetch(`http://localhost:3000/api/orders/${user._id}`);
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
                    fetch(`http://localhost:3000/api/products/details?id=${id}`)
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

    return (
        <>
            {isSignedIn ? (
                <div className='orders-container'>
                    <h2>My Orders</h2>
                    {
                        orders.map(orderItem => (
                            <div key={orderItem._id} className='order-item'>
                                <div className='order-id'>Order ID: {orderItem._id}</div>

                                {
                                    orderItem.products.map((p, i) => {
                                        const product = productList.find(prod => prod._id === p.productid);
                                        //productlist kay item ki id matches order keh product ki id 
                                        return (
                                            <div key={i}>{product ? (

                                                <div className='product-box'>
                                                    <div className='op-image'><img src={product.image} alt="product-img" width="50" height="50"
                                                    ></img></div>
                                                    <div className='op-qty'>{p.quantity} x </div>
                                                    <div className='op-name'>{product.name}</div>
                                                    <div className='op-price'>Rs. {product.price}</div>

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