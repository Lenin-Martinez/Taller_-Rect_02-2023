
import React, { useEffect, useState } from "react";
import { Flex, Form, Button, Input, Select } from 'antd'
import FormItem from 'antd/es/form/FormItem';
import ObjEsperaMarket from '../Registros/ObjEsperaMarket';
import axiosInstance from "../../config/axios-config";


const boxStyle = {
    borderRadius: 6,
    border: '0px solid',
    paddingTop: '1.5%',
    paddingLeft: '2%',
    //paddingRight: '2%',
    //paddingBottom: '5%',
    backgroundColor: '#bdac9791',
    marginRight: '2%',
    marginLeft: '2%'
  };

  const boxStyle1 = {
    borderRadius: 6,
    border: '0px solid',
    paddingTop: '1.5%',
    paddingLeft: '2%',
    paddingRight: '5%',
    paddingBottom: '5%',
    backgroundColor: '#bdac9791',
    marginRight: '2%',
    marginLeft: '2%'
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

export default function EnEsperaMarket() {

    const [justify, setJustify] = useState(justifyOptions[0]);
    const [alignItems, setAlignItems] = useState(alignOptions[1]);

    
  const [Departamento, setDepartamento] = useState(null);
  const [Categorias, setCategorias] = useState(null);

  useEffect(() => {
    const CargarData = async () => {
      await axiosInstance
        .get("/departamentos",)
        .then((result) => {
          setDepartamento(result.data.registros);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    };
    CargarData();
  }, []);

  useEffect(() => {
    if (Departamento !== null) {
      console.log("Informacion obtenida...");
    }
  }, [Departamento]);

  
  useEffect(() => {
    const CargarData = async () => {
      await axiosInstance
        .get("/categorias",) 
        .then((result) => {
          setCategorias(result.data.registros);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    };
    CargarData();
  }, []);

  useEffect(() => {
    if (Categorias !== null) {
      console.log("Informacion obtenida...");
    }
  }, [Categorias]);



  const [DatosMosrar, setDatosMosrar] = useState(null);


  const [PiezasFiltro, setPiezasFiltro] = useState(null);

  useEffect(() => {
    const CargarData = async () => {
      await axiosInstance
        .get("/piezas/filtroPieza",{

        }) 
        .then((result) => {
          setPiezasFiltro(result.data.registros);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    };
    CargarData();
  }, []);

  useEffect(() => {
    if (PiezasFiltro !== null) {
      console.log("Informacion obtenida...");
    }
  }, [PiezasFiltro]);






  return (
    <Flex gap="middle" vertical style={{}} /*Contenedor externo*/>

        <Flex style={boxStyle} /*contenedor de inputs*/>    

          <Flex gap="middle" vertical style={{width:'50%', marginRight:'2%'}} /*Contenedor izquierdo*/>
            <Form.Item label="Filtrar por ubicacion">
                <Select
                  defaultValue="Ubicacion"
                  style={{ }}
                  onChange={undefined}
                  options={
                    Departamento?.map((ele) => (
                      {
                        value: ele.Departamento,
                        label: ele.Departamento,
                      }
                    ))
                    }
                />

              <br/><br/>
              <label>Buscar repuesto por codigo</label>
              <Input placeholder='Ingresar codigo'/>
            </Form.Item>

            <Form.Item label="" style={{ width: "100%" }}>
                  <Button type="primary" onClick={{/* */}}>
                    Buscar
                  </Button>
            </Form.Item>
          </Flex>
    
    
          <Flex gap="middle" vertical style={{width:'45%', marginRight:'2%'}} /*Contenedor derecho*/>
            <Form.Item style={{paddingLeft: '2%',}}label="Filtrar por categoria">
                  <Select
                    defaultValue="Categoria"
                    style={{ }}
                    onChange={"Categoria"}
                    options={
                      Categorias?.map((ele) => (
                        {
                          value: ele.NombreCategoria,
                          label: ele.NombreCategoria,
                        }
                      ))
                      }
                  />
                  
              <br/><br/>
              <label>Comprar</label>
              <Input placeholder='Ingresar codigo'/>
            </Form.Item>
          </Flex>
        </Flex>



            
      <Flex style={boxStyle1} gap="middle" vertical>
          <Flex gap="middle">
            <ObjEsperaMarket DatosMosrar= {DatosMosrar} />
          </Flex>




      </Flex>
      
    </Flex>
  )
}
