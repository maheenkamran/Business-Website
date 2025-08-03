import Slider from '@mui/material/Slider';

function PriceRange({ price, setPrice }) {

    const handleChange = (event, newValue) => {
        // Slider automatically passes both arguments:
        // event: the original event object
        // newValue: the actual value (or array of values if it's a range slider)

        setPrice(newValue); //[min,max]
    }

    return (
        <div className='slider'>
            <Slider
                value={price}
                onChange={handleChange}
                valueLabelDisplay='auto'
                min={0}
                max={50000}
                step={100}
                sx={{
                    color: 'grey', // changes the thumb and track color
                    '& .MuiSlider-thumb': {
                        backgroundColor: 'grey',
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: 'grey',
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: '#ccc',
                    }
                }}
            />


            <div>Rs {price[0]} - Rs {price[1]}</div>
        </div>
    );
}

export default PriceRange;