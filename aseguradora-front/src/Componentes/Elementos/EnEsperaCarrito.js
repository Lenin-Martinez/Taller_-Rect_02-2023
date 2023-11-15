import React, {useState} from 'react'
import { Flex, Form, Button, InputNumber, Modal } from 'antd';
import ObjEsperaCarrito from '../Registros/ObjEsperaCarrito';

const boxStyle = {
    position: 'fixed',
    overflowY: 'scroll',
    height: 472,
    borderRadius: 6,
    border: '2px solid',
    paddingTop: '1.5%',
    paddingLeft: '1%',
    //paddingBottom: '5%',
    backgroundColor: '#bdac9791',
    width: '25%',
    //marginLeft: '2%',
    //marginRigth: '2%',
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

export default function EnEsperaCarrito(  ) {

  const [justify, setJustify] = useState(justifyOptions[0]);
  const [alignItems, setAlignItems] = useState(alignOptions[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {   setIsModalOpen(true); };
  const handleOk = () => {    setIsModalOpen(false);};
  const handleCancel = () => { setIsModalOpen(false); };


  return (
    <Flex style={boxStyle} gap="middle" vertical>
      
    <Flex style={{fontSize:18, fontWeight:'bold', color: '#0B164F', }}>
        Carrito de Compras
    </Flex>

    <Flex style={{fontSize:14, fontWeight:'bold' }}>
    Total Cotización: $0.00
    </Flex>


    <ObjEsperaCarrito />

      <Flex>
        <Button type='primary' style={{width: '100%', marginBottom: '3%', backgroundColor: '#0B164F'}} onClick={showModal}>Generar codigo de preorden</Button>
        <Modal title="Orden" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Su numero de orden es : 1234</p>
        </Modal>
      </Flex>

    </Flex>
  )
}