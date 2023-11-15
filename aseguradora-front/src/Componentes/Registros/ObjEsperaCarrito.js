import React from 'react'

import { Flex, Form, Button, InputNumber, Modal } from 'antd';

const boxStyle = {
    position: 'fixed',
    overflowY: 'scroll',
    height: 472,
    borderRadius: 6,
    border: '2px solid',
    paddingTop: '1.5%',
    paddingLeft: '1%',
    paddingBottom: '5%',
    backgroundColor: '#bdac9791',
    width: '20%',
    marginLeft: '2%',
    marginRigth: '2%',
  };
  
  const justifyOptions = [
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ];

  const alignOptions = ['flex-start', 'center', 'flex-end'];


export default function ObjEsperaCarrito() {
  return (
    
    <Flex>
    <Flex style={{width:'100%',}}>
      <Form.Item>
          <img src="https://th.bing.com/th/id/OIP.iwE3cgT35eYPOSj6nG2NjQHaEo?pid=ImgDet&rs=1" 
              style={{width:'100%', height: 75}} 
          />
      </Form.Item>

      <Form.Item style={{width:'90%', marginLeft: '2%'}}>
        <label>Nombre: Auto</label><br/>
        <label>Codigo: 1234</label><br/>
        <label>Costo $: 0.00</label><br/>
      </Form.Item>

      <Form.Item>
          <InputNumber style={{width:'80%'}} placeholder='cant.'/>
          <Button type="primary" style={{backgroundColor: 'red', marginTop: 5, height: 30, width: '80%'}}> X </Button>
      </Form.Item>
    </Flex>
    </Flex>
  )
}
