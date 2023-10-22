import React from 'react';
import countryCodeData from '../ccTLD.json';

export default function LocationForm(props) {

    const [locationInfo, setLocationInfo] = React.useState({
        zip: 10001,
        countryCode: 'us'
    });

    const { errorMessage } = props;

    return (
        <div className="zipcode-form-wrapper">
            <form onSubmit={(e) => props.handleSubmit(e, locationInfo)} className="zip-form">
                <div className="form-group">
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
                <div className="form-group">
                    <select defaultValue={locationInfo.countryCode}>
                        {countryCodeData.map(option => (
                            <option key={option.tld+option.country} 
                                value={option.tld} 
                                onChange={e => setLocationInfo({ ...locationInfo, countryCode: option.tld})}
                                >
                                {option.country}
                            </option>
                        ))}
                    </select>
                </div>
            </form >
            {errorMessage.length > 0 &&
                <p className="error-message" role="alert">
                    {errorMessage}
                </p> 
            }
        </div>
    );
};