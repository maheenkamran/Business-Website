import './Footer.css';

function Footer() {
    return (
        <div className='footer-container'>
            <div className='newsletter'>
                <div id="subscription-text"><p>Subscribe to our newsletter</p></div>
                <div id="extra-text"><p>Get daily news about exciting offers and discounts</p></div>

                <div className='email-container'>
                    <input className="input-box" placeholder='Email'></input>
                    <button className='subscribe-btn'>Subscribe</button>
                </div>
            </div>
        </div>
    );
}

export default Footer;