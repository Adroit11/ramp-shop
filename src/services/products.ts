import { getErrorMessage } from '@/utils/helpers';
import request from './index';

export const getProductsFn = async () => {
  try {
    const res = await request.get('/marketplace/products');

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

export const getProductDetailFn = async (uid: string) => {
  try {
    const res = await request.get(`/marketplace/shop?uid=${uid}`);

    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
