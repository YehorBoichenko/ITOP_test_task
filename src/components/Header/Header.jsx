import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Header/Header.module.css';

export default function Header({ mainValue }) {
  const filteredValue = mainValue.filter(value => value.ccy !== 'UAH');
  return (
    <div className={styles.position}>
      <ul className={styles.list}>
        {filteredValue.map((element, index) => (
          <li key={element.ccy + index} className={styles.item}>
            {element.ccy}: {Math.round(100 * element.buy) / 100}
            {element.base_ccy}
          </li>
        ))}
      </ul>
    </div>
  );
}

Header.propTypes = {
  mainValue: PropTypes.array.isRequired,
};
