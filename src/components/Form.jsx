import React from 'react';

import Styles from './styles.css'

const Form = props => {
    return(
        <div className={Styles.container}>
            <div className= {Styles.background}>
            <div>{props.error ? error(): null}</div>
                <form onSubmit={props.loadweather}>
                    <div className="row pt-4">
                        <div className="col-md-3 offset-md-2">
                            <input 
                            type="form" 
                            className="form-control" 
                            name="city"
                            autoComplete="off"
                            placeholder="city"
                            />
                        </div>
                        <div className="col-md-3">
                        <input 
                        type="form" 
                        className="form-control" 
                        name="country"
                        placeholder="country"
                        />
                        </div>
                        <div className="col-md-3 mt-md-0 text-md-left">
                            <button className="btn btn-primary">Check the Weather</button>
                        </div>
                    </div>
                </form>
        </div>
        </div>
    );
};

function error() {
    return(
        <div className="alert alert-danger mx-4">
            Please enter a valid city and country <br/> Thank You
        </div>
    );
}

export default Form;
