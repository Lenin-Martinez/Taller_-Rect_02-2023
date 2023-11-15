import React from 'react'
import {
  Form,
  Button,
  Input,

} from 'antd';
import ObjAsegProceso from '../Registros/ObjAsegProceso';


export default function AsegProceso() {
  return (
    <div>
    <h2>Requisiciones en Proceso</h2>

      <ObjAsegProceso/>
      <ObjAsegProceso/>
  </div>
    )
}
