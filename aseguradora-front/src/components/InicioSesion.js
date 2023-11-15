import React, { useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space, Row } from "antd";

const InicioSesion = () => {
  const [usuario, setusuario] = useState();
  const [contrasenia, setcontrasenia] = useState();
  const [token, settoken] = useState();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const IniciarSesion = () => {};

  return (
    <Row justify="center" align="middle">
      <Space direction="vertical">
        <Input
          placeholder="Ingrese usuario"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={(e) => setusuario(e.target.value)}
        />
        <Space direction="horizontal">
          <Input.Password
            placeholder="Ingrese contraseña"
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            onChange={(e) => setcontrasenia(e.target.value)}
          />
          <Button
            style={{
              width: 80,
            }}
            onClick={() => setPasswordVisible((prevState) => !prevState)}
          >
            {passwordVisible ? "Ocultar" : "Mostrar"}
          </Button>
        </Space>
        <Button onClick={IniciarSesion}>Iniciar Sesión</Button>
      </Space>
    </Row>
  );
};

export default InicioSesion;
