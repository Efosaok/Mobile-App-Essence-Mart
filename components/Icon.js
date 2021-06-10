import React, { memo, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { Icon } from 'galio-framework';

import nowConfig from '../assets/config/now.json';

const NowExtra = require('../assets/font/now.ttf');

const IconNowExtra = createIconSetFromIcoMoon(nowConfig, 'NowExtra');

const IconExtra = memo((props) => {
  const [state, setState]= useState({
    fontLoaded: false
  })

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({ NowExtra });
      setState({ fontLoaded: true });
    }
    loadFont()
  }, [])

  const { name, family, ...rest } = props;
  const { fontLoaded } = state;

  if (name && family && fontLoaded) {
    if (family === 'NowExtra') {
      return <IconNowExtra name={name} family={family} {...rest} />;
    }
    return <Icon name={name} family={family} {...rest} />;
  }

  return null;
})

export default IconExtra;
