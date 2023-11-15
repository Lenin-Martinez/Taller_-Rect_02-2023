import React, { useState }  from 'react';
import {
  Form,
  Button,
  Input,

} from 'antd';

import ObjEspera from '../Registros/ObjEspera';
import EnEsperaAceptar from './EnEsperaAceptar';

export default function EnEspera() {
  
  const [MostarAutoMarket, setMostarAutoMarket] = useState("0");

  const fMostarAutoMarket = (pagina) => {
    setMostarAutoMarket(pagina);
  };

  return (
    <>
      {MostarAutoMarket === "1" ? (
          <div>
            <EnEsperaAceptar/>
          </div>
        ) : 
        (
          <>
            <h2> Incidentes en Espera</h2>
            <Form.Item style={{width:'100%'}}>
              <Input placeholder='Ingrese el N. de placa' style={{width:'79%'}}/>
              <Button style={{marginLeft:'1%', width:'20%'}} type='primary'>Buscar</Button>
            </Form.Item>
            
            <ObjEspera MostrarPagina = {fMostarAutoMarket}/>
          </>
        )
      }
    </>
  )
}





