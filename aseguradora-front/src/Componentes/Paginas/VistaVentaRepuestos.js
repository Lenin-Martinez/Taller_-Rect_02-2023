import "../../App.css";

import React, { useState } from "react";
import { Space, Layout, Menu, Button, Form } from "antd";

import {
  PlusCircleOutlined,
  PauseCircleOutlined,
  BranchesOutlined,
  CheckCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import AsegRequisicion from "./AsegRequisicion";
import AsegProceso from "./AsegProceso";
import AsegFin from "./AsegFin";
import VentAgregar from "./VentAgregar";
import VentEditar from "./VentEditar";
import VentEliminar from "./VentEliminar";

const { Header, Footer, Sider, Content } = Layout;


export default function VistaVentaRepuestos( { PagMostrada } ) {
    
  const [collapsed, setCollapsed] = useState(false);
  const [componenteActivo, setComponenteActivo] = useState("1");

  const LimpiarSesion =()=>{
    localStorage.clear();
    PagMostrada("100");
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 50]}>
    <Layout>
      <Header className="App-header">
        <div className="Encabezado">
        <img src={require('../Imagenes/LlantaLogo.png')} className="App-logo" alt="logo" />
        <p>
            Venta de repuestos 
        </p>
        </div>
      </Header>

      <Layout hasSider>
        <Sider width="300" trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onSelect={(e) => {
              setComponenteActivo(e.key);
            }}
            items={[
              {
                key: "1",
                icon: <PlusCircleOutlined />,
                label: "Agregar repuesto",
              },
              {
                key: "2",
                icon: <PauseCircleOutlined />,
                label: "Editar repuesto",
              },
              {
                key: "3",
                icon: <BranchesOutlined />,
                label: "Eliminar repuesto",
              },
            ]}
          />
          
          <Form.Item style={{}}>
              <Button type="primary" style={{backgroundColor: 'darkred', width:'100%'}} 
              onClick={LimpiarSesion}>Cerrar sesion</Button>
          </Form.Item>

        </Sider>

        <Layout>

          <Header
            style={{
              padding: 0,
              background: "#7dbcea",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 30,
                height: 64,
                }}
              >
                  {componenteActivo === "1" ? (
                    <label>Agregar repuesto</label>
                  ) : componenteActivo === "2" ? (
                    <label>Editar repuesto</label>
                  ) : (
                    <label>Eliminar repuesto</label>
                  )}
              </Button>
          </Header>






          <Content
            style={{
              margin: "24px 16px",
              minHeight: 600,
            }}
          >
            {componenteActivo === "1" ? (
                <VentAgregar/>
              ) : componenteActivo === "2" ? (
                <VentEditar/>
              ) : (
                <VentEliminar/>
              )}

          </Content>





        </Layout>
      </Layout>
      <Footer className="Footer"></Footer>
    </Layout>
  </Space>

)
}
