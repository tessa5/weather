import React from 'react';

const Weather = (props) => {
    return(
        <div className="container">
            <div className="cont">
                <h1>{props.city}</h1>
                <h4 className="py-5">
                    <div className="bb">
                    <i className={`wi ${props.weatherIcon} display-1`}/>
                    </div>
                </h4>
                {props.temp_fahrenheit ? (<h2 className="py-2">{props.temp_fahrenheit}&deg;</h2>): null}

                {minmaxTemp(props.temp_min, props.temp_max)}

    <h4 className="py-3">{props.description}</h4>
            </div>
        </div>
    );
};

function minmaxTemp(min,max) {
    if(min && max){
    return(
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
    );
    }
}

export default Weather;