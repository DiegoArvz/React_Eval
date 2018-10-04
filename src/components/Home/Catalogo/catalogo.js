import React, {Component} from 'react';
import Prodsmall from './Productos/producto_small';
import axios from '../../../axios-orders'
import './catalogo.css'

class catalogo extends Component{
    
    state = {
        search : "",
        productSelected: "",
        productos: [
            {
                nombre: 'Manzana',
                precio: 35, 
                unidad:46,
                archivo: 'manzana.jpg'
            },
            {
                nombre: 'Aguacate',
                precio: 35, 
                unidad:46,
                archivo: 'aguacate.jpg'
            }
        ]
    }

    componentDidMount () {
        let productsObj = null;
        axios.get('/Products.json')
        .then(response => {
            productsObj = response.data;
            let arrayOfProducts = [];
            for(var key in productsObj){
                let currentProduct = {
                    nombre: key,
                    precio: productsObj[key].Precio,
                    unidad: productsObj[key].Cantidad,
                    archivo: productsObj[key].Archivo
                };
                arrayOfProducts.push(currentProduct);
            }
            this.setState({productos:arrayOfProducts}) 
        })
    }

    handleChange = (event)=>{
         this.setState({search : event.target.value.toLowerCase()});
    }

    productSelectHandler =(productId)=>{
      //  this.setState({productSelected:productId})
        this.props.history.push({pathname: this.props.match.url+'/products/'+productId})
    }

    addToCarrito = (e)=>{
        this.props.addToCarrito(e);
    }

    render(){

        let productos = null;
        productos = (
            <div className="row">
                {this.state.productos.map(
                    (producto, index)=>{
                        if(producto.nombre.toLowerCase().includes(this.state.search) || this.state.search === "" ){
                            return <Prodsmall 
                                archivo={producto.archivo}
                                nombre={producto.nombre}
                                precio={producto.precio}
                                unidad={producto.unidad}
                                addToCarrito = {this.addToCarrito}
                                clicked ={()=> this.productSelectHandler(producto.nombre)}
                            />
                        }
                    })

                }
            </div>
        );
        return(
            <div className="container-fluid catalog-container">
                <div className="row">
                    <h1 className="search-title"> Catálogo de productos</h1>
                    <div>
                        <label for="buscador">¿Qué estás buscando?</label>
                        <input type="text" name="buscador" onChange={this.handleChange}/>
                    </div>
                </div>

                <div className="product-catalog">
                    {productos}
                </div>
               
            </div>
        );
    }
}

export default catalogo;