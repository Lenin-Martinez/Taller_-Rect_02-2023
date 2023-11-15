import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Flex,
  Upload,
  message,
  Spin,
  Select,
  Modal,
} from "antd";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../config/axios-config";

const boxStyle = {
  /*borderRadius: 6,
  border: '2px solid',
  paddingTop: '10%',
  paddingLeft: '1%',
  paddingRight: '2%',
  paddingBottom: '10%',*/
  backgroundColor: "#bdac9791",
};

const justifyOptions = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];

const alignOptions = ["flex-start", "center", "flex-end"];

export default function Ingresar() {
  //Datos Formulario
  const [cliente, setcliente] = useState(null);
  const [marca, setmarca] = useState(null);
  const [modelo, setmodelo] = useState(null);
  const [placa, setplaca] = useState(null);
  const [color, setcolor] = useState(null);
  const [fechaIngreso, setfechaIngreso] = useState(null);
  const [detalles, setdetalles] = useState(null);
  const [imagen, setimagen] = useState(null);
  const [nombreImagen, setnombreImagen] = useState(null);

  //Carga Datos Base de Datos
  const [datosClientes, setdatosClientes] = useState(null);
  const [datosMarcas, setdatosMarcas] = useState(null);

  const [justify, setJustify] = React.useState(justifyOptions[1]);
  const [alignItems, setAlignItems] = React.useState(alignOptions[1]);

  const [componentSize, setComponentSize] = useState("default");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {   setIsModalOpen(true); };
  const handleOk = () => {    setIsModalOpen(false);};
  const handleCancel = () => { setIsModalOpen(false); };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
 
  useEffect(() => {
    const CargarClientes = async () => {
      await axiosInstance
        .get("/reparaciones/clientes")
        .then((result) => {
          let objClientes = [];
          result.data.registros.map((ele) => {
            objClientes.push({
              value: ele.idCliente,
              label: ele.NombreCliente,
            });
          });
          setdatosClientes(objClientes);
          setcliente(result.data.registros[0].idCliente);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    };
    CargarClientes();

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
    if (datosMarcas !== null && datosClientes !== null) {
      console.log("Data Cargada");
    }
  }, [datosMarcas, datosClientes]);

  const CambioCliente = (value) => {
    setcliente(value);
  };

  const CambioMarca = (value) => {
    setmarca(value);
  };

  const CambioFecha = (dateString) => {
    setfechaIngreso(dateString);
  };

  const GuardarIncidente = async () => {
    await axiosInstance
      .post("/reparaciones/registrar", {
        modelo: modelo,
        placa: placa,
        fechaIngreso: fechaIngreso,
        detalles: detalles,
        idCliente: cliente,
        idMarca: marca,
        idTaller: 1,
        imagen: imagen,
        imagenTitulo: nombreImagen,
        color: color,
      })
      .then((result) => {
        showModal();
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
    <Flex style={boxStyle} justify={justify} gap="middle" vertical>
      <h2 style={{ marginLeft: "40%" }}>Registrar Incidente</h2>

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
          <Flex gap="middle" vertical style={{ width: "50%" }}>
            <Form.Item label="Nombre de Cliente">
              <Select
                placeholder="Seleccione un Cliente"
                defaultValue={cliente}
                onChange={CambioCliente}
                style={{
                  width: "100%",
                }}
                options={datosClientes}
              />
            </Form.Item>

            <Form.Item label="Registrar Marca">
              <Select
                placeholder="Seleccione una Marca"
                defaultValue={marca}
                onChange={CambioMarca}
                style={{
                  width: "100%",
                }}
                options={datosMarcas}
              />
            </Form.Item>

            <Form.Item label="Registrar Modelo">
              <Input
                onChange={(e) => {
                  setmodelo(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="Ingresar N. de Placa">
              <Input
                onChange={(e) => {
                  setplaca(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="Ingresar Color">
              <Input
                onChange={(e) => {
                  setcolor(e.target.value);
                }}
              />
            </Form.Item>
          </Flex>

          <Flex
            gap="middle"
            vertical
            style={{ width: "50%" }} /*Contenedor derecho*/
          >
            <Form.Item label="Fecha de ingreso">
              <DatePicker
                style={{ width: "85%" }}
                format={"YYYY-MM-DD"}
                onChange={CambioFecha}
              />
            </Form.Item>

            <Form.Item
              name={["user", "informacion"]}
              label="Informacion detallada"
            >
              <Input.TextArea
                style={{ width: "85%", minHeight: 90, maxHeight: 90 }}
                onChange={(e) => {
                  setdetalles(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              label="Cargar fotografia"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
              />
            </Form.Item>

            <Form.Item label="" style={{ marginLeft: "42%" }}>
              <Button type="primary" onClick={GuardarIncidente}>
                Guardar Nuevo Incidente
              </Button>
              <Modal title="Completado" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Registro Realizado</p>
        </Modal>
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
}
