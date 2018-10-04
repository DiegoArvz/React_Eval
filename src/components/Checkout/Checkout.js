import React, { Component } from 'react';
import CheckoutSummary from '../Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    render(){
        return(
            <div>
                <CheckoutSummary></CheckoutSummary>
            </div>
        )
    }
}

export default Checkout;