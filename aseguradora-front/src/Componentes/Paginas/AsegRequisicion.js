import React, { useState }  from 'react';
import {
  Form,
  Button,
  Input,

} from 'antd';

import ObjEspera from '../Registros/ObjEspera';
import EnEsperaAceptar from './EnEsperaAceptar';
import ObjAsegRequisicion from '../Registros/ObjAsegRequisicion';


export default function AsegRequisicion() {

  const [MostarAutoMarket, setMostarAutoMarket] = useState("0");
  const fMostarAutoMarket = (pagina) => {
    setMostarAutoMarket(pagina);
  };


  return (
        <>
          <h2> Requisicion en Espera</h2>

          <ObjAsegRequisicion MostrarPagina = {fMostarAutoMarket}/>
          <ObjAsegRequisicion MostrarPagina = {fMostarAutoMarket}/>
        </>
)
}

