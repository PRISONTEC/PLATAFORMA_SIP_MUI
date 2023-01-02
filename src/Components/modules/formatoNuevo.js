import React from 'react';
import asterisco from '../../assets/images/asterisco.png'
import '../../assets/css/diseNuevo.css'
export default class formatoNuevo extends React.Component {
    render() {
        return(
        <div id="divPadre">
          <img src={asterisco}  width="50" height="50" ></img>
          <h3 id="texto">Infomación en tiempo real</h3>
          </div>
        )
    }

}



