import './ProductDetails.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductDetails() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const result = await fetch(`http://localhost:3000/api/products/details?id=${id}`);

                const data = await result.json();
                console.log(data);
                setProduct(data[0]); //since data gives array, we want object 
            }
            catch (err) {
                console.log({ err: err.message });
            }
        }

        fetchResults();

    }, [id])

    const minusQty = (q) => {
        if (q > 0)
            setQty(q => q - 1);

    }
    const addQty = (q) => {
        setQty(q => q + 1);
    }

    return (<>
        <Header />

        {!product ?
            //ternary operator is necessary 
            //as 1 sec for loading etc causes problems->loading screen is imp
            (<p>Loading</p>) :
            (
                <div className="p-item" >

                    <div className="p-image">
                        <img src={product.image} alt="product"></img>
                    </div>

                    <div className='product-attributes'>

                        {product.stock ? (
                            <div className="p-stock-true">
                                <i className="fa-solid fa-check" ></i>
                                <p>In stock</p>
                            </div>
                        ) : (
                            <div className="p-stock-false">
                                <i className="fa-solid fa-xmark" ></i>
                                <p>Out of stock</p>
                            </div>
                        )}

                        <div className="p-name">{product.name}</div>
                        <div className="p-price">Rs.{product.price}</div>
                        <div className='p-quantity'>
                            <p>Quantity</p>
                            <button onClick={() => { minusQty(qty) }}>-</button>
                            <p className='qty-num'>{qty}</p>
                            <button onClick={() => { addQty(qty) }}>+</button>
                        </div>
                        <button className='add-to-cart-btn'>Add to Cart</button>
                        <button className='buy-now-btn'>Buy Now</button>
                    </div>

                    <div className='delivery-details'>
                        <p>Delivery details</p>
                    </div>
                </div >
            )
        }
        <Footer />
    </>
    );
}

export default ProductDetails;