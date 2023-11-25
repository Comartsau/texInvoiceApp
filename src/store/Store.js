import { atom } from "recoil";

export const createInvoiceStore = atom({
    key:'keyCeateInvoice',
    default: false,
})
export const companyStore = atom({
    key:'keyCompany',
    default: [],
})
export const customerStore = atom({
    key:'keyCustomer',
    default: [],
})
export const productStore = atom({
    key:'keyProduct',
    default: [],
})