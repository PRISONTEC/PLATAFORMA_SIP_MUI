import React from 'react';
import MyContext from "../context/MyContext";
import fetchData from '../../share/fetchData';
import TablaReact from '../TablaMui';
import RadioGroup from '../RadioGroup';
import LoadingPage from '../Loading';
import "../../assets/css/Calendario.css";
import FiltrarDatos from './Filtros';
import Buscador from '../Buscardor';
import { Grid } from '@material-ui/core';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Excel from '../excel';
const colLlamadasPorInterno = [
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
        width: 300,
        label: 'DESTINO',
        dataKey: 'numeroCelular',
    },
    {
        width: 300,
        label: 'FECHA',
        dataKey: 'fechaHora',
    },
    {
        width: 300,
        label: 'DURACION',
        dataKey: 'duracion',
    },

]

const colLlamadasPorDestino = [
    ...colLlamadasPorInterno, {
        width: 300,
        label: 'PENAL',
        dataKey: 'penal',
    }
]
const penal = {
    100: "SURCO", 101: "CAÑETE", 102: "HUARAL", 103: "CALLAO", 104: "ICA", 105: "CHINCHA", 106: "HUACHO", 107: "ANCON 2", 108: "CASTRO", 109: "ANCON",
    110: "LURIGANCHO", 111: "TRUJILLO", 112: "CHIMBOTE", 113: "HUARAZ", 114: "CHICLAYO", 115: "TUMBES", 116: "AYACUCHO", 117: "HUANCAYO", 118: "HUANUCO",
    119: "CAJAMARCA", 120: "CHANCHAMAYO", 121: "CHORRILLOS", 122: "CUSCO", 123: "PUERTO MALDONADO", 124: "TACNA", 125: "PUNO", 126: "JULIACA", 127: "TARAPOTO",
    128: "MOYOBAMBA", 129: "CHACHAPOYAS"
}

