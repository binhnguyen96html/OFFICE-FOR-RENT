import { FaChevronUp, FaChevronLeft } from "react-icons/fa";
import {useState} from "react";
import FormInput from "../components/FormInput";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";

const districts = [
    'District 1',
    'District 2',
    'District 3',
]

export interface FormState {
    name: string;
    floorArea: string;
    district: string;
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
    assignedStaff: string;
    type: Array<string>;
}

const initialFormState: FormState = {
    name: '',
    floorArea: '',
    district: '',
    ward: '',
    street: '',
    numberOfBasement: '',
    direction: '',
    level: '',
    rentAreaFrom: '',
    rentAreaTo: '',
    rentPriceFrom: '',
    rentPriceTo: '',
    managerName: '',
    managerPhone: '',
    assignedStaff: '',
    type: []
}

export default function RentManagement() {
const [openSearch, setOpenSearch] = useState(true);
const [form, setForm] = useState<FormState>(initialFormState)

    const inputChangeHandler = (field: keyof FormState, enteredValue: string | Array<string>) => {
        setForm((curForm) => ({
            ...curForm,
            [field]: enteredValue
        }))
        console.log('form: ', form)
    }

    return (
        <div>
            <div className='bg-gray-50 rounded shadow'>
                <div className="flex justify-between items-center bg-cyan-600 p-3 text-white rounded">
                    <div className='italic'>Search buildings</div>
                    <div
                        onClick={() => setOpenSearch(!openSearch)}
                        className="cursor-pointer transition-transform duration-500"
                    >
                        <div
                            className={`transform ${
                                openSearch ? "rotate-0" : "rotate-90"
                            } transition-transform duration-500`}
                        >
                            <FaChevronLeft />
                        </div>
                    </div>
                </div>

                {openSearch && (
                    <div className='p-6'>
                        <div className='md:grid grid-cols-2 gap-4'>
                            <FormInput
                                label={'Name'}
                                inputChangeHandler={inputChangeHandler}
                                name={'name'}
                                value={form.name}
                            />
                            <FormInput
                                label={'Floor Area'}
                                inputChangeHandler={inputChangeHandler}
                                name={'floorArea'}
                                value={form.floorArea}
                            />
                        </div>


                        <div className='md:grid grid-cols-3 gap-4 mt-2'>
                            <Dropdown
                                label={'Districts'}
                                value={districts}
                            />
                            <FormInput
                                label={'Ward'}
                                inputChangeHandler={inputChangeHandler}
                                name={'ward'}
                                value={form.ward}
                            />
                            <FormInput
                                label={'Street'}
                                inputChangeHandler={inputChangeHandler}
                                name={'street'}
                                value={form.street}
                            />
                        </div>

                        <div className='md:grid grid-cols-3 gap-4 mt-2'>
                            <FormInput
                                label={'Number of basement'}
                                inputChangeHandler={inputChangeHandler}
                                name={'numberOfBasement'}
                                value={form.numberOfBasement}
                            />
                            <FormInput
                                label={'Direction'}
                                inputChangeHandler={inputChangeHandler}
                                name={'direction'}
                                value={form.direction}
                            />
                            <FormInput
                                label={'Level'}
                                inputChangeHandler={inputChangeHandler}
                                name={'level'}
                                value={form.level}
                            />
                        </div>

                        <div className='md:grid grid-cols-4 gap-4 mt-2'>
                            <FormInput
                                label={'Area from'}
                                inputChangeHandler={inputChangeHandler}
                                name={'rentAreaFrom'}
                                value={form.rentAreaFrom}
                            />
                            <FormInput
                                label={'Area to'}
                                inputChangeHandler={inputChangeHandler}
                                name={'rentAreaTo'}
                                value={form.rentAreaTo}
                            />
                            <FormInput
                                label={'Rent price from'}
                                inputChangeHandler={inputChangeHandler}
                                name={'rentPriceFrom'}
                                value={form.rentPriceFrom}
                            />
                            <FormInput
                                label={'Rent price to'}
                                inputChangeHandler={inputChangeHandler}
                                name={'rentPriceTo'}
                                value={form.rentPriceTo}
                            />
                        </div>

                        <div className='md:grid grid-cols-3 gap-4 mt-2'>
                            <FormInput
                                label={'Manager Name'}
                                inputChangeHandler={inputChangeHandler}
                                name={'managerName'}
                                value={form.managerName}
                            />
                            <FormInput
                                label={'Manager Phone'}
                                inputChangeHandler={inputChangeHandler}
                                name={'managerPhone'}
                                value={form.managerPhone}
                            />
                            <Dropdown
                                label={'Select assigned staff'}
                                value={districts}
                            />
                        </div>
                        <div className='mt-2 flex gap-4'>
                            <CheckBox label={'Tang tret'}/>
                            <CheckBox label={'Nguyen can'}/>
                            <CheckBox label={'Noi that'}/>
                        </div>

                        <div className='mt-2 '>
                            <Button title='Search'/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}