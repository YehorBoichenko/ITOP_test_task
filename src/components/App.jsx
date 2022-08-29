import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import Converter from './Converter/Converter';
import Wrapper from './Wrapper/Wrapper';
import moment from 'moment';

const BASE_URL =
  'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

const UAH = {
  ccy: 'UAH',
  buy: '1.00',
  sale: '1.00',
};

const currentDate = `Exchange rate for ${moment(Date.now()).format(
  'DD-MM-YYYY'
)}`;

export const App = () => {
  const [mainValue, setMainValue] = useState([]);
  const [firstCurrency, setFirstCurrency] = useState();
  const [secondCurrency, setSecondCurrency] = useState();
  const [exchangeValue, setExchangeValue] = useState(1);
  const [exchangeOtherValue, setExchangeOtherValue] = useState(1);
  const [amountValue, setAmountValue] = useState(1);
  const [amountOtherCurrency, setAmountOtherCurrency] = useState(true);

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => [UAH, ...data])
      .then(data =>
        data.filter(
          value =>
            value.ccy === 'USD' || value.ccy === 'EUR' || value.ccy === 'UAH'
        )
      )
      .then(data => {
        setMainValue(data);
        const firstSelected = data[1].ccy;
        const secondSelected = data[0].ccy;
        setFirstCurrency(firstSelected);
        setSecondCurrency(secondSelected);
        setExchangeValue(data[1].buy);
        setExchangeOtherValue(data[0].buy);
      });
  }, []);

  useEffect(() => {
    if (firstCurrency != null) {
      const exchangeValue = mainValue.filter(
        value => value.ccy === firstCurrency
      );
      setExchangeValue(exchangeValue[0].buy);
    }
  }, [firstCurrency, mainValue]);

  useEffect(() => {
    if (secondCurrency != null) {
      const exchangeValue = mainValue.filter(
        value => value.ccy === secondCurrency
      );
      setExchangeOtherValue(exchangeValue[0].buy);
    }
  }, [secondCurrency, mainValue]);
  function firstChange(event) {
    setAmountValue(event.target.value);
    setAmountOtherCurrency(true);
  }
  function secondChange(event) {
    setAmountValue(event.target.value);
    setAmountOtherCurrency(false);
  }

  let toAmount;
  let fromAmount;

  if (amountOtherCurrency) {
    fromAmount = amountValue;
    toAmount = (exchangeValue * amountValue) / exchangeOtherValue;
    toAmount = Math.round(100 * toAmount) / 100;
  } else {
    toAmount = amountValue;
    fromAmount = (exchangeOtherValue * amountValue) / exchangeValue;
    fromAmount = Math.round(100 * fromAmount) / 100;
  }
  return (
    <>
      <Wrapper title={currentDate}>
        <Header mainValue={mainValue} />
      </Wrapper>
      <Wrapper title="Currency Converter">
        <Converter
          mainValue={mainValue}
          selectedCurrency={firstCurrency}
          changeCurrency={event => setFirstCurrency(event.target.value)}
          changeAmount={firstChange}
          amount={fromAmount}
        ></Converter>
        <Converter
          mainValue={mainValue}
          selectedCurrency={secondCurrency}
          changeCurrency={event => setSecondCurrency(event.target.value)}
          changeAmount={secondChange}
          amount={toAmount}
        ></Converter>
      </Wrapper>
    </>
  );
};
