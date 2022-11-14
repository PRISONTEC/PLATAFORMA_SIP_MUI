import React from 'react';
import fetchData from '../../share/fetchData';
import TablaReact from '../TablaMui';
import RadioGroup from '../RadioGroup';
import LoadingPage from '../Loading';
import Calendario from '../Calendario';
import  "../../assets/css/Calendario.css";
import FiltrarDatos from './Filtros';
import Buscador from '../Buscardor';
import {Grid} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
            filtrarPorInterno:null,
            filtrarPorDestino:null,
            fechaCalendarioSecundarioInicio:null,
            fechaCalendarioSecundarioFinal:null,
            columnasLlamadas:[                                                 
                {
                    width: 400,
                    label: 'CODIGO',
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
                    label: 'CODIGO',
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
        this.recuperarIdInternoFiltro=this.recuperarIdInternoFiltro.bind(this)
        this.recuperarDestinoFiltro=this.recuperarDestinoFiltro.bind(this)
        this.aplicandoFiltroPorInterno=this.aplicandoFiltroPorInterno.bind(this)
        this.aplicandoFiltroPorDestino=this.aplicandoFiltroPorDestino.bind(this)
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

    recuperarIdInternoFiltro(callback){
        this.setState({
            filtrarPorInterno : callback
        });
    }

    recuperarDestinoFiltro(callback){
        this.setState({
            filtrarPorDestino : callback
        });
    }

    cargarDatosDeInterno(){
        this.setState({loaded : false});
        this.obtenerTransaccionPorInterno((data) => {
            this.setState({
                datos: data
            })
            this.aplicandoFiltroPorInterno(data.items)
        })                     
    }

    cargarDatosNumeroCelular(){
        this.setState({loaded : false});
        this.obtenerTransaccionPorCelular((data) => { 
            this.setState({
                datos: data
            })
            this.aplicandoFiltroPorInterno(data.items)
        })                     
    }

    botonAplicarFiltro(){
        this.setState({openFilter:false});
        this.aplicandoFiltroPorInterno(this.state.datos.items);        
    }

    aplicandoFiltroPorInterno(datos){
        var datosFiltrados=[]; 
        if (this.state.filtrarPorInterno){
            datosFiltrados = datos.filter(dato => dato.idInterno===this.state.filtrarPorInterno);
            this.aplicandoFiltroPorDestino(datosFiltrados);
        } else {
            this.aplicandoFiltroPorDestino(datos);
        }        
    }

    aplicandoFiltroPorDestino(datos){
        var datosFiltrados=[]; 
        if (this.state.filtrarPorDestino){
            datosFiltrados = datos.filter(dato => dato.numeroCelular===this.state.filtrarPorDestino);
            this.filtrarDatosPorFechaSeleccionada(datosFiltrados);
        } else {
            this.filtrarDatosPorFechaSeleccionada(datos);
        }        
    }

    filtrarDatosPorFechaSeleccionada(datosParaFiltar){
        var CaleSecInicio=Date.parse(this.state.fechaCalendarioInicio);
        var CaleSecFin=Date.parse(this.state.fechaCalendarioFinal);
        var datosPorFecha=[];
        datosParaFiltar.forEach((dato)=>{
                var fechaInterna=Date.parse(dato.fechaHora.substr(0,10))
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
                    <div>
                            <Grid container  justifyContent="flex-end" alignItems="center">
                                <Grid item xs={12} sm={6} md={4}>
                                <Buscador nombreLabel="Interno"
                                        nombreBoton="Buscar" 
                                        nameLabel={"idInterno"}
                                        valueIdInterno={this.state.idInterno}
                                        recuperarIdInterno={this.recuperarIdInterno}
                                        buscar={this.cargarDatosDeInterno}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                <Buscador nombreLabel="Celular"
                                    nombreBoton="Buscar" 
                                    nameLabel={"cel-destino"}
                                    valueIdInterno={this.state.idInterno}
                                    recuperarIdInterno={this.recuperarNumeroCelular}
                                    buscar={this.cargarDatosNumeroCelular}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                <RadioGroup                         
                                    lista={["llamadas","recargas"]}
                                    iniciarConItem={this.state.mostrarTabla} 
                                    itemSeleccionado={this.recuperarRadioGroupSeleccionado}
                                    />
                                </Grid>

                            </Grid>
                            <Grid container>                            
                            <Grid item xs={12}>
                            <IconButton aria-label="expand row" 
                                size="small" 
                                onClick={() => this.setState({openFilter:!this.state.openFilter})} >
                                {this.state.openFilter ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                Click para aplicar filtros
                            </IconButton>                            
                            </Grid>
                            </Grid>
                            {this.state.openFilter && <FiltrarDatos 
                                buscar={this.botonAplicarFiltro}
                                valueIdInterno={this.state.idInterno}
                                recuperarIdInternoFiltro={this.recuperarIdInternoFiltro}
                                recuperarDestinoFiltro={this.recuperarDestinoFiltro}
                                >
                                <p id="parrafo">Fecha Inicio</p>
                                <Calendario recuperarFechaCalendario={this.recuperarFechaCalendarioInicio} fechaCalendarioSecundario={this.state.fechaCalendarioSecundarioInicio} ></Calendario>                     
                                <p id="parrafo">Fecha Final</p>
                                <Calendario recuperarFechaCalendario={this.recuperarFechaCalendarioFinal}  fechaCalendarioSecundario={this.state.fechaCalendarioSecundarioFinal}></Calendario> 
                            </FiltrarDatos>}
                        
                            <Grid item xs={12}>
                                {this.state.mostrarTabla==="recargas" &&
                                    <TablaReact columnas={this.state.columnasRecargas} datos={this.state.recargas}/>}
                                {this.state.mostrarTabla==="llamadas" &&
                                    <TablaReact columnas={this.state.columnasLlamadas} datos={this.state.llamadas}/>}
                            </Grid>
                    </div> 
                </>
            );
    } else {
        // Loading...
        return < LoadingPage />
    }
      
    }
  }


