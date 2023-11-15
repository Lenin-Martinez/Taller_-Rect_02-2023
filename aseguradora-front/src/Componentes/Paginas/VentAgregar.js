import React, { useState, useEffect } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Flex,
  Upload,
  message,
  Spin,
  InputNumber,
  Select,
  Modal,
} from 'antd';
import axiosInstance from "../../config/axios-config";

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const boxStyle = {
  /*borderRadius: 6,
  border: '2px solid',
  paddingTop: '10%',
  paddingLeft: '1%',
  paddingRight: '2%',
  paddingBottom: '10%',*/
  backgroundColor: '#bdac9791',
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

export default function VentAgregar() {

  
    const [justify, setJustify] = React.useState(justifyOptions[1]);
    const [alignItems, setAlignItems] = React.useState(alignOptions[1]);
  
    const [componentSize, setComponentSize] = useState('default');
  
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };
  
    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {   setIsModalOpen(true); };
    const handleOk = () => {    setIsModalOpen(false);};
    const handleCancel = () => { setIsModalOpen(false); };
  


  //Datos Formulario
  const [marca, setmarca] = useState(null);
  const [modelo, setmodelo] = useState(null);
  const [Cantidad, setCantidad] = useState(null);
  const [Costo, setCosto] = useState(null);
  const [PVenta, setPVenta] = useState(null);
  const [Categorias, setCategorias] = useState(null);
  const [Proveedor, setProveedor] = useState(null);
  const [Tienda, setTienda] = useState(null);

  const [imagen, setimagen] = useState(null);
  const [nombreImagen, setnombreImagen] = useState(null);
  
  const CambioProveedor = (value) => {
    setProveedor(value);
  };

  const CambioCategoria = (value) => {
    setCategorias(value);
  };

  const CambioMarca = (value) => {
    setmarca(value);
  };

  const CambioTienda = (value) => {
    setTienda(value);
  };


    const [DatosProveedor, setDatosProveedor] = useState(null); 
    useEffect(() => {
      const CargarMarcas = async () => {
        await axiosInstance
        .get("/proveedores",)
          .then((result) => {
            let objProveedor = [];
            result.data.registros.map((ele) => {
              objProveedor.push({
                value: ele.idProveedor,
                label: ele.NombreProveedor,
              });
            });
            setDatosProveedor(objProveedor);
            setProveedor(result.data.registros[0].idProveedor);
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      };
      CargarMarcas();
    }, []);
  
  
    useEffect(() => {
      if (DatosProveedor !== null) {
        console.log("Data Cargada");
      }
    }, [DatosProveedor]);
    
    const [DatosCategoria, setDatosCategoria] = useState(null); 
    useEffect(() => {
      const CargarMarcas = async () => {
        await axiosInstance
        .get("/categorias",)
          .then((result) => {
            let objCategoria = [];
            result.data.registros.map((ele) => {
              objCategoria.push({
                value: ele.idCategoria,
                label: ele.NombreCategoria,
              });
            });
            setDatosCategoria(objCategoria);
            setCategorias(result.data.registros[0].idProveedor);
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      };
      CargarMarcas();
    }, []);
  
  
    useEffect(() => {
      if (DatosCategoria !== null) {
        console.log("Data Cargada");
      }
    }, [DatosCategoria]);
    

  const [datosMarcas, setdatosMarcas] = useState(null); 
  useEffect(() => {
    const CargarMarcas = async () => {
      await axiosInstance
        .get("/reparaciones/marcas")
        .then((result) => {
          let objMarcas = [];
          result.data.registros.map((ele) => {
            objMarcas.push({
              value: ele.idMarca,
              label: ele.NombreMarca,
            });
          });
          setdatosMarcas(objMarcas);
          setmarca(result.data.registros[0].idMarca);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    };
    CargarMarcas();
  }, []);


  useEffect(() => {
    if (datosMarcas !== null) {
      console.log("Data Cargada");
    }
  }, [datosMarcas]);


  const [DatosTiendas, setDatosTiendas] = useState(null); 
  useEffect(() => {
    const CargarMarcas = async () => {
      await axiosInstance
      .get("/tiendas",)
        .then((result) => {
         
          let objTienda = [];
          result.data.registros.map((ele) => {
            objTienda.push({
              value: ele.idTienda,
              label: ele.NombreTienda,
            });
          });
          setDatosTiendas(objTienda);
          setTienda(result.data.registros[0].idTienda);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    };
    CargarMarcas();
  }, []);


  useEffect(() => {
    if (DatosTiendas !== null) {
      console.log("Data Cargada");
    }
  }, [DatosTiendas]);

  
  const GuardarPieza = async () => {
    await axiosInstance
      .post("/piezas/agregarPieza", {
        imagen: imagen, 
        imagenTitulo: nombreImagen,
        idProveedor: Proveedor,
        idCategoria: Categorias,
        idMarca: marca,
        modelo: modelo,
        idTienda: Tienda,
        cantidad: Cantidad,
        precioCosto: Costo,
        precioVenta: PVenta,
      })
      .then((result) => {
        showModal()
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";

      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e) => {
    let file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setimagen(file.base64.split(',')[1]);
        setnombreImagen(file.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <Flex style={boxStyle} justify={justify} gap="middle" vertical >
      
      <h2 style={{marginLeft: '40%'}}>Añadir repuestos</h2>

      <Form
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 1000,
        }}
      >
        
        <Flex /*contenedor completo*/>  
          <Flex gap="middle" vertical style={{width:'50%'}} /*Contenedor izquierdo*/>
            
          <Form.Item label="Proveedor">
                 <Select
                    placeholder="Seleccione una Marca"
                    onChange={CambioProveedor}
                    options={DatosProveedor}
                />
            </Form.Item>

            <Form.Item label="Categoria">
                  <Select
                    placeholder="Seleccione una Categoria"
                    onChange={CambioCategoria}
                    options={DatosCategoria}
                  />
            </Form.Item>

            <Form.Item label="Marca">
                 <Select
                    placeholder="Seleccione una Marca"
                    onChange={CambioMarca}
                    options={datosMarcas}
                />
            </Form.Item>

            <Form.Item label="Modelo">
              <Input onChange={(e) => {setmodelo(e.target.value);}}/>
            </Form.Item>

            <Form.Item label="Tienda">
                  <Select
                    placeholder="Seleccione una tienda"
                    onChange={CambioTienda}
                    options={DatosTiendas}
                  />
            </Form.Item>

          </Flex>


          <Flex gap="middle" vertical style={{width:'50%'}} /*Contenedor derecho*/>
            <Form.Item label="Cantidad">
              <InputNumber placeholder='Cantidad' onChange={(e) => {setCantidad(e);}}/>
            </Form.Item>


            <Form.Item label="Costo $">
              <InputNumber onChange={(e) => {setCosto(e);}}/>
            </Form.Item>

            <Form.Item label="Precio de Venta $">
              <InputNumber onChange={(e) => {setPVenta(e);}}/>
            </Form.Item>

            <Form.Item label="Cargar fotografia" valuePropName="fileList" getValueFromEvent={normFile}>
              <input id="upload" type="file" accept="image/*" onChange={handleFileInputChange}/>
            </Form.Item>

            <Form.Item label="" style={{marginLeft: '42%'}}>
              <Button type="primary" onClick={GuardarPieza}>Guardar Repuesto </Button>
              <Modal title="Completado" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Registro Realizado</p>
        </Modal>
            </Form.Item>

          </Flex>
        </Flex>


            
      </Form>
    </Flex>
  );
};




