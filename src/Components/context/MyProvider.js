import React, { Component } from "react";
import MyContext from "./MyContext"; // Importamos el contexto

class MyProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state_menu: "",
            data: [],
            infoInternoSeleccionado: { penal: '', nombre: '', cantLlamadas: 0 },
            change_state_menu: this.change_state_menu,
            set_data: this.set_data,
            set_infoInternoSeleccionado: this.set_infoInternoSeleccionado,
            set_cantLlamadas: this.set_cantLlamadas
        };
    }
    set_cantLlamadas = (cantLlamadas) => {
        this.setState(p => ({ ...p, infoInternoSeleccionado: ({ ...p.infoInternoSeleccionado, cantLlamadas }) }));
    }

    set_infoInternoSeleccionado = (nombre, penal) => {
        this.setState(p => ({ ...p, infoInternoSeleccionado: { ...p.infoInternoSeleccionado, nombre, penal } }));
    }
    set_data = (datos) => {
        this.setState(p => ({ ...p, data: datos }));
    }

    change_state_menu = (menu) => {
        this.setState(p => ({ ...p, state_menu: menu }));
    };

    render() {
        return (
            <MyContext.Provider value={this.state}>
                {this.props.children} {/* Permite envolver otros componentes */}
            </MyContext.Provider>
        );
    }
}

export default MyProvider;
