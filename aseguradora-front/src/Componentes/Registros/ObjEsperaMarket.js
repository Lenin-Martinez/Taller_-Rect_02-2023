import React, { useState, useEffect } from 'react';
import { Form, Button, Flex } from 'antd'

import axiosInstance from "../../config/axios-config";
  





export default function ObjEsperaMarket() {
  


  const [DatosPieza, setDatosPieza] = useState(null); 

  useEffect(() => {
    const CargarData = async () => {
      await axiosInstance
        .get("/piezas",)
        .then((result) => {
          setDatosPieza(result.data.registros);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    };
    CargarData();
  }, []);
  
  
  useEffect(() => {
    if (DatosPieza !== null) {
      console.log("Data Cargada");
    }
  }, [DatosPieza]);
  
  
  return (
    <Flex gap="middle" vertical>
        {DatosPieza?.map((ele) => (
          <>
          <Flex>
                <Form.Item >
                      <img src="https://th.bing.com/th/id/OIP.iwE3cgT35eYPOSj6nG2NjQHaEo?pid=ImgDet&rs=1" 
                          style={{width:'95%', height:125, paddingLeft: '3%'}} 
                      />
                </Form.Item>
                
                <Form.Item >
                  <div style={{paddingLeft: '5%',}}>
                  <label>Codigo:  {ele.idPieza}</label><br/>
                  <label>Proveedor: {ele.NombreProveedor}</label><br/>
                  <label>Categoria:  {ele.NombreCategoria}</label><br/>
                  <label>Marca:  {ele.NombreMarca}</label><br/>
                  <label>Modelo:  {ele.Modelo}</label><br/>
                  <label>Costo: $ {ele.PrecioCosto}</label><br/><br/>
                  </div>
                </Form.Item>

                <Form.Item >
                <Button type="primary" 
                style={{
                    backgroundColor: 'green',
                    width: '100%'}}
                    > Agregar</Button>
                </Form.Item>



          </Flex>
          </>
        ))}
  
        </Flex>
  )
}

