import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Converter/Converter.module.css';
import { nanoid } from 'nanoid';

export default function Converter({
  mainValue,
  selectedCurrency,
  changeCurrency,
  amount,
  changeAmount,
}) {
  return (
    <div className={styles.converter}>
      <input
        className={styles.converterInput}
        type="number"
        value={amount}
        onChange={changeAmount}
      />
      <select
        className={styles.selectedConvert}
        value={selectedCurrency}
        onChange={changeCurrency}
      >
        {mainValue.map(value => (
          <option value={value.ccy} key={nanoid()}>
            {value.ccy}
          </option>
        ))}
      </select>
    </div>
  );
}

Converter.propTypes = {
  mainValue: PropTypes.array.isRequired,
  selectedCurrency: PropTypes.string,
  changeCurrency: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  changeAmount: PropTypes.func.isRequired,
};
