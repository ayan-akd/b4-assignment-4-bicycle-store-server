import Shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';
import config from '../../config';

const shurjopay = new Shurjopay();
shurjopay.config(
  config.sp_endpoint!,
  config.sp_username!,
  config.sp_password!,
  config.sp_prefix!,
  config.sp_return_url!,
);

// shurjopay.makePayment()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makePayment = async (paymentPayload: any):Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      },
    );
  });
};

const verifyPayment = (order_id: string): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export const orderUtils = {
  makePayment,
  verifyPayment
};
