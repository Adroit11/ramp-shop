import { getCurrenciesFn } from '@/services/products';
import { getErrorMessage } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Cookies from 'js-cookie';

export interface CurrencyType {
  uid: string;
  name: string;
  code: string;
  exchange_rate: number;
}
const RAMP_CURRENCY = 'ramp_currency';

export const useCurrency = (onClose?: () => void) => {
  const [currencies, setCurrencies] = useState<CurrencyType[] | null>(null);
  const [rampCurrency, setRampCurrency] = useState(
    Cookies.get(RAMP_CURRENCY) ?? 'USD',
  );

  const getCurrencyQuery = useQuery(
    ['get_currencies'],
    () => {
      return getCurrenciesFn();
    },
    {
      refetchInterval: false,
      retry: false,
      onSuccess: (data) => {
        setCurrencies(data?.data);
      },
    },
  );

  useEffect(() => {
    if (rampCurrency) {
      Cookies.set(RAMP_CURRENCY, rampCurrency);
    }
  }, [rampCurrency]);

  return {
    currencies,
    rampCurrency,
    setRampCurrency,
    get: { ...getCurrencyQuery },
  };
};