export default class ConsultarTransacciones extends React.Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            /* ip:"c38a2aa7ab14314e787920ba8d82ebd525145228.prisontec.xyz", */
            ip: "192.237.253.176",
            indiceTocadoEnTablaLlamadas: null,
            indiceTocadoEnTablaRecargas: null,
            cantRecargas: null,
            infoInternos: [],
            numeroCelular: this.props.investigarDestino ? this.props.investigarDestino : "",
            defaultNumeroCelular: "013119898",
            idInterno: this.props.investigarInterno ? this.props.investigarInterno : "",
            defaultIdInterno: "44252489",
            datos: null,
            mostrarTabla: "llamadas",
            disabledFilter: false,
            llamadas: [],
            recargas: [],
            fechaCalendarioInicio: null,
            fechaCalendarioFinal: null,
            actualizarFechaEnElComponenteHijo: true,
            fechaCalendarioSecundarioInicio: null,
            fechaCalendarioSecundarioFinal: null,
            excelBuscarPorDestino: "Busqueda por número de destino",
            excelBuscarPorIdInterno: "Busqueda por ID Interno",
            excelInterno: "interno",
            excelDestino: "destino",

            columnasRecargas: [
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
        this.obtenerTransaccionPorCelular = this.obtenerTransaccionPorCelular.bind(this)
        this.obtenerTransaccionPorInterno = this.obtenerTransaccionPorInterno.bind(this)
        this.cargarDatosDeInterno = this.cargarDatosDeInterno.bind(this)
        this.cargarDatosNumeroCelular = this.cargarDatosNumeroCelular.bind(this)
        this.recuperarIdInterno = this.recuperarIdInterno.bind(this)
        this.recuperarNumeroCelular = this.recuperarNumeroCelular.bind(this)
        this.separarRecargasDeLlamadas = this.separarRecargasDeLlamadas.bind(this)
        this.recuperarRadioGroupSeleccionado = this.recuperarRadioGroupSeleccionado.bind(this)
        this.recuperarFechaCalendarioInicio = this.recuperarFechaCalendarioInicio.bind(this)
        this.recuperarFechaCalendarioFinal = this.recuperarFechaCalendarioFinal.bind(this)
        this.filtrarDatosPorFechaSeleccionada = this.filtrarDatosPorFechaSeleccionada.bind(this)
        this.botonAplicarFiltro = this.botonAplicarFiltro.bind(this)
        this.recuperarIndiceTocadoEnTablaRecargas = this.recuperarIndiceTocadoEnTablaRecargas.bind(this)
        this.recuperarIndiceTocadoEnTablaLlamadas = this.recuperarIndiceTocadoEnTablaLlamadas.bind(this)
        this.insertarNombres = this.insertarNombres.bind(this)
        this.obtenerNombreDeInterno = this.obtenerNombreDeInterno.bind(this);
        this.secondsToString = this.secondsToString.bind(this);
    }
    //"componentDidMount" es necesario solamente por el modulo investigación

    componentDidMount() {
        if (this.props.investigarInterno) {
            this.props.setInvestigarInterno(null);
            this.cargarDatosDeInterno();
        } else if (this.props.investigarDestino) {
            this.props.setInvestigarDestino(null);
            this.cargarDatosNumeroCelular();
        }
    }


    // con este callback se actuliza la variable desde el hijo "Buscador"
    recuperarIdInterno(callback) {
        this.setState({
            idInterno: callback
        });
    }
    // con este callback se actuliza la variable desde el hijo "Buscador"
    recuperarNumeroCelular(callback) {
        this.setState({
            numeroCelular: callback
        });
    }
    // con este callback se actuliza la variable desde el hijo "RadioGroup"
    recuperarRadioGroupSeleccionado(callback) {
        this.setState({ mostrarTabla: callback });
    }

    recuperarFechaCalendarioInicio(callback) {
        if (callback !== null) {
            var fecha_formateada = callback
            this.setState({
                fechaCalendarioInicio: fecha_formateada,
                fechaCalendarioSecundarioInicio: fecha_formateada
            })
        } else {
            this.setState({
                fechaCalendarioInicio: null,
                fechaCalendarioSecundarioInicio: null
            })
        }
    }

    recuperarFechaCalendarioFinal(callback) {
        if (callback !== null) {
            var fecha_formateada = callback
            this.setState({
                fechaCalendarioFinal: fecha_formateada,
                fechaCalendarioSecundarioFinal: fecha_formateada
            })
        } else {
            this.setState({
                fechaCalendarioFinal: null,
                fechaCalendarioSecundarioFinal: null
            })
        }
    }

    // obteniendo nombres de internos
    recuperarIndiceTocadoEnTablaRecargas(callback) {
        this.setState({ indiceTocadoEnTablaRecargas: callback });
        this.obtenerNombreDeInterno(callback, this.state.recargas)
    }

    recuperarIndiceTocadoEnTablaLlamadas(callback) {
        this.setState({ indiceTocadoEnTablaLlamadas: callback });
        this.obtenerNombreDeInterno(callback, this.context.data)
    }

    obtenerNombreDeInterno(index, datos) {
        datos.every((dato) => {
            if (dato.index === index) {
                this.obtenerTransaccionPorNombreInterno((info) => {

                    try {
                        const { nombres = '', prefijoPenal = 101 } = info.items[0];
                        this.context.set_infoInternoSeleccionado(nombres, prefijoPenal);
                    } catch (e) {
                        this.context.set_infoInternoSeleccionado("No se encontró coincidencia...", "");
                    }
                }, dato.idInterno)
                return false
            }
            return true;
        })
    }

    // para actulizar la fecha desde aqui hacia los hijos
    // para controlar que solo lo haga una vez y no en bucle infinito(true o false)
    funcionActualizarFecha(callback) {
        this.setState({
            actualizarFecha: callback
        });
    }

    cargarDatosDeInterno() {
        this.context.set_infoInternoSeleccionado("", "");

        if (this.state.idInterno) {
            this.setState({
                loaded: false,
                actualizarFechaEnElComponenteHijo: true,
                fechaCalendarioInicio: null,
                fechaCalendarioFinal: null,
                idInterno: null,
                defaultIdInterno: "",
            });

            this.obtenerTransaccionPorInterno((data) => {
                this.setState({
                    datos: data,
                })
                this.filtrarDatosPorFechaSeleccionada(data.items);
            })
        }
    }

    cargarDatosNumeroCelular() {
        this.context.set_infoInternoSeleccionado("", "");

        if (this.state.numeroCelular) {
            this.setState({
                loaded: false,
                actualizarFechaEnElComponenteHijo: true,
                fechaCalendarioInicio: null,
                fechaCalendarioFinal: null,
                numeroCelular: null,
                defaultNumeroCelular: ""
            });
            this.obtenerTransaccionPorCelular((data) => {
                this.setState({
                    datos: data,
                })
                this.filtrarDatosPorFechaSeleccionada(data.items)

            })
        }
    }

    insertarNombres(datos) {
        var datosConNombres = [];
        datos.forEach((dato) => {
            this.state.infoInternos.every((interno) => {
                if (interno.idInterno === dato.idInterno) {
                    dato.nombres = interno.nombres;
                    datosConNombres.push(dato);
                    return false;
                }
                return true;
            })
        })
    }

    botonAplicarFiltro() {
        this.setState({ disabledFilter: false });
        try {
            this.filtrarDatosPorFechaSeleccionada(this.state.datos.items);
        } catch (e) {
            console.log(e)
        }
    }

    secondsToString(seconds) {
        var hour = Math.floor(seconds / 3600);
        hour = (hour < 10) ? '0' + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10) ? '0' + minute : minute;
        var second = seconds % 60;
        second = (second < 10) ? '0' + second : second;
        return hour + ':' + minute + ':' + second;
    }

    filtrarDatosPorFechaSeleccionada(datosParaFiltar) {
        if (this.state.fechaCalendarioInicio != null && this.state.fechaCalendarioFinal === null) {
            var CaleSecFin = Date.parse(this.state.fechaCalendarioFinal)
            var fechaInicio = new Date(this.state.fechaCalendarioInicio)
            fechaInicio = (fechaInicio.getFullYear()) + "-" + (("0" + (fechaInicio.getMonth() + 1)).slice(-2)) + "-" + (("0" + (fechaInicio.getDate())).slice(-2))
            var CaleSecInicio = Date.parse(fechaInicio);


        } else if (this.state.fechaCalendarioInicio === null && this.state.fechaCalendarioFinal != null) {
            var CaleSecInicio = Date.parse(this.state.fechaCalendarioInicio)
            var fechaFin = new Date(this.state.fechaCalendarioFinal)
            fechaFin = (fechaFin.getFullYear()) + "-" + (("0" + (fechaFin.getMonth() + 1)).slice(-2)) + "-" + (("0" + (fechaFin.getDate())).slice(-2))
            var CaleSecFin = Date.parse(fechaFin);

        } else if (this.state.fechaCalendarioInicio != null && this.state.fechaCalendarioFinal != null) {
            var fechaInicio = new Date(this.state.fechaCalendarioInicio)
            var fechaFin = new Date(this.state.fechaCalendarioFinal)
            fechaInicio = (fechaInicio.getFullYear()) + "-" + (("0" + (fechaInicio.getMonth() + 1)).slice(-2)) + "-" + (("0" + (fechaInicio.getDate())).slice(-2))
            fechaFin = (fechaFin.getFullYear()) + "-" + (("0" + (fechaFin.getMonth() + 1)).slice(-2)) + "-" + (("0" + (fechaFin.getDate())).slice(-2))
            var CaleSecInicio = Date.parse(fechaInicio);
            var CaleSecFin = Date.parse(fechaFin);

        } else {
            //var CaleSecInicio=Date.parse(this.state.fechaCalendarioInicio);
            //var CaleSecFin=Date.parse(this.state.fechaCalendarioFinal);
            var CaleSecInicio = Date.parse("2000-01-01");
            var CaleSecFin = Date.parse("2024-03-31");

        }

        //hoy = ((new Date()).toISOString()).split("T")[0]
        if (datosParaFiltar.length == 0) {
            var menorFechaInicioDeConsultaDeBdd = Date.parse("2023-03-18");
            var mayorFechaInicioDeConsultaDeBdd = Date.parse("2023-03-18");
            this.setState({
                disabledFilter: true
            })
        } else {
            var menorFechaInicioDeConsultaDeBdd = Date.parse("2023-03-31");
            var mayorFechaInicioDeConsultaDeBdd = Date.parse("2020-01-01");
            this.setState({
                disabledFilter: false
            })
        }
        var datosPorFecha = [];
        datosParaFiltar.forEach((dato) => {
            if ((dato.fechaHora).length == 10) {
                var fechaHora = new Date(dato.fechaHora * 1000);
                dato.fechaHora = fechaHora.toJSON().split('T')[0] + " " + fechaHora.toJSON().split('T')[1].substring(0, 8)
            } else {
                var fechaHora = dato.fechaHora;
            }

            if ((dato.fechaHoraInicio).length == 10) {
                var fechaHoraInicio = new Date(dato.fechaHoraInicio * 1000);
                dato.fechaHoraInicio = fechaHoraInicio.toISOString().split('T')[0] + " " + fechaHoraInicio.toISOString().split('T')[1].substring(0, 8)
            } else {
                var fechaHoraInicio = dato.fechaHoraInicio;
            }

            if ((dato.fechaHoraFin).length == 10) {
                var fechaHoraFin = new Date(dato.fechaHoraFin * 1000);
                dato.fechaHoraFin = fechaHoraFin.toJSON().split('T')[0] + " " + fechaHoraFin.toISOString().split('T')[1].substring(0, 8)
            } else {
                var fechaHoraFin = dato.fechaHoraFin;
            }

            var fechaInterna = Date.parse(dato.fechaHora);
            var fechaInternaS = Date.parse(dato.fechaHora.substr(0, 10))

            try {
                var inicio = Date.parse(dato.fechaHoraInicio);
                var fin = Date.parse(dato.fechaHoraFin);
                if (isNaN(inicio) || isNaN(fin)) {
                    dato.duracion = "00:00:00";
                    datosPorFecha.push(dato.duracion);
                } else {
                    dato.duracion = this.secondsToString((fin - inicio) / 1000);
                    datosPorFecha.push(dato.duracion);
                }
            } catch {
                dato.duracion = "00:00:00";
                datosPorFecha.push(dato.duracion)
            }
            //obtener la mayor fecha de la consulta

            if (fechaInterna > mayorFechaInicioDeConsultaDeBdd) {
                mayorFechaInicioDeConsultaDeBdd = fechaInterna;
            }
            //obtener la menor fecha de la consulta
            if (fechaInterna < menorFechaInicioDeConsultaDeBdd) {
                menorFechaInicioDeConsultaDeBdd = fechaInterna;
            }
            //aplicando filtro de fechas, lo de arriba es otra cosa
            if (CaleSecInicio <= fechaInternaS && fechaInternaS <= CaleSecFin) {
                datosPorFecha.push(dato)
            } else if (CaleSecFin <= fechaInternaS && fechaInternaS <= CaleSecInicio) {
                datosPorFecha.push(dato)
            } else if (CaleSecInicio === fechaInternaS && isNaN(CaleSecFin)) {
                datosPorFecha.push(dato)
            } else if (CaleSecFin === fechaInternaS && isNaN(CaleSecInicio)) {
                datosPorFecha.push(dato)
            } else if (isNaN(CaleSecFin) && isNaN(CaleSecInicio)) {
                datosPorFecha.push(dato)
            }
        })
        if (this.state.actualizarFechaEnElComponenteHijo) {
            this.setState({
                fechaCalendarioInicio: (new Date(menorFechaInicioDeConsultaDeBdd)).toISOString(),
                fechaCalendarioFinal: (new Date(mayorFechaInicioDeConsultaDeBdd)).toISOString(),
                actualizarFechaEnElComponenteHijo: false,
            });
        }
        this.separarRecargasDeLlamadas(datosPorFecha);
    }
    // Con esta funcion termina el render(lo que muestra en la tabla)
    separarRecargasDeLlamadas(datos) {
        var recargas = [];
        var llamadas = [];
        var indiceLlamadas = 0;
        var indiceRecargas = 0;
        datos.forEach((dato) => {

            if (dato.duracion) {
                indiceLlamadas = indiceLlamadas + 1;
                dato.index = indiceLlamadas;
                llamadas.push(dato)
            }
            if (dato.monto) {
                indiceRecargas = indiceRecargas + 1;
                dato.index = indiceRecargas;
                recargas.push(dato)
            }
        })
        this.context.set_data(llamadas);
        this.context.set_cantLlamadas(indiceLlamadas === 0 ? null : indiceLlamadas);

        this.setState({
            recargas: recargas,
            cantRecargas: indiceRecargas === 0 ? null : indiceRecargas,
            filtrarPorInterno: null,
            filtrarPorDestino: null,
            filtrarDatosPorFechaSeleccionada: null,
            loaded: true,
        });
        // Aqui mostramos el nombre y el penal del interno sin necesidad de presionar el boton info en la tabla
        if (this.context.state_menu === "interno") {
            //para obtener el nombre necesita el indice y el vector de donde sacará el codAzulito
            // ej: ["48339906","4899060600"] , indice=0
            // reutilizamos codigo 
            // 1 SIGNIFICA QUE MOSTRARA EL NOMBRE
            this.obtenerNombreDeInterno(1, llamadas)
        }
    }

    obtenerTransaccionPorNombreInterno(callback, idInterno) {
        fetchData.getData("http://" + this.state.ip + ":7840",
            "/SIP/byKeyNombre?idInterno=" + idInterno,
            callback
        )
    }

    obtenerTransaccionPorCelular(callback) {
        fetchData.getData("http://" + this.state.ip + ":7840",
            "/SIP/byKeyCelular?numeroCelular=" + this.state.numeroCelular,
            callback
        )
    }

    obtenerTransaccionPorInterno(callback) {
        fetchData.getData("http://" + this.state.ip + ":7840",
            "/SIP/byKeyInterno?idInterno=" + this.state.idInterno,
            callback
        )
    }
    render() {
        return (
            <>
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ m: 2 }}>
                            <Grid container direction="row" justifyContent="center" alignItems="center">
                                <Grid item>
                                    <Typography variant='p1' fontFamily='sans-serif' color='#5798F6'>
                                        {this.context.state_menu === "interno" ? <p1> BUSQUEDA POR INTERNO</p1> : <p1></p1>}
                                        {this.context.state_menu === "celular" ? <p1> BUSQUEDA POR DESTINO</p1> : <p1></p1>}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Grid container justifyContent="center" alignItems="center">
                            {
                                this.context.state_menu === "interno" &&
                                <Grid item xs={12} sm={6} md={6}>
                                    <Buscador nombreLabel="Interno"
                                        valorDefault={this.state.defaultIdInterno}
                                        nombreBoton=""
                                        nameLabel={"ID Interno"}
                                        recuperarIdInterno={this.recuperarIdInterno}
                                        buscar={this.cargarDatosDeInterno} />
                                </Grid>
                            }
                            {
                                this.context.state_menu === "celular" &&
                                <Grid item xs={12} sm={6} md={6}>
                                    <Buscador nombreLabel="Celular"
                                        valorDefault={this.state.defaultNumeroCelular}
                                        nombreBoton=""
                                        nameLabel={"por número destino"}
                                        recuperarIdInterno={this.recuperarNumeroCelular}
                                        buscar={this.cargarDatosNumeroCelular} />
                                </Grid>
                            }
                            <Grid item xs={12} sm={4} md={4}>
                                <RadioGroup
                                    lista={["llamadas"]}
                                    iniciarConItem={this.state.mostrarTabla}
                                    itemSeleccionado={this.recuperarRadioGroupSeleccionado}
                                />
                            </Grid>
                            {
                                this.context.state_menu === "interno" &&
                                <Grid item xs={6} sm={2} md={2}>
                                    <Excel
                                        llamadasInterno={this.context.data}
                                        excelBuscarPorIdInterno={this.state.excelBuscarPorIdInterno}
                                        excelInterno={this.state.excelInterno}
                                    />
                                </Grid>
                            }
                            {
                                this.context.state_menu === "celular" &&
                                <Grid item xs={6} sm={2} md={2}>
                                    <Excel
                                        llamadasInterno={this.context.data}
                                        excelBuscarPorDestino={this.state.excelBuscarPorDestino}
                                        excelDestino={this.state.excelDestino}
                                    />
                                </Grid>
                            }

                        </Grid>
                    </Box>
                    {this.state.loaded && <>
                        <FiltrarDatos
                            buscar={this.botonAplicarFiltro}
                            valueIdInterno={this.state.idInterno}
                            recuperarFechaCalendarioInicio={this.recuperarFechaCalendarioInicio}
                            fechaCalendarioSecundarioInicio={this.state.fechaCalendarioInicio}
                            tituloCalendarioInicio={"Fecha Inicio"}
                            recuperarFechaCalendarioFinal={this.recuperarFechaCalendarioFinal}
                            fechaCalendarioSecundarioFinal={this.state.fechaCalendarioFinal}
                            tituloCalendarioFinal={"Fecha Final"}
                            disabledFilter={this.state.disabledFilter}
                        />
                        {this.context.infoInternoSeleccionado.cantLlamadas &&
                            <Box sx={{ justifyContent: 'center', display: 'flex', mt: 2 }}>
                                <VisibilityIcon />
                                <Typography variant='p1' fontFamily='sans-serif' color='#5798F6'>{String(this.context.infoInternoSeleccionado.cantLlamadas)}</Typography>
                            </Box>}
                        {this.context.infoInternoSeleccionado.nombre !== "" &&
                            <Box sx={{ justifyContent: 'center' }}>
                                <Box sx={{ m: 2, textTransform: 'capitalize', flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                                    <AccountBalanceIcon />
                                    <Typography variant='p1' fontFamily='sans-serif' color='#5798F6'>{String(this.context.infoInternoSeleccionado.nombre)}</Typography>
                                </Box>
                                <Box sx={{ m: 2, textTransform: 'capitalize', flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                                    <AccessibilityNewIcon />
                                    <Typography variant='p1' fontFamily='sans-serif' color='#5798F6'>{penal[this.context.infoInternoSeleccionado.penal]}</Typography>
                                </Box>
                            </Box>
                        }
                        <Box>
                            <Grid item xs={12}>
                                {this.state.mostrarTabla === "recargas" &&
                                    <TablaReact
                                        columnas={this.state.columnasRecargas}
                                        datos={this.state.recargas}
                                        recuperarIndice={this.recuperarIndiceTocadoEnTablaRecargas}
                                    />
                                }
                                {this.state.mostrarTabla === "llamadas" &&
                                    <TablaReact
                                        columnas={this.context.state_menu === "interno" ? colLlamadasPorInterno : colLlamadasPorDestino}
                                        datos={this.context.data}
                                        recuperarIndice={this.recuperarIndiceTocadoEnTablaLlamadas}
                                    />}
                            </Grid>
                        </Box>
                    </>}
                    {!this.state.loaded && < LoadingPage />}
                </Box>
            </>
        );
    }
}