import React, {useState} from 'react';

import {
    Form,
    Flex,
    Segmented,
    Button,
    Input,
    Slider,
    Progress,
    Space,

  } from 'antd';
  import { PoweroffOutlined } from '@ant-design/icons';
  const boxStyle = {
    width: '100%',
    height: 240,
    borderRadius: 6,
    //border: '2px solid',
    paddingTop: '1.5%',
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '5%',
    backgroundColor: '#bdac9791'
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



export default function ObjAsegProceso() {
    
    const [justify, setJustify] = React.useState(justifyOptions[0]);
    const [alignItems, setAlignItems] = React.useState(alignOptions[0]);
  
    const formatter = (value) => `${value}%`;
  
    const [disabled, setDisabled] = useState(false);
    const onChange = (checked) => {
      setDisabled(checked);
    };
  
  return (
    <Flex gap="middle" vertical>

    <Flex style={boxStyle} justify={justify} align={alignItems} >
      <Form.Item label="Codigo"
                style={{width: '25%'}}
      >
        <Input />
        <br/><br/>
        <img src="https://th.bing.com/th/id/OIP.iwE3cgT35eYPOSj6nG2NjQHaEo?pid=ImgDet&rs=1" 
            style={{width:'100%', height:125}} 
        />
      </Form.Item>

      <Form.Item style={{
        paddingLeft: '3%',
        width: '25%',}}
      >
        <Form.Item>
            <label>Cliente:</label>
            <Input /><br/><br/>

            <label>N. Placa:</label>
            <Input /><br/><br/>

            <label>N. VIN:</label>
            <Input />
        </Form.Item>

      </Form.Item>

        <Form.Item name={['user', 'informacion']} 
                  style={{
                    paddingLeft: '3%',
                    marginTop: '2%',
                    width: '25%'}}
        >
          <Form.Item style={{width: '100%'}}>
            <label>Informacion detallada:</label>
            <Input.TextArea style={{width: '100%', height: 135, minHeight: 135, maxHeight: 135}}/>
          </Form.Item>
        </Form.Item>

      
      <Form.Item style={{ 
                paddingLeft: '5%', 
                paddingTop:'3%',}}>
        <Space wrap>
          < Progress type="circle" percent={50} />
        </Space>
      </Form.Item>


      
    </Flex>

    <br/>
  </Flex>
)
}
