import React, {Component} from 'react';
import './producto_small.css'
class productsmall extends Component{
    //class based would be this.props
    state = {
        counter: 1
    }

    handleChange = (event)=>{
        this.setState({counter : event.target.value});
   }

   addToCarrito = (event) =>{
      
        let product =  {Nombre:this.props.nombre, Cantidad: this.state.counter, Precio: this.props.precio}
        this.props.addToCarrito(product);
    }
    render(){
        return(
            <div className="col-md-4 product-small-container">
                <img className="img-responsive img-thumbnail" src={"/images/"+this.props.archivo} />
                <h4>{this.props.nombre}</h4>
                <p>Precio: ${this.props.precio}</p>
                <p>Unidades Disponibles: {this.props.unidad}</p>
                <button className="btn btn-primary" onClick={this.props.clicked}>Ver Más</button>
                <form>
                    <label for="input-number"></label>
                    <input type="number" name="input-number" placeholder="1" onChange={this.handleChange}/>
                </form>
                <button className="btn btn-secondary" onClick={this.addToCarrito}>Añadir
                    </button>
                
           </div>
        )
    }
};

export default productsmall;