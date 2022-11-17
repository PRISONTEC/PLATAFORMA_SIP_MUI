import React from 'react';
import fetchData from '../../share/fetchData';
import TablaReact from '../TablaMui';
import RadioGroup from '../RadioGroup';
import LoadingPage from '../Loading';
import  "../../assets/css/Calendario.css";
import FiltrarDatos from './Filtros';
import Buscador from '../Buscardor';
import {Grid} from '@material-ui/core';
import Box from '@mui/material/Box';

export default class ConsultarTransacciones extends React.Component { 
    
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            ip:"172.16.100.109",
            numeroCelular : null,
            idInterno : null,
            datos: null,
            mostrarTabla:null,
            openFilter:false,
            llamadas:[],
            recargas:[],
            fechaCalendarioInicio:null,
            fechaCalendarioFinal:null,
            actualizarFechaEnElComponenteHijo:true,
            fechaCalendarioSecundarioInicio:null,
            fechaCalendarioSecundarioFinal:null,
            columnasLlamadas:[                                                 
                  {
                    width: 400,
                    label: 'INTERNO',
                    dataKey: 'idInterno',
                  },
                  {
                    width: 450,
                    label: 'DESTINO',
                    dataKey: 'numeroCelular',
                  },
                  {
                    width: 350,
                    label: 'FECHA',
                    dataKey: 'fechaHora',
                  },
                  {
                    width: 350,
                    label: 'INICIO',
                    dataKey: 'fechaHoraInicio',
                  },
                  {
                    width: 350,
                    label: 'FIN',
                    dataKey: 'fechaHoraFin',
                  },

            ],
            columnasRecargas:[                                                 
                {
                    width: 400,
                    label: 'INTERNO',
                    dataKey: 'idInterno',
                  },
                  {
                    width: 450,
                    label: 'CELULAR',
                    dataKey: 'numeroCelular',
                  },
                  {
                    width: 350,
                    label: 'FECHA',
                    dataKey: 'fechaHora',
                  },
                  {
                    width: 250,
                    label: 'METODO',
                    dataKey: 'metodo',
                  },
                  {
                    width: 300,
                    label: 'MONTO',
                    dataKey: 'monto',
                  },
            ]
        }
        console.log("props: ",props.buscarPor," state: ",this.state.mostrarBusquedaPor);
        this.obtenerTransaccionPorCelular = this.obtenerTransaccionPorCelular.bind(this)
        this.obtenerTransaccionPorInterno = this.obtenerTransaccionPorInterno.bind(this)
        this.cargarDatosDeInterno = this.cargarDatosDeInterno.bind(this)
        this.cargarDatosNumeroCelular = this.cargarDatosNumeroCelular.bind(this)
        this.recuperarIdInterno = this.recuperarIdInterno.bind(this)
        this.recuperarNumeroCelular = this.recuperarNumeroCelular.bind(this)
        this.separarRecargasDeLlamadas = this.separarRecargasDeLlamadas.bind(this)
        this.recuperarRadioGroupSeleccionado = this.recuperarRadioGroupSeleccionado.bind(this)
        this.recuperarFechaCalendarioInicio=this.recuperarFechaCalendarioInicio.bind(this)
        this.recuperarFechaCalendarioFinal=this.recuperarFechaCalendarioFinal.bind(this)
        this.filtrarDatosPorFechaSeleccionada=this.filtrarDatosPorFechaSeleccionada.bind(this)
        this.botonAplicarFiltro=this.botonAplicarFiltro.bind(this)
    }
    // con este callback se actuliza la variable desde el hijo "Buscador"
    recuperarIdInterno(callback){
        this.setState({
            idInterno : callback
            });
    }
    // con este callback se actuliza la variable desde el hijo "Buscador"
    recuperarNumeroCelular(callback){
        this.setState({
            numeroCelular : callback
        });
    }
    // con este callback se actuliza la variable desde el hijo "RadioGroup"
    recuperarRadioGroupSeleccionado(callback){
        this.setState({mostrarTabla : callback});
    }

    recuperarFechaCalendarioInicio(callback){
        if(callback!==null){
        var fecha_formateada=callback.substr(0,10)
        this.setState({
            fechaCalendarioInicio:fecha_formateada,
            fechaCalendarioSecundarioInicio:fecha_formateada
        })}else{
            this.setState({
                fechaCalendarioInicio:null,
                fechaCalendarioSecundarioInicio:null
            })
        }
    }

    recuperarFechaCalendarioFinal(callback){
        if(callback!==null){
        var fecha_formateada=callback.substr(0,10)      
        this.setState({
            fechaCalendarioFinal:fecha_formateada,
            fechaCalendarioSecundarioFinal:fecha_formateada
        })}else{
            this.setState({
                fechaCalendarioFinal:null,
                fechaCalendarioSecundarioFinal:null
            })
        }
    }

    // para actulizar la fecha desde aqui hacia los hijos
    // para controlar que solo lo haga una vez y no en bucle infinito(true o false)
    funcionActualizarFecha(callback){
        this.setState({
            actualizarFecha : callback
        });
    }

    cargarDatosDeInterno(){
        this.setState({
            loaded : false,            
            actualizarFechaEnElComponenteHijo: true,
            fechaCalendarioInicio: null,
            fechaCalendarioFinal: null
        });
        this.obtenerTransaccionPorInterno((data) => {
            this.setState({
                datos: data,
            })
            this.filtrarDatosPorFechaSeleccionada(data.items)
        })                     
    }

    cargarDatosNumeroCelular(){
        this.setState({
            loaded : false,
            actualizarFechaEnElComponenteHijo: true,
            fechaCalendarioInicio: null,
            fechaCalendarioFinal: null
        });
        this.obtenerTransaccionPorCelular((data) => { 
            this.setState({
                datos: data,                
            })
            this.filtrarDatosPorFechaSeleccionada(data.items)
        })                     
    }

    botonAplicarFiltro(){
        this.setState({openFilter:false});
        this.filtrarDatosPorFechaSeleccionada(this.state.datos.items);        
    }

    filtrarDatosPorFechaSeleccionada(datosParaFiltar){
        var CaleSecInicio=Date.parse(this.state.fechaCalendarioInicio);
        var CaleSecFin=Date.parse(this.state.fechaCalendarioFinal);
        //hoy = ((new Date()).toISOString()).split("T")[0]
        var menorFechaInicioDeConsultaDeBdd=Date.parse("3970-01-01");
        var mayorFechaInicioDeConsultaDeBdd=Date.parse("1970-01-01");
        var datosPorFecha=[];
        datosParaFiltar.forEach((dato)=>{
            var fechaInterna=Date.parse(dato.fechaHora)
            //obtener la mayor fecha de la consulta
            if(fechaInterna > mayorFechaInicioDeConsultaDeBdd){
                mayorFechaInicioDeConsultaDeBdd=fechaInterna;
            }
            //obtener la menor fecha de la consulta
            if(fechaInterna < menorFechaInicioDeConsultaDeBdd){
                menorFechaInicioDeConsultaDeBdd=fechaInterna;
            }
            //aplicando filtro de fechas, lo de arriba es otra cosa
            if(CaleSecInicio<=fechaInterna && fechaInterna<=CaleSecFin)
                {
                    datosPorFecha.push(dato)  
            } else if(CaleSecFin<=fechaInterna && fechaInterna<=CaleSecInicio)
                {
                    datosPorFecha.push(dato)
            } else if(CaleSecInicio===fechaInterna && isNaN(CaleSecFin))
                {
                    datosPorFecha.push(dato)
            } else if(CaleSecFin===fechaInterna && isNaN(CaleSecInicio))
                {
                    datosPorFecha.push(dato) 
            } else if (isNaN(CaleSecFin) && isNaN(CaleSecInicio)){
                    datosPorFecha.push(dato)
            }
        })
        if(this.state.actualizarFechaEnElComponenteHijo){
            this.setState({
                fechaCalendarioInicio:(new Date(menorFechaInicioDeConsultaDeBdd)).toISOString(),
                fechaCalendarioFinal:(new Date(mayorFechaInicioDeConsultaDeBdd)).toISOString(),
                actualizarFechaEnElComponenteHijo:false
            });
        }
        this.separarRecargasDeLlamadas(datosPorFecha);                    
    }

    separarRecargasDeLlamadas(datos){
        var recargas = [];
        var llamadas = [];
        datos.forEach((dato)=>{
            if (dato.duracion){
                llamadas.push(dato)
            }
            if (dato.monto){
                recargas.push(dato)
            }
        })
        this.setState({
            recargas:recargas,
            llamadas:llamadas,  
            filtrarPorInterno:null,
            filtrarPorDestino:null, 
            filtrarDatosPorFechaSeleccionada:null,        
            loaded: true,
        });

    }

    obtenerTransaccionPorCelular(callback) {
        console.log("obtenerTransaccionPorCelular: ",this.state.numeroCelular);
        fetchData.getData("http://"+this.state.ip +":2500",
            "/SIP/byKeyCelular?numeroCelular="+ this.state.numeroCelular,
            callback
        )
    }

    obtenerTransaccionPorInterno(callback) {
        console.log("idInterno: ",this.state.idInterno)
        fetchData.getData("http://"+this.state.ip +":2500",
            "/SIP/byKeyInterno?idInterno=" + this.state.idInterno,
            callback
        )
    }
    render() {      
        if (this.state.loaded === true) {
            return (
                <>
                    <Box sx={{mt:2}}>
                        <Box sx={{mt:2}}>
                            <Grid container  justifyContent="flex-end" alignItems="center">
                                {
                                    this.props.buscarPor==="interno" &&
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Buscador nombreLabel="Interno"
                                                nombreBoton="Buscar" 
                                                nameLabel={"por identificación de interno"}
                                                valueIdInterno={this.state.idInterno}
                                                recuperarIdInterno={this.recuperarIdInterno}
                                                buscar={this.cargarDatosDeInterno}/>
                                    </Grid>
                                }
                                {
                                    this.props.buscarPor==="celular" &&
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Buscador nombreLabel="Celular"
                                            nombreBoton="Buscar" 
                                            nameLabel={"por número celular"}
                                            valueIdInterno={this.state.idInterno}
                                            recuperarIdInterno={this.recuperarNumeroCelular}
                                            buscar={this.cargarDatosNumeroCelular}/>
                                    </Grid>
                                }
                                <Grid item xs={12} sm={6} md={6}>
                                <RadioGroup                         
                                    lista={["llamadas","recargas"]}
                                    iniciarConItem={this.state.mostrarTabla} 
                                    itemSeleccionado={this.recuperarRadioGroupSeleccionado}
                                    />
                                </Grid>

                            </Grid>
                        </Box>
                        <FiltrarDatos 
                            buscar={this.botonAplicarFiltro}
                            valueIdInterno={this.state.idInterno}
                            recuperarFechaCalendarioInicio={this.recuperarFechaCalendarioInicio} 
                            fechaCalendarioSecundarioInicio={this.state.fechaCalendarioInicio}
                            tituloCalendarioInicio={"Fecha Inicio"}
                            recuperarFechaCalendarioFinal={this.recuperarFechaCalendarioFinal} 
                            fechaCalendarioSecundarioFinal={this.state.fechaCalendarioFinal}
                            tituloCalendarioFinal={"Fecha Final"}
                        />
                        <Box>                        
                        <Grid item xs={12}>
                            {this.state.mostrarTabla==="recargas" &&
                                <TablaReact columnas={this.state.columnasRecargas} datos={this.state.recargas}/>}
                            {this.state.mostrarTabla==="llamadas" &&
                                <TablaReact columnas={this.state.columnasLlamadas} datos={this.state.llamadas}/>}
                        </Grid>
                        </Box>
                    </Box> 
                </>
            );
    } else {
        // Loading...
        return < LoadingPage />
    }
      
    }
  }


