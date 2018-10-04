import React, {Component} from 'react';
import axios from '../../../../axios-orders'
import './producto_large.css'
class productslarge extends Component{

    state = {
        loadedProduct : null
    }

    componentDidMount () {
        console.log("Component Did Mount: ");
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate(){

    }

    loadData () {
     
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedProduct || (this.state.loadedProduct && this.state.loadedProduct.Archivo !== +this.props.match.params.id) ) {
                axios.get( '/Products/' + this.props.match.params.id +".json")
                    .then( response => {
                        console.log("Axios Response ");

                         console.log(response);
                        this.setState( { loadedProduct: response.data } );
                    } );
            }
        }

        
    }

    toHome = ()=>{
        this.props.history.push({pathname: '/home'})
    }

    //class based would be this.props
    render(){
       
        let product = <p>Loading</p>
        if(this.props.match.params.id){
            product = <p>Getting data</p>
        }
        if(this.state.loadedProduct){
            product = (
                <div className="container-fluid ">
                    <div className="row product-container">
                        <div className="col-md-6">
                             <img className="img-thumbnail" src={"/images/"+this.state.loadedProduct.Archivo} />
                        </div>
                        <div className="col-md-6">
                            <h4>{this.props.match.params.id}</h4>
                            <p>Precio: ${this.state.loadedProduct.Precio}</p>
                            <p>Unidades Disponibles: {this.state.loadedProduct.Cantidad} </p>
                            <button className="btn btn-primary" onClick={this.toHome}>Atrás</button>
                        </div>
                    </div>
                    
                    
                </div>
            );
        }
        return product;
    }

    
    
};

export default productslarge;