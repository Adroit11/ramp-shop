import { getErrorMessage } from '@/utils/helpers';
import request from './index';

export const getProductsFn = async (currency_code?: string) => {
  try {
    const res = await request.get(
      `/marketplace/products?currency_code=${currency_code ?? 'USD'}`,
    );

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getShopsFn = async () => {
  try {
    const res = await request.get('/marketplace');

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export interface CreateOrderDataType {
  product_uid: string;
  quantity: number;
  note: string;
  shipping_address: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
}

export const createOrderFn = async (data: CreateOrderDataType) => {
  try {
    const res = await request.post(`/marketplace/orders/create`, data);

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getProductDetailFn = async ({
  uid,
  currency_code = 'USD',
}: {
  uid: string;
  currency_code?: string;
}) => {
  try {
    const res = await request.get(
      `/marketplace/shop?uid=${uid}&currency_code=${currency_code}`,
    );

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getCurrenciesFn = async () => {
  try {
    const res = await request.get('/settings/currencies');

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
