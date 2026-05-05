import { serviceRequest } from './gateway';

export interface WalletResponse {
  id: number;
  userId: number;
  currency: string;
  balance: number;
  reservedBalance: number;
}

export interface TransactionResponse {
  id: number;
  transactionRef: string;
  userId: number;
  walletId: number;
  type: string;
  amount: number;
  currency: string;
  status: string;
  reference: string;
  createdDate: string;
}

export interface WalletActionRequest {
  userId: number;
  amount: number;
  currency: string;
  transactionRef?: string;
}

export interface TransferRequest {
  fromUserId: number;
  toUserId: number;
  amount: number;
  currency: string;
  transactionRef?: string;
}

export async function getWallets(userId: number): Promise<Record<string, WalletResponse>> {
  const { data } = await serviceRequest<Record<string, WalletResponse>>(
    'wallet-service',
    `/api/wallets/${userId}`
  );
  return data;
}

export async function creditWallet(request: WalletActionRequest): Promise<TransactionResponse> {
  const { data } = await serviceRequest<TransactionResponse>(
    'wallet-service',
    '/api/wallets/credit',
    { method: 'POST', body: request }
  );
  return data;
}

export async function debitWallet(request: WalletActionRequest): Promise<TransactionResponse> {
  const { data } = await serviceRequest<TransactionResponse>(
    'wallet-service',
    '/api/wallets/debit',
    { method: 'POST', body: request }
  );
  return data;
}

export async function transferWallet(request: TransferRequest): Promise<void> {
  await serviceRequest<void>(
    'wallet-service',
    '/api/wallets/transfer',
    { method: 'POST', body: request }
  );
}

export async function getTransactions(userId: number): Promise<TransactionResponse[]> {
  const { data } = await serviceRequest<TransactionResponse[]>(
    'wallet-service',
    `/api/transactions?userId=${userId}`
  );
  return data;
}
