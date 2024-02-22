export type Quotation = {
  email: string,
  name: string,
  razonSocial: string,
  ruc: string,
  message: string,
  phone: string,
  nroCubos: string,
  precioUnitario: string,
  nroCotizacion: string,
}

export type Product = {
  description: string,
  unit: string,
  quantity: string,
  unitPrice: string,
  subtotal: string
}

export type PurchaseOrder = {
  nroOrder: string,
  ruc: string,
  companyName: string,
  address: string,
  paymentMethod: string,
  currency: string,
  proyect: string,
  products: Product[]
  total: string,
  observations: string,
  attachSignature: boolean,
}

export type Dispatch = {
  date: string;
  material: string;
  plate: string;
  invoice: string;
  guide: string;
  m3: string;
  client: string;
  project: string;
  carrier: string;
  price: string;
  igv: string;
  total: string;
  paymentDone: string;
}
