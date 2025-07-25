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
                                                            <div className='c-quantity'>{item.quantity}</div>
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
                        <div className='bill-box'>BILL</div>
                    </div>

            }


            <Footer />
        </>
    );
}

export default Cart;