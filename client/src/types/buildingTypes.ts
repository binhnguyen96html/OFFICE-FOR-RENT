export interface FormStateForSearch {
    name: string;
    floorArea: string;
    districtCode: string;
    ward: string;
    street: string;
    numberOfBasement: string;
    direction: string;
    level: string;
    rentAreaFrom: string;
    rentAreaTo: string;
    rentPriceFrom: string;
    rentPriceTo: string;
    managerName: string;
    managerPhone: string;
    staffId: string;
    rentType_s: string;
}

export const initialFormStateForSearch: FormStateForSearch = {
    name: "",
    floorArea: "",
    districtCode: "",
    ward: "",
    street: "",
    numberOfBasement: "",
    direction: "",
    level: "",
    rentAreaFrom: "",
    rentAreaTo: "",
    rentPriceFrom: "",
    rentPriceTo: "",
    managerName: "",
    managerPhone: "",
    staffId: "",
    rentType_s: "",
};



export interface FormStateForInsert{
    name: string;
    street: string;
    ward: string;
    districtId: number | null;
    structure: string;
    numberOfBasement: number | null;
    floorArea: number | null;
    direction: string;
    level: string;
    rentPrice: number | null;
    rentPriceDescription: string;
    serviceFee: string;
    carFee: string;
    motorbikeFee: string;
    overtimeFee: string;
    waterFee: string;
    electricityFee: string;
    deposit: string;
    payment: string;
    rentTime: string;
    decorationTime: string;
    brokerageFee: number | null;
    note: string;
    linkOfBuilding: string;
    map: string;
    image: string;
    managerName: string;
    managerPhone: string;
    rentType_s: string;
    rentArea_s: string;
    rentAreaDescription: string;
}

export const initialFormStateForInsert: FormStateForInsert = {
    name: '',
    street: '',
    ward: '',
    districtId : null,
    structure: '',
    numberOfBasement : null,
    floorArea : null,
    direction: '',
    level: '',
    rentPrice : null,
    rentPriceDescription: '',
    serviceFee: '',
    carFee: '',
    motorbikeFee: '',
    overtimeFee: '',
    waterFee: '',
    electricityFee: '',
    deposit: '',
    payment: '',
    rentTime: '',
    decorationTime: '',
    brokerageFee : null,
    note: '',
    linkOfBuilding: '',
    map: '',
    image: '',
    managerName: '',
    managerPhone: '',
    rentType_s: '',
    rentArea_s: "",
    rentAreaDescription: '',
};