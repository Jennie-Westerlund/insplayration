import React from 'react';
import styles from './Button.module.css';

export const buttonStyles = styles;

const Button = ({ children, className, ...props }) => {
  const buttonClassName = className ? `${styles.button} ${className}` : styles.button;
  
  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;