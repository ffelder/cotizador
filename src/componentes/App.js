import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';
import Resumen from './Resumen';
import Resultado from './Resultado'

class App extends Component {

  state = {
    resultado:'',
    datos:{}
  }

  cotizarSeguro=(datos)=>{
    console.log(datos);
    const {marca, plan ,year} = datos;
    //Agregar una base de 2000,
    let resultado =2000;
    //Obtener la diferencia de anos 
    const diferencia=obtenerDiferenciaAnio(year);


    //y por cada ano restar 3% al valor del seguro

    resultado-=((diferencia*3)*resultado)/100;

    // Americano 15% Asiatico 5% Europep 30% incremento al valor actual

    resultado=calcularMarca(marca)*resultado;
    //plan basico incrementa valor 20% y el completo 50%
    let incrementoPlan=obtenerPlan(plan);
    //dependiendo del plan incrementar
    resultado =parseFloat(incrementoPlan *resultado).toFixed(2);
     //crear objeto para el resumen
     const datosAuto={
      marca:marca,
      plan:plan,
      year:year
     }

    //ya tenemos el costo

    this.setState({
      resultado:resultado,
      datos:datosAuto
    })

  }

  render() {
    return (
      <div className="contenedor">
      <Header
       titulo='Cotizador de Seguro de Auto'
      />
        
      
      <div className="contenedor-formulario">
       <Formulario
          cotizarSeguro={this.cotizarSeguro}
       />
       <Resumen
       datos={this.state.datos}
       


       />
       <Resultado 
       resultado={this.state.resultado}
       />
      </div>
      </div>
    );
  }
}

export default App;
