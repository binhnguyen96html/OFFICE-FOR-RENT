export interface ICustomerForSearch {
    fullName: string;
    phone: string;
    email: string;
    staffId: string;
    demand: string;
    note: string;
}

export const initialCustomerForSearch: ICustomerForSearch = {
    fullName: "",
    phone: "",
    email: "",
    staffId: "",
    demand: "",
    note: "",
}

export interface ICustomerForInsert {
    fullName: string;
    phone: string;
    email: string;
    staffId: string;
    demand: string;
    note: string;
}

export const initialCustomerForInsert: ICustomerForInsert = {
    fullName: "",
    phone: "",
    email: "",
    staffId: "",
    demand: "",
    note: ""
}