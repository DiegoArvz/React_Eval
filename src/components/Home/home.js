import React, {Component} from 'react'
import './home.css'
import Header from './Header/header'
import Catalogo from './Catalogo/catalogo'
import Prodlarge from './Catalogo/Productos/producto_large';
import Carritocompras from './Carrito/Compras/carrito_compras';
import axios from '../../axios-orders'
import Login from '../Login/Login'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

class home extends Component{

    state = {
        unprop: "este es un prop desde el home",
        carrito: [],
        counter: 0,
        products: {},
        total: 0
    }

    componentDidMount(){

        axios.get('/Products.json')
        .then(response => {
            this.setState({products:response.data})
        })
        .catch(error =>console.log(error))
    }

    deleteCarrito = ()=>{
        this.setState({
            carrito: [],
            counter: 0,
            products: {},
            total: 0
        })
    }

    addToCarrito = (product)=>{
        product.Precio = product.Precio * product.Cantidad;
        var temp_total = this.state.total + parseInt(product.Precio);
        this.setState({total: temp_total});
        var found = false;
        if(this.state.carrito.length > 0){
            for(var key in this.state.carrito){
                if(this.state.carrito[key].Nombre === product.Nombre){
                    this.state.carrito[key].Cantidad = 
                        parseInt(this.state.carrito[key].Cantidad)+
                        parseInt(product.Cantidad);
                    this.state.carrito[key].Precio = 
                        parseInt(this.state.carrito[key].Precio)+
                        (parseInt(product.Precio));
                    found = true;
                    break;
                }
            }
            if(!found){
                this.state.carrito.push(product);
            }
        }
        else{
            this.state.carrito.push(product);
        }
        
        this.setState({counter: this.state.carrito.length})
        alert("Se añadio: "+product.Cantidad+" "+product.Nombre+"(s)"+" al carrito");
    }

    render(){
        return(
            <div className="home-container">
                <Header carritocounter={this.state.counter} 
                        carrito={this.state.carrito}
                        currentUrl={this.props.match.url}
                        >
                </Header>
                <Switch>
                    <Route  exact path={this.props.match.url} 
                        render={(props)=><Catalogo {...props} 
                        products={this.state.products}
                        elprop={this.state.unprop} addToCarrito={this.addToCarrito}/>} 
                    />
                    <Route  exact path={this.props.match.url+'/products/:id'} component={Prodlarge}/>
                    <Route  exact path={this.props.match.url+'/carrito'}
                         render={(props)=><Carritocompras  {...props}
                         currentUrl={this.props.match.url}
                         carrito={this.state.carrito}
                         total={this.state.total}
                         deleteCarrito={this.deleteCarrito}
                         />} />
                </Switch>
               
               { /*<Catalogo></Catalogo>*/}
            </div>
        );
    }
}

export default home;