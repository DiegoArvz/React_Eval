import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import './Header.css'
class header extends Component{
    state = {
        counter_carrito : this.props.carrito,
        clicked: false
    }

    InCarrito(){
        this.setState({clicked: true})
    }
    
    render(){
        let carrito_number;
     
            if(this.props.carritocounter > 0){
            carrito_number = <span className="cart-counter">{this.props.carritocounter}</span>;
            }
        
        return(
            <div className="container-fluid header-div">
            
                <nav className="navbar">
                    <div class="navbar-header">
                        <h1 >La Bodega</h1>
                    </div>
                    <ul className="nav nav-tabs navbar-nav navbar-right">
                        <li><Link to={this.props.currentUrl}><span class="glyphicon glyphicon-th"></span></Link></li>
                        <li ><Link to={this.props.currentUrl+'/carrito'} ><span class="glyphicon glyphicon-shopping-cart"></span> {carrito_number}</Link></li>
                        <li><a><span class="glyphicon glyphicon-inbox"></span></a></li>
                        <li><a><span class="glyphicon glyphicon-log-out"></span></a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default header;