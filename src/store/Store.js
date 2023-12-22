import { atom } from "recoil";

export const companyLoginStore = atom({
    key:'keyCompanyLogin',
    default: {},
})
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
export const shopStore = atom({
    key:'keyShop',
    default: [],
})
export const headFormStore = atom({
    key:'keyHeadForm',
    default: '',
})
export const openPrintStore = atom({
    key:'keyOpenPrint',
    default: '',
})