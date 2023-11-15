import React from 'react'
import {
  Form,
  Button,
  Input,

} from 'antd';

import ObjProceso from '../Registros/ObjProceso';

export default function EnProceso() {
  return (
    <div>
      <h2>Incidentes en Proceso de Solucion</h2>
      <Form.Item style={{width:'100%'}}>
        <Input placeholder='Ingrese el N. de placa' style={{width:'79%'}}/>
        <Button style={{marginLeft:'1%', width:'20%'}} type='primary'>Buscar</Button>
      </Form.Item>
        
      <ObjProceso/>
    </div>
  )
}
