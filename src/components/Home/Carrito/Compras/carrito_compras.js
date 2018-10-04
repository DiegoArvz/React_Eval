import React, {Component} from 'react';
import Prodcompra from './prod_compra';
import axios from '../../../../axios-orders'
import './carrito_compras.css'
class carritocompras extends Component{
    //class based would be this.props

    constructor(props){
        super(props);
        this.state = {
            productsCarrito: [],
            total: 0,
            responses: 0
        }
        this.pagar = this.pagar.bind(this);
        this.toHome = this.toHome.bind(this);
    }

    state = {
        productsCarrito: [],
        total: 0,
        responses: 0
    }

    componentDidMount(){

        this.setState({productsCarrito: [...this.props.carrito]})

        this.setState({total: this.props.total});
    }

    componentDidUpdate(){

    }

    toHome = ()=>{
        this.props.history.push({pathname: this.props.currentUrl})
    }

    pagar(){
        var products;
        console.log(this.state.productsCarrito);
        axios.get( '/Products.json')
        .then(response => {
            products = response.data
            var difference = [];
            for(var key in products){
                var prod = products[key];
                for(var key_nd in this.state.productsCarrito){
                    if(prod.Nombre === this.state.productsCarrito[key_nd].Nombre){
                        var database_items = prod.Cantidad;
                        var carrito_items = this.state.productsCarrito[key_nd].Cantidad;
                        var difference_cantidad = database_items - carrito_items;
                        var prod_object = {
                            Nombre: prod.Nombre,
                            Cantidad: difference_cantidad,
                            Precio: prod.Precio,
                            Archivo: prod.Nombre.toLowerCase()+".jpg"
                        }
                        difference.push(prod_object);
                        break;
                    }
                }
                
            }
            for(var key in difference){
                
                axios.put('/Products/'+difference[key].Nombre+'.json',{
                    Nombre: difference[key].Nombre,
                    Cantidad: difference[key].Cantidad,
                    Precio: difference[key].Precio,
                    Archivo: difference[key].Archivo
                })
                .then(response=>{
                        console.log(response);
                        var current_responses = this.state.responses;
                        current_responses++;
                        this.setState({responses: current_responses})
                        if(this.state.responses === this.state.productsCarrito.length){
                            alert("Gracias por su compra");
                            this.props.deleteCarrito();
                            this.toHome();
                        }
                    })
                .catch(error=>{console.log(error)})
            }
        })
        
        
        console.log(products);


        
    }


    render(){
        let compras = null;
        if(this.state.productsCarrito.length > 0){
            compras = (
                <div className="col-md-6" >
                    {   
                        this.state.productsCarrito.map(
                        (producto, index)=>{
                                return <Prodcompra
                                    Nombre = {producto.Nombre}
                                    Cantidad = {producto.Cantidad}
                                    Precio = {producto.Precio}
                                />     
                        })
                    }
                </div>
            );
        }else{
            compras = (
                <div>
                    El carrito está vacío.
                </div>
            )
        }
        
        return(
            <div className="container-fluid container-carrito">
                <h1>Carrito de compras</h1>
                <div className="row">
                     {compras}
                     <div className="col-md-6">
                        <h3>Total: ${this.state.total}</h3>
                        <button className="btn btn-secondary" onClick={this.toHome}>Cancelar</button>
                        <button className="btn btn-primary" onClick={this.pagar}>Pagar</button>
                     </div>
                </div>
                {/*<Prodcompra Nombre={"hola"} Cantidad={2} Precio={15}/>*/}
                
            </div>
        );
    }
}

export default carritocompras;
