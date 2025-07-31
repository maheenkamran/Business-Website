import './FilterPanel.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PriceRange from '../PriceRange/PriceRange.js';
import { useSearchParams } from 'react-router-dom';

function FilterPanel() {

    const [categorySection, setCategorySection] = useState(true);
    const [priceSection, setPriceSection] = useState(true);
    const [conditionSection, setConditionSection] = useState(true);
    const [ratingsSection, setRatingsSection] = useState(true);

    const toggleCategorySection = () => {
        setCategorySection(!categorySection);
    }

    const togglePriceSection = () => {
        setPriceSection(!priceSection);
    }

    const toggleConditionSection = () => {
        setConditionSection(!conditionSection);
    }

    const toggleRatingSection = () => {
        setRatingsSection(!ratingsSection);
    }

    const navigate = useNavigate();

    const navigateCategory = (category) => {
        navigate(`/products?category=${category}`);
    }

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    const navigatePrice = (min, max) => {
        navigate(`/products?category=${category}&min=${min}&max=${max}`);
        //react changes url and moves to product details page, fetch mein backend wala route dena
        //this is for frontend
    }
    const [price, setPrice] = useState([0, 50000]);

    const navigateCondition = (condition) => {
        navigate(`/products?category=${category}&condition=${condition}`);
    }
    return (
        <>
            <div className='filterpanel-box'>

                <div className='filter-section' >
                    <p onClick={() => { toggleCategorySection() }}>Category
                        {categorySection ? "▲" : "▼"}
                    </p>
                    {(categorySection ? (
                        <div>
                            <div className='category-type' onClick={() => { navigateCategory('Home') }}>Home</div>
                            <div className='category-type' onClick={() => { navigateCategory('Accessories') }}>Accessories</div>
                            <div className='category-type' onClick={() => { navigateCategory('Clothing') }}>Clothing</div>
                            <div className='category-type' onClick={() => { navigateCategory('Furniture') }}>Furniture</div>
                            <div className='category-type' onClick={() => { navigateCategory('Electronics') }}>Electronics</div>
                            <div className='category-type' onClick={() => { navigateCategory('Sports') }}>Sports</div>
                        </div>
                    ) : (<p></p>))}
                </div>
                <div className='filter-section' >
                    <p onClick={() => { togglePriceSection() }}>Price range
                        {priceSection ? "▲" : "▼"}
                    </p>
                    {priceSection ? (
                        <div>
                            <PriceRange price={price} setPrice={setPrice} />
                            <div className='min-max'>
                                <div>
                                    <p>Min</p>
                                    <input placeholder='0' value={price[0]}
                                        onChange={(e) => { setPrice([+e.target.value, price[1]]) }}>
                                    </input>
                                </div>
                                <div>
                                    <p>Max</p>
                                    <input placeholder='99999' value={price[1]}
                                        onChange={(e) => { setPrice([price[0], +e.target.value]) }}></input>
                                </div>
                                <button className='apply-btn' onClick={() => { navigatePrice(price[0], price[1]) }}>Apply</button>
                            </div>
                        </div>
                    ) : (<p></p>)}
                </div>
                <div className='filter-section'>
                    <p onClick={() => { toggleConditionSection() }}>Condition
                        {conditionSection ? "▲" : "▼"}
                    </p>
                    {conditionSection ? (
                        <div className='condition-section'>
                            <label><input type='radio' name="condition-input" onClick={() => { navigateCondition('Any') }} />Any</label>
                            <label><input type='radio' name="condition-input" onClick={() => { navigateCondition('Brand New') }} />Brand New</label>
                            <label><input type='radio' name="condition-input" onClick={() => { navigateCondition('Refurbished') }} />Refurbished</label>
                            <label><input type='radio' name="condition-input" onClick={() => { navigateCondition('Old Items') }} />Old Items</label>
                            {/* by giving all same name, we ensure aik option select hou only */}
                        </div>
                    ) : (<p></p>)}
                </div>
                <div className='filter-section'>
                    <p onClick={() => { toggleRatingSection() }}>Ratings
                        {ratingsSection ? "▲" : "▼"}
                    </p>
                    {ratingsSection ? (
                        <div>
                            <div className='rating-line'>
                                <label><input type='checkbox' />
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </label>
                            </div>
                            <div className='rating-line'>
                                <label><input type='checkbox' />
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star off"></i>
                                </label>
                            </div>
                            <div className='rating-line'>
                                <label><input type='checkbox' />
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star off"></i>
                                    <i className="fa-solid fa-star off"></i>
                                </label>
                            </div>
                            <div className='rating-line'>
                                <label><input type='checkbox' />
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star off"></i>
                                    <i className="fa-solid fa-star off"></i>
                                    <i className="fa-solid fa-star off"></i>
                                </label>
                            </div>
                            <div className='rating-line'>
                                <label><input type='checkbox' />

                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star off"></i>
                                    <i className="fa-solid fa-star off"></i>
                                    <i className="fa-solid fa-star off"></i>
                                    <i className="fa-solid fa-star off"></i>
                                </label>
                            </div>
                        </div>
                    ) : (<p></p>)}
                </div>
            </div >
        </>
    );
}

export default FilterPanel;