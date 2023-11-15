import { Flex, } from 'antd'
import React, {useState} from 'react'
import EnEsperaMarket from '../Elementos/EnEsperaMarket';
import EnEsperaCarrito from '../Elementos/EnEsperaCarrito';

const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];

const alignOptions = ['flex-start', 'center', 'flex-end'];

export default function EnEsperaAceptar() {

    const [justify, setJustify] = useState(justifyOptions[0]);
    const [alignItems, setAlignItems] = useState(alignOptions[0]);

  return (
    <Flex style={{width:'100%'}} /*gap="middle" vertical justify={justify} align={alignItems}*/ >
      <Flex style={{width:'100%', marginRight: '1%', backgroundColor: ''}} >
        <EnEsperaMarket/>
      </Flex>

      <Flex style={{width:'50%', backgroundColor: ''}} >
        <EnEsperaCarrito/>
      </Flex>
    </Flex>
  )
}



