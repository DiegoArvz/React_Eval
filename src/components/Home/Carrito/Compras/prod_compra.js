import React, {Component} from 'react';
import './prod_compra.css'

class prodcompra extends Component{
    //class based would be this.props

    render(){
        return(
            
           
                <div className="col-md-12">
                    <h1>{this.props.Nombre}</h1>
                    <div className="row">
                        <div className="col-md-4">
                        <img className="prod_compra_img img-thumbnail" src={"/images/"+this.props.Nombre.toLowerCase()+".jpg"} />
                        </div>
                        <div className="col-md-8">
                        <h3 className="prod_compra_h3">Subtotal: ${this.props.Precio}</h3>
                         <h3 className="prod_compra_h3">Unidades: {this.props.Cantidad}</h3> 
                        </div>
                    </div>
                    
                    
                </div>
        
        )
    }
};

export default prodcompra;