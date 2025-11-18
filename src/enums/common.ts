export enum ESortDirection {
    DESC = 'desc',
    ASC = 'asc'
}

export enum ECustomerType {
    Customer = 1,
    Supplier
}

export enum EPaymentMethod {
    Cash = 1,
    BankTransfer,
    CreditCard,
    Other
}

export enum EOrderableType {
    SaleReceipt = 'sale_receipts',
    InboundOrder = 'inbound_orders'
}
export enum ResponeStatus {
    SUCCESS = 'success',
    ERROR = 'error'
}

export enum TypeDiscount {
    Invoice = 'invoice',
    Product = 'Product'
}

export enum EAction {
    Edit = 'edit',
    Delete = 'delete',
    Detail = 'detail',
    ChangePass = 'change_pass',
    QuickAccess = 'quick_access',
}

export enum EPrefixCode {
  CSKCB = 'CSKCB_',
  NCC = 'NCC_',
  KH = 'KH_',
  NSX = 'NSX_',
  HD = 'HD_',
  SCT = 'SCT_'
}

export enum PaymentType {
  PayNow = 'pay_now',
  Debit = 'debit',
  Credit = 'credit',
  Return = 'return'
}


export enum OrderType {
  IMPORT = 'import',
  RT_SUPPLIER = 'ret_sup',
  RF_CUSTOMER = 'ret_cus',
  SALE_RECEIPT = 'sale_receipt',
  INC_IMPORT = 'inc_import',
  OIN_IMPORT = 'oin_import',

}

export enum ReceiptType {
    Normal = 1,
    Prescription
}

export enum Gender {
    Male = 1,
    Female
}
export enum EAlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export enum EProductParams {
  CATEGORY_ID = 'category_id',
  IMPORT_PRICE = 'import_price',
  SUPPLIER_ID = 'supplier_id',
  GROUP_ID = 'group_id',
  SALE_PRICE = 'sale_srice',
  MANUFACTURER_ID = 'manufacturer_id',
  IS_IN_STOCK = 'is_in_stock'
}

export enum ETypeAccount {
  COMPANY = 'company',
  PHARMACY = 'pharmacy',
}

export enum EDateFormatSubmit {
  YYYYMMDD = 'YYYY-MM-DD',
  DDMMYYYY = 'DD/MM/YYYY',
  HHmm = "HH:mm"
}

export const ERegExp = {
  PHONE: /^(?:0\d{9,10}|\+?84\d{8,9}|(?:1900|1800)\d{4,7}|1\d{2,4})$/,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  TAXCODE: /^(?=.{1,20}$)\d+(?:-\d+)*$/,
  NOCHARSPECIAL: /^[\p{L}\p{N}\s]+$/u,
  NUMBER: /^[0-9]+$/,
};

export enum PrefixId {
  QuickAction = 'quick_action'
}

export enum StatusResult {
  Failed,
  Passed
}

export enum Permission {
  Owner = 'owner'
}

export enum SummaryReportType {
  BusinessResult = 'result',
  TransactionDetail = 'payment' 
}

export enum StockAlertReportType {
  ExpiringStock = "expiring_stock",
  OutOfStock = "out_of_stock"
}

export enum EOrderType {
  IMPORT = 'import',
  INC_IMPORT = 'inc_import',
  OIN_IMPORT = 'oin_import',
  EXPORT = 'export',
}

export enum MODAL_SIZE {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export enum SPACE_SIZE {
  XS = 1,
  SM = 2,
  MD = 3,
  LG = 4,
  XL = 5
}

export enum INVENTORY_TYPE {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  EQUAL_ZERO = 'equal_zero',
  HAS_ORDER_RECEIPT = 'has_order_receipt',
  ALL = 'all'
}

export enum WithRelation {
  Supplier = 'supplier'
}

export enum TDEBT_DETAIL {
  PAYMENT_VOUCHERS = 'payment-vouchers',
  RECEIPT_VOUCHERS = 'receipts',
  INBOUND_ORDERS = 'inbound-orders',
  RETURN_ORDERS = 'return-orders',
  RETURN_SUPPLIER = 'return-suppliers',
  SALE_RECEIPT = 'sale-receipts',
}

export enum NameUrlExportExampleExcel {
  OpeningInventory = 'opening-inventories',
  Products = 'products',
  InboundOrder = 'inbound-orders',
  InventoryCheck = 'inventory-checks'
}

export enum TypeOrderDrugNational {
  Inbound = 'inbound',
  Outbound = 'outbound'
}