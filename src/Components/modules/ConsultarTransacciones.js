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
import Typography from "@mui/material/Typography";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default class ConsultarTransacciones extends React.Component { 
    
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            ip:"192.237.253.176",
            indiceTocadoEnTablaLlamadas:null,
            indiceTocadoEnTablaRecargas:null,
            cantRecargas:null,
            cantLlamadas:null,
            infoInternos:[],
            numeroCelular : "013119898",
            idInterno : "44252489",
            penal:{101:"CAÑETE",102:"HUARAL",103:"CALLAO",104:"ICA",105:"CHINCHA",106:"HUACHO",107:"ANCON 2",108:"CASTRO",109:"ANCON",
                110:"LURIGANCHO",111:"TRUJILLO",112:"CHIMBOTE",113:"HUARAZ",114:"CHICLAYO",115:"TUMBES",116:"AYACUCHO",117:"HUANCAYO",118:"HUANUCO",
                119:"CAJAMARCA",120:"CHANCHAMAYO",121:"CHORRILLOS",122:"CUSCO",123:"PUERTO MALDONADO",124:"TACNA",125:"PUNO",126:"JULIACA",127:"TARAPOTO",
                128:"MOYOBAMBA",129:"CHACHAPOYAS"},
            datos: null,
            mostrarTabla:"llamadas",
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
                    width: 200,
                    label: 'N°',
                    dataKey: 'index',
                  },                                            
                  {
                    width: 350,
                    label: 'INTERNO',
                    dataKey: 'idInterno',
                  },
                  {
                    width: 350,
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
                    label: 'DURACION',
                    dataKey: 'duracion',
                  },
                  
            ],
            columnasRecargas:[  
                  {
                    width: 250,
                    label: 'INDEX',
                    dataKey: 'index',
                  },                                               
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
        //console.log("props: ",props.buscarPor," state: ",this.state.mostrarBusquedaPor);
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
        this.recuperarIndiceTocadoEnTablaRecargas = this.recuperarIndiceTocadoEnTablaRecargas.bind(this)
        this.recuperarIndiceTocadoEnTablaLlamadas = this.recuperarIndiceTocadoEnTablaLlamadas.bind(this)
        this.insertarNombres = this.insertarNombres.bind(this)
        this.obtenerNombreDeInterno = this.obtenerNombreDeInterno.bind(this);
        this.secondsToString = this.secondsToString.bind(this);
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

    // obteniendo nombres de internos
    recuperarIndiceTocadoEnTablaRecargas(callback){
        console.log("indice transacciones: ",callback)
        this.setState({indiceTocadoEnTablaRecargas:callback});
        this.obtenerNombreDeInterno(callback,this.state.recargas)
    }

    recuperarIndiceTocadoEnTablaLlamadas(callback){
        console.log("indice transacciones: ",callback)
        this.setState({indiceTocadoEnTablaLlamadas:callback});
        this.obtenerNombreDeInterno(callback,this.state.llamadas)
    }

    obtenerNombreDeInterno(index,datos){
        datos.every((dato)=>{
            if(dato.index===index){
                this.obtenerTransaccionPorNombreInterno((info) => {
                    try{
                        console.log(String(info.items[0].nombres))
                        this.props.actualizarInfoInterno(String(info.items[0].nombres))
                        this.props.actualizarInfoPenal(String(this.state.penal[info.items[0].prefijoPenal]))                        
  
                    } catch(e) {
                        console.log(e)
                        this.props.actualizarInfoInterno("No se encontró coincidencia...")
                        this.props.actualizarInfoPenal(null)
                    }         
                },dato.idInterno)  
                         
                return false
            }
            return true;
        })
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
            fechaCalendarioFinal: null,
            idInterno:null
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
            fechaCalendarioFinal: null,
            numeroCelular: null
        });
        this.obtenerTransaccionPorCelular((data) => { 
            this.setState({
                datos: data,                
            })
            this.filtrarDatosPorFechaSeleccionada(data.items)
        })                     
    }

    insertarNombres(datos){
        var datosConNombres=[];
        datos.forEach((dato)=>{
            this.state.infoInternos.every((interno)=>{
                if(interno.idInterno===dato.idInterno){
                    dato.nombres = interno.nombres;
                    datosConNombres.push(dato);
                    return false;
                }
                return true;
            })
        })
    }

    botonAplicarFiltro(){
        this.setState({openFilter:false});
        this.filtrarDatosPorFechaSeleccionada(this.state.datos.items);        
    }

    secondsToString(seconds) {
        var hour = Math.floor(seconds / 3600);
        hour = (hour < 10)? '0' + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        var second = seconds % 60;
        second = (second < 10)? '0' + second : second;
        return hour + ':' + minute + ':' + second;
      }

    filtrarDatosPorFechaSeleccionada(datosParaFiltar){
        var CaleSecInicio=Date.parse(this.state.fechaCalendarioInicio);
        var CaleSecFin=Date.parse(this.state.fechaCalendarioFinal);
        //hoy = ((new Date()).toISOString()).split("T")[0]
        var menorFechaInicioDeConsultaDeBdd=Date.parse("3970-01-01");
        var mayorFechaInicioDeConsultaDeBdd=Date.parse("1970-01-01");
        var datosPorFecha=[];
        datosParaFiltar.forEach((dato)=>{            
            var fechaInterna=Date.parse(dato.fechaHora);
            try {
                var inicio=Date.parse(dato.fechaHoraInicio);
                var fin=Date.parse(dato.fechaHoraFin);
                if(isNaN(inicio) || isNaN(fin)){
                    dato.duracion = "00:00:00";
                    datosPorFecha.push(dato.duracion);
                } else {                    
                    dato.duracion = this.secondsToString((fin-inicio)/1000);
                    datosPorFecha.push(dato.duracion);
                }
            } catch {
                dato.duracion = "00:00:00";
                datosPorFecha.push(dato.duracion)
            }
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
                actualizarFechaEnElComponenteHijo:false,                
            });
        }
        this.separarRecargasDeLlamadas(datosPorFecha);                    
    }

    separarRecargasDeLlamadas(datos){
        var recargas = [];
        var llamadas = [];
        var indiceLlamadas= -1;
        var indiceRecargas= -1;
        datos.forEach((dato)=>{
            if (dato.duracion){
                indiceLlamadas=indiceLlamadas+1;
                dato.index=indiceLlamadas;
                llamadas.push(dato)
            }
            if (dato.monto){
                indiceRecargas=indiceRecargas+1;
                dato.index=indiceRecargas
                recargas.push(dato)
            }
        })
        console.log("cantidad de llamadas: ", indiceLlamadas);
        this.setState({
            recargas:recargas,
            llamadas:llamadas,
            cantLlamadas:indiceLlamadas===-1?null:indiceLlamadas,
            cantRecargas:indiceRecargas===-1?null:indiceRecargas,             
            filtrarPorInterno:null,
            filtrarPorDestino:null, 
            filtrarDatosPorFechaSeleccionada:null,        
            loaded: true,
        });

    }

    obtenerTransaccionPorNombreInterno(callback, idInterno) {
        console.log("idInterno: ", idInterno)
        fetchData.getData("http://"+this.state.ip +":2500",
            "/SIP/byKeyNombre?idInterno="+ idInterno,
            callback
        )
    }

    obtenerTransaccionPorCelular(callback) {
        fetchData.getData("http://"+this.state.ip +":2500",
            "/SIP/byKeyCelular?numeroCelular="+ this.state.numeroCelular,
            callback
        )
    }

    obtenerTransaccionPorInterno(callback) {
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
                            <Box sx={{m:2}}>
                                <Grid container direction="row" justifyContent="center" alignItems="center">
                                    <Grid item>
                                        <Typography variant='p1' fontFamily='sans-serif' color='#5798F6'>
                                            {this.props.buscarPor==="interno"? <p1> BUSQUEDA POR INTERNO</p1>:<p1></p1>}
                                            {this.props.buscarPor==="celular"? <p1> BUSQUEDA POR DESTINO</p1>:<p1></p1>}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Grid container  justifyContent="center" alignItems="center">
                                {
                                    this.props.buscarPor==="interno" &&
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Buscador nombreLabel="Interno"
                                                valorDefault={this.state.idInterno}
                                                nombreBoton="" 
                                                nameLabel={"ID Interno"}
                                                recuperarIdInterno={this.recuperarIdInterno}
                                                buscar={this.cargarDatosDeInterno}/>
                                    </Grid>
                                }
                                {
                                    this.props.buscarPor==="celular" &&
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Buscador nombreLabel="Celular"
                                            valorDefault={this.state.numeroCelular}
                                            nombreBoton="" 
                                            nameLabel={"por número destino"}
                                            recuperarIdInterno={this.recuperarNumeroCelular}
                                            buscar={this.cargarDatosNumeroCelular}/>
                                    </Grid>
                                }
                                <Grid item xs={12} sm={4} md={4}>
                                <RadioGroup                         
                                    lista={["llamadas"]}
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
                        {this.state.cantLlamadas && 
                        <Box sx={{justifyContent: 'center',display: 'flex'}}>
                            <VisibilityIcon/>
                            <Typography variant='p1' fontFamily='sans-serif' color='#5798F6'>{String(this.state.cantLlamadas)}</Typography>
                        </Box>}
                        {this.props.infoInternoSeleccionado && 
                            <Box sx={{justifyContent: 'center'}}>
                                <Box sx={{m:2, textTransform: 'capitalize',flexDirection: 'row',display: 'flex',justifyContent: 'center'}}>
                                    <AccountBalanceIcon/>                  
                                    <Typography variant='p1' fontFamily='sans-serif' color='#5798F6'>{String(this.props.infoPenalSeleccionado)}</Typography>
                                </Box> 
                                <Box sx={{m:2, textTransform: 'capitalize',flexDirection: 'row',display: 'flex',justifyContent: 'center'}}>
                                    <AccessibilityNewIcon/>  
                                    <Typography variant='p1' fontFamily='sans-serif' color='#5798F6'>{String(this.props.infoInternoSeleccionado)}</Typography>
                                </Box>
                            </Box>
                        }
                        <Box>                        
                        <Grid item xs={12}>
                            {this.state.mostrarTabla==="recargas" &&
                                <TablaReact 
                                    columnas={this.state.columnasRecargas} 
                                    datos={this.state.recargas}
                                    recuperarIndice={this.recuperarIndiceTocadoEnTablaRecargas}
                                />
                            }
                            {this.state.mostrarTabla==="llamadas" &&
                                <TablaReact 
                                    columnas={this.state.columnasLlamadas} 
                                    datos={this.state.llamadas}
                                    recuperarIndice={this.recuperarIndiceTocadoEnTablaLlamadas}
                                    />}
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


