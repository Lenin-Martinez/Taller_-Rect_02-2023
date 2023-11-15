import React , { useState } from 'react';

import {
    Form,
    Button,
    Input,
    Tag,
    Space,
    Table,
    Modal,
    Flex,
  
  } from 'antd';

  const columns = [
    {
      title: 'Proveedor',
      dataIndex: 'Proveedor',
      key: 'Proveedor',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Categoria',
      dataIndex: 'Categoria',
      key: 'Categoria',
    },
    {
      title: 'Marca',
      dataIndex: 'Marca',
      key: 'Marca',
    },
    {
        title: 'Modelo',
        dataIndex: 'Modelo',
        key: 'Modelo',
    },
    {
        title: 'Tienda',
        dataIndex: 'Tienda',
        key: 'Tienda',
    },
    {
        title: 'Cantidad',
        dataIndex: 'Cantidad',
        key: 'Cantidad',
    },
    {
        title: 'Costo',
        dataIndex: 'Costo',
        key: 'Costo',
    },    
    {
        title: 'Precio de Venta',
        dataIndex: 'Precio',
        key: 'Precio',
    },
  ];
  
  const data = [
    {
      key: '1',
      Proveedor: 'Nombre_Proveedor1',
      Categoria: 'Categoria1',
      Marca: 'Marca1',
      Modelo: 'Modelo1',
      Tienda: 'Tienda1',
      Cantidad: '123', 
      Costo: '$0.00', 
      Precio: '$0.00',  
    },
    {
        key: '2',
        Proveedor: 'Nombre_Proveedor2',
        Categoria: 'Categoria2',
        Marca: 'Marca2',
        Modelo: 'Modelo2',
        Tienda: 'Tienda2',
        Cantidad: '456', 
        Costo: '$0.00', 
        Precio: '$0.00',  
    },
    {
        key: '3',
        Proveedor: 'Nombre_Proveedor3',
        Categoria: 'Categoria3',
        Marca: 'Marca3',
        Modelo: 'Modelo3',
        Tienda: 'Tienda3',
        Cantidad: '789', 
        Costo: '$0.00', 
        Precio: '$0.00',  
    },

  ];
  


export default function VentEliminar ( ) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {   setIsModalOpen(true); };
    const handleOk = () => {    setIsModalOpen(false);};
    const handleCancel = () => { setIsModalOpen(false); };
    
    
  return (
    <div>
    <h2>Eliminar repuestos</h2>
    <Form.Item style={{width:'100%'}}>
      <Input placeholder='Ingrese modelo' style={{width:'79%'}}/>
      <Button style={{marginLeft:'1%', width:'20%'}} type='primary'>Buscar</Button>
      </Form.Item>

      <Table columns={columns} dataSource={data} />
      <Flex>
      <Button type='primary' style={{width: '30%', marginBottom: '3%', backgroundColor: '#0B164F'}} onClick={showModal}>Eliminar Registro</Button>
      <Modal title="Eliminar" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Registro Eliminado</p>
      </Modal>
    </Flex>
    </div>
  )
}

