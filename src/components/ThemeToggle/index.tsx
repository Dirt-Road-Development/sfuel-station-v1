/**
 * @author Sawyer Cutler
 * @copyright 2022. Sawyer Cutler
*/

import { useContext, useEffect } from 'react';
import { LightMode, DarkMode } from '@styled-icons/material'
import * as Components from './styles';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeToggle = () => {

  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const toggle = () => {
    if (document.body.hasAttribute("data-theme")) {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", "dark");
    }
    toggleTheme();
  }

  useEffect(() => {
    if (isDarkTheme) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Components.Container>
      <Components.IconContainer onClick={(e: { preventDefault: () => void }) => {
        e.preventDefault();
        toggle();
      }}>
        {isDarkTheme ? <DarkMode size="36" /> : <LightMode size="36" />}
      </Components.IconContainer>
    </Components.Container>
  );
};

export default ThemeToggle;
