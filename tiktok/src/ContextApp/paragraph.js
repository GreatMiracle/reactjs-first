import React, { useContext } from 'react';
import './contextApp.css';
import ThemeContextBase from './createContextBase';
function Paragraph() {
  const theme = useContext(ThemeContextBase);

  return <p className={theme}>Đây là paragraph nhé ae</p>;
}
export default Paragraph;
