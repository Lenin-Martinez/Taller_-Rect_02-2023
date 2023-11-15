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

import EncabezadoGeneral from "./EncabezadoGeneral";
import Ingresar from "../Paginas/Ingresar";
import EnEspera from "../Paginas/EnEspera";
import EnProceso from "../Paginas/EnProceso";
import Finalizados from "../Paginas/Finalizados";

const { Header, Footer, Sider, Content } = Layout;

export default function MostrarContenidoGeneral( { PagMostrada } ) {

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
          <EncabezadoGeneral />
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
                  label: "Ingresar incidente",
                },
                {
                  key: "2",
                  icon: <PauseCircleOutlined />,
                  label: "Incidentes en espera",
                },
                {
                  key: "3",
                  icon: <BranchesOutlined />,
                  label: "Incidentes en proceso",
                },
                {
                  key: "4",
                  icon: <CheckCircleOutlined />,
                  label: "Incidentes finalizados",
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
                      <label>Ingresar incidente</label>
                    ) : componenteActivo === "2" ? (
                      <label>Incidente en espera</label>
                    ) : componenteActivo === "3" ? (
                      <label>Incidente en proceso</label>
                    ) : (
                      <label>Incidente finalizado</label>
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
                <Ingresar/>
              ) : componenteActivo === "2" ? (
                <EnEspera/>
              ) : componenteActivo === "3" ? (
                <EnProceso/>
              ) : (
                <Finalizados/>
              )}
            </Content>


          </Layout>
        </Layout>
        <Footer className="Footer"></Footer>
      </Layout>
    </Space>

  )
}
