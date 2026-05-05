import { serviceRequest } from './gateway';

export interface InventoryResponse {
  id: number;
  merchantId: number;
  productId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  status: string;
  category: string;
}

export interface MerchantResponse {
  id: number;
  userId: number;
  businessName: string;
  businessType: string;
  status: string;
  rating: number;
}

export async function getInventory(merchantId: number): Promise<InventoryResponse[]> {
  try {
    const { data } = await serviceRequest<InventoryResponse[]>(
      'merchant-service',
      `/api/inventory/${merchantId}`
    );
    return data;
  } catch (err) {
    console.error(`Failed to fetch inventory for merchant ${merchantId}`, err);
    return [];
  }
}

export async function getMerchant(id: number): Promise<MerchantResponse> {
  const { data } = await serviceRequest<MerchantResponse>(
    'merchant-service',
    `/api/merchants/${id}`
  );
  return data;
}

export async function getMarketplaceProducts(): Promise<InventoryResponse[]> {
  // Option A: Semi-dynamic marketplace by querying known demo merchant IDs
  const demoMerchantIds = [1, 2, 3]; 
  const inventoryPromises = demoMerchantIds.map(id => getInventory(id));
  
  const results = await Promise.all(inventoryPromises);
  // Flatten array of arrays
  return results.flat();
}
