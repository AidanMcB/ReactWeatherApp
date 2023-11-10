import React from 'react';
import countryCodeData from '../ccTLD.json';

export default function TopBar(props) {

    const { handleSubmit, closeFormOnSuccess } = props;

    const [isFormActive, setFormActive] = React.useState(false);
    const [locationInfo, setLocationInfo] = React.useState({
        zip: 0,
        countryCode: 'us'
    });

    React.useEffect(() => {
        if (closeFormOnSuccess) {
            setFormActive(false);
        }
    }, [closeFormOnSuccess])

    return(
        <div className={"top-bar" + (isFormActive ? " showing" : " hidden" )}>

            <form onSubmit={(e) => handleSubmit(e, locationInfo)} className="zip-form">
                <div className="zip-form--content">
                    <div className="form-group country-group">
                        <select defaultValue={locationInfo.countryCode}
                            onChange={(e) => setLocationInfo({ ...locationInfo, countryCode: e.target.value})}>
                            {countryCodeData.map(option => (
                                <option key={option.tld+option.country} 
                                    value={option.tld} 
                                    >
                                    {option.country}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group zip-group">
                        <input onChange={(e) => setLocationInfo({ ...locationInfo, zip: e.target.value})} 
                            name="zipcode"
                            className="zipcode-input"
                            id="zipcode-input" 
                            type="number"
                            placeholder="Enter your zip code"/>
                        <button type="submit" className="submit-btn">
                            Enter
                        </button>
                    </div>
                </div>
            </form >

            <button className="search-button" onClick={() => setFormActive(prevState => !prevState)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
            </button>

        </div>
    );
};