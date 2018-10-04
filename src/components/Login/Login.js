import React, {Component} from 'react';
import axios from '../../axios-orders'
import './Login.css';

class Login extends Component{
    state = {
        user: "",
        password: "",
        logged: false,
        error_message : false
    }

    toHome = ()=>{
        this.props.history.push({pathname: '/home'})
    }

    loginRequest = (event)=>{
        console.log("log in request")
        event.preventDefault();
        if(this.state.user==="" && this.state.password===""){
            alert("Ingrese los datos para iniciar sesión");
            return;
        }
        if(this.state.user ===""){
            alert("Ingrese el usuario");
            return;
        }
        if(this.state.password ===""){
            alert("Ingrese la contraseña");
            return;
        }

        axios.get('/Users.json')
        .then(response => {
            let users = response.data;
            for(let i=0; i < users.length; i++){
              if  (users[i].User === this.state.user && users[i].Password === this.state.password){
                    this.setState({
                        logged: true
                    })
                    break;
                }
            }
            if(this.state.logged){
                console.log("Logged in!");
                alert("Welcome "+ this.state.user);
                this.toHome();
            }
            else{
                this.setState({error_message :true})
             
                console.log(this.state.error_message);
            }
        })
        .catch(error => console.log(error))
    }

    handleChange = (event)=>{
        this.setState({user: event.target.value})
    }

    handlePassChange = (event) =>{
        this.setState({password: event.target.value})
    }

    render(){
        let error_message = this.state.error_message ?  <h3 className="error-message">Error al iniciar sesión</h3>: <h3></h3>
        return(
            <div className=" login-container">
                <div className="row">
                <form className="login-form">
                    <h1 className="login-title">Iniciar sesión</h1>
                    <div className="form-group">
                     <label  for="user">Correo Electrónico</label>
                     <input type="email" className="form-control" name="user"  onChange={this.handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" className="form-control" name="password" onChange={this.handlePassChange} required/>
                        {error_message}
                        <button className="btn btn-primary btn-login-form" onClick={this.loginRequest}>Ingresar</button>
                        
                    </div>
                    
                </form>
                <h1>{this.user}</h1>
                <h1>{this.password}</h1>
                </div>
            </div>
        ); 
    }
        
};

export default Login;