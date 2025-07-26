import './Cart.css';
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Cart() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [cart, setCart] = useState([]); //empty array
    const [productList, setProductList] = useState([]);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(200);

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

    const addquantity = async (productid) => {
        const res = await fetch(`http://localhost:3000/api/users/add-cart?userid=${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { productid: productid }
                )
            }
        )
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Request failed: ${res.status} ${text}`);
        }
        await getCart();
    }

    const removequantity = async (productid) => {
        const res = await fetch(`http://localhost:3000/api/users/remove-cart?userid=${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { productid: productid }
                )
            }
        )
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Request failed: ${res.status} ${text}`);
        }
        await getCart();
    }

    const deletefromcart = async (productid, quantity) => {
        const res = await fetch(`http://localhost:3000/api/users/delete-from-cart?userid=${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        productid: productid,
                        quantity: quantity
                    }
                )
            }
        )
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Request failed: ${res.status} ${text}`);
        }
        await getCart();
    }

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


    return (
        <>
            <Header />
            {
                cart.length === 0 ? (
                    <div className='emptycart-msg'>Cart is Empty</div>
                ) :
                    <div className='cart-container '>
                        <div className='cart-items'>
                            <h>Cart</h>
                            {
                                cart.map((item, index) => (
                                    <>
                                        <div className='cart-item' key={item._id}>

                                            {/* because load ka time lagta so ternary is imp */}
                                            {productList[index] ?
                                                (
                                                    <>
                                                        <img src={productList[index].image} alt="product-image"></img>
                                                        <div className='item-info'>
                                                            <div className='c-productname'> {productList[index].name}  </div>
                                                            <div className='c-properties'>properties</div>
                                                        </div>

                                                        <div className='qty-bill'>
                                                            <div className='c-price'>Rs.{productList[index].price}</div>
                                                            <div className='c-quantity'>
                                                                <button className='btn-cart' onClick={() => { removequantity(productList[index]._id) }}>-</button>
                                                                <div className='item-qty'> {item.quantity}</div>
                                                                <button className='btn-cart' onClick={() => { addquantity(productList[index]._id) }}>+</button>
                                                            </div>
                                                            <div className='delete-btn' onClick={() => { deletefromcart(productList[index]._id, cart[index].quantity) }}>
                                                                <i className="fa-solid fa-trash"></i>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (<p>Loading</p>)
                                            }

                                        </div>
                                        <div className='cart-line'></div>
                                    </>
                                ))
                            }

                        </div>
                        <div className='bill-box'>
                            <h>Order Summary</h>
                            <div className='total'>
                                <p>Subtotal</p>
                                <div>Rs. {total}</div>
                            </div>
                            <div className='delivery'>
                                <p>Delivery</p>
                                <div>Rs. {discount}</div>
                            </div>
                            <div className='d-line'></div>
                            <div className='total-bill-box'>
                                <p>Total</p>
                                <div>Rs.{total + discount}</div>
                            </div>
                            <div className='checkout'><p>Checkout</p></div>
                        </div>
                    </div>

            }


            <Footer />
        </>
    );
}

export default Cart;