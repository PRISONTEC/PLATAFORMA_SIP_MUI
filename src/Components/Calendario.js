import React,{Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Calendario extends Component {
    constructor(props){
        super(props);
    if(String(this.props.fechaCalendarioSecundario)!=="null"){
        var fechaQueSeVisualiza=new Date(Date.parse(String(this.props.fechaCalendarioSecundario)))
        fechaQueSeVisualiza.setMinutes(fechaQueSeVisualiza.getMinutes() + fechaQueSeVisualiza.getTimezoneOffset())
        this.state={
        fecha:fechaQueSeVisualiza
    }
    }else{
        this.state={
            fecha:null
        }
    }
}

    onChange=(fecha)=>{     
        if(String(fecha)!=="null" ){
            this.props.recuperarFechaCalendario(fecha.toISOString());
            this.setState({
                fecha:fecha
            })
        }else{
            this.props.recuperarFechaCalendario(null);
            this.setState({
                fecha:null
            })
        }      
    }

    render(){
        return(
            <>
            <div className="contenedor">
                <div className="center">
                    <DatePicker selected={this.state.fecha} onChange={this.onChange}></DatePicker>
                </div>
            </div>
            </>
            )
    }
}
