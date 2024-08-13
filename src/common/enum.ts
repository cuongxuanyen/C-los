export enum EPageType {
  DUPLICATE = "duplicate",
  CREATE = "create",
  UPDATE = "update",
  VIEW = "view",
}

export enum EInvoiceType {
  INV = "INV",
  CRE = "CRE",
  DEB = "DEB",
  REF = "REF",
  SB_INV = "SBI",
  SB_CRE = "SBC",
  SB_DEB = "SBD",
  SB_REF = "SBR",
}

export enum EIdentify {
  BUSINESS = "0",
  IDENTIFY = "1",
  PASSPORT = "2",
  ARMY = "3",
}

export enum EObjectType {
  ALL = 0,
  ORG = 2,
  PERSONAL = 1,
}

export enum EInvoiceKeyType {
  INVOICE = "01",
  DEBIT_NOTE = "03",
  CREDIT_NOTE = "02",
  REFUND_NOTE = "04",
  SELF_BILL_INVOICE = "11",
  SELF_BILL_DEBIT_NOTE = "13",
  SELF_BILL_CREDIT_NOTE = "12",
  SELF_BILL_REFUND_NOTE = "14",
}

export enum EInvoiceStatus {
  DRAFT = "0",
  IN_PROGRESS = "-1",
  WAITING_SIGN = "1",
  SIGNED = "2",
  SENDING_INVOICE = "3",
  SUBMITED = "4",
  REJECT_INVOICE = "5",
  VALID = "6",
  INVALID = "7",
  CANCEL = "8",
  REJECT_BY_EIVY = "9",
}

export enum ETypeOfInvoice {
  NORMAL = 0,
  CONSOLIDATED = 1,
}

export enum EInvHistoryType {
  OUTWARD = 0,
  INWARD = 1,
}

export enum ENotiStatus {
  UNREAD = 0,
  READ = 1,
}

export enum ENotiPriority {
  HIGH = 2,
  MEDIUM = 1,
  LOW = 0,
}

export enum ETypeInvoice {
  INVOICE = "0",
  RECEIPT = "1",
  CRE_INVOICE = "2",
  CONSOLIDATE = "3",
}

export const enum EStatusReceipt {
  RECEIPT = 0,
  CONSOLIDATED = 1,
  INVOICE = 2,
}
