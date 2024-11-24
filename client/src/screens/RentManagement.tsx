import {FaArrowRight, FaChevronLeft, FaEdit} from "react-icons/fa";
import {useState} from "react";
import FormInput from "../components/FormInput";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import {useGetBuildingsQuery} from "../store/slices/buildingsApiSlice";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

const districts = ["District 1", "District 2", "District 3"];

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
    name: "",
    floorArea: "",
    district: "",
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
    assignedStaff: "",
    type: [],
};

export default function RentManagement() {
    const [openSearch, setOpenSearch] = useState(true);
    const [form, setForm] = useState<FormState>(initialFormState);
    const [editBuildingModal, setEditBuildingModal] = useState(false);

    const {data, error, isLoading} = useGetBuildingsQuery({});
    console.log(data)

    const inputChangeHandler = (
        field: keyof FormState,
        enteredValue: string | Array<string>,
    ) => {
        setForm((curForm) => ({
            ...curForm,
            [field]: enteredValue,
        }));
        console.log("form: ", form);
    };

    const editBuildingHandler = (buildingId: number) => {
        console.log(buildingId)
    }

    return (
        <div>
            {/*SEARCH */}
            <div className="bg-gray-50 rounded shadow">
                <div className="flex justify-between items-center bg-cyan-600 p-3 text-white rounded">
                    <div className="italic">Search buildings</div>
                    <div
                        onClick={() => setOpenSearch(!openSearch)}
                        className="cursor-pointer transition-transform duration-500"
                    >
                        <div
                            className={`transform ${
                                openSearch ? "rotate-0" : "rotate-90"
                            } transition-transform duration-500`}
                        >
                            <FaChevronLeft/>
                        </div>
                    </div>
                </div>

                {openSearch && (
                    <div className="p-6">
                        <div className="md:grid grid-cols-2 gap-4">
                            <FormInput
                                label={"Name"}
                                inputChangeHandler={inputChangeHandler}
                                name={"name"}
                                value={form.name}
                            />
                            <FormInput
                                label={"Floor Area"}
                                inputChangeHandler={inputChangeHandler}
                                name={"floorArea"}
                                value={form.floorArea}
                            />
                        </div>

                        <div className="md:grid grid-cols-3 gap-4 mt-2">
                            <Dropdown label={"Districts"} value={districts}/>
                            <FormInput
                                label={"Ward"}
                                inputChangeHandler={inputChangeHandler}
                                name={"ward"}
                                value={form.ward}
                            />
                            <FormInput
                                label={"Street"}
                                inputChangeHandler={inputChangeHandler}
                                name={"street"}
                                value={form.street}
                            />
                        </div>

                        <div className="md:grid grid-cols-3 gap-4 mt-2">
                            <FormInput
                                label={"Number of basement"}
                                inputChangeHandler={inputChangeHandler}
                                name={"numberOfBasement"}
                                value={form.numberOfBasement}
                            />
                            <FormInput
                                label={"Direction"}
                                inputChangeHandler={inputChangeHandler}
                                name={"direction"}
                                value={form.direction}
                            />
                            <FormInput
                                label={"Level"}
                                inputChangeHandler={inputChangeHandler}
                                name={"level"}
                                value={form.level}
                            />
                        </div>

                        <div className="md:grid grid-cols-4 gap-4 mt-2">
                            <FormInput
                                label={"Area from"}
                                inputChangeHandler={inputChangeHandler}
                                name={"rentAreaFrom"}
                                value={form.rentAreaFrom}
                            />
                            <FormInput
                                label={"Area to"}
                                inputChangeHandler={inputChangeHandler}
                                name={"rentAreaTo"}
                                value={form.rentAreaTo}
                            />
                            <FormInput
                                label={"Rent price from"}
                                inputChangeHandler={inputChangeHandler}
                                name={"rentPriceFrom"}
                                value={form.rentPriceFrom}
                            />
                            <FormInput
                                label={"Rent price to"}
                                inputChangeHandler={inputChangeHandler}
                                name={"rentPriceTo"}
                                value={form.rentPriceTo}
                            />
                        </div>

                        <div className="md:grid grid-cols-3 gap-4 mt-2">
                            <FormInput
                                label={"Manager Name"}
                                inputChangeHandler={inputChangeHandler}
                                name={"managerName"}
                                value={form.managerName}
                            />
                            <FormInput
                                label={"Manager Phone"}
                                inputChangeHandler={inputChangeHandler}
                                name={"managerPhone"}
                                value={form.managerPhone}
                            />
                            <Dropdown label={"Select assigned staff"} value={districts}/>
                        </div>
                        <div className="mt-2 flex gap-4">
                            <CheckBox label={"Tang tret"}/>
                            <CheckBox label={"Nguyen can"}/>
                            <CheckBox label={"Noi that"}/>
                        </div>

                        <div className="mt-2 ">
                            <Button title="Search"><FaArrowRight /></Button>
                        </div>
                    </div>
                )}
            </div>

            {/*LIST OF BUILDINGS */}
            <div className='rounded shadow bg-gray-50 mt-12 overflow-hidden overflow-x-auto'>
                    <table className="w-full text-sm text-center rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-white bg-cyan-600">
                        <tr>
                            <th   className="pl-1 py-3 border">
                                <CheckBox />
                            </th>
                            <th  className="px-6 py-3 border">
                                Date
                            </th>
                            <th  className="px-6 py-3 border">
                                Building Name
                            </th>
                            <th  className="px-6 py-3 border ">
                                Address
                            </th>
                            <th  className="px-6 py-3 border">
                                Manager Name
                            </th>
                            <th  className="px-6 py-3 border">
                                Building types
                            </th>
                            <th  className="px-6 py-3 border">
                                Floor Area
                            </th>
                            <th  className="px-6 py-3 border">
                                Rent Areas
                            </th>
                            <th  className="px-6 py-3 border">
                                Rent Price
                            </th>
                            <th  className="px-6 py-3 border">
                                Service Fee
                            </th>
                            <th  className="px-6 py-3 border">
                                MG Fee
                            </th>
                            <th  className="px-6 py-3 border">
                                Manage
                            </th>
                        </tr>
                        </thead>

                        <tbody>

                        {
                            isLoading ? (
                                <tr>
                                    <td colSpan={12} className="text-center py-4">
                                        <Spinner/>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={12} className="text-center py-4">
                                    <Alert
                                        color="red"
                                        message="Error"
                                        error={error}
                                    />
                                </td>
                            </tr>
                        ) : (
                            data?.length > 0 && (
                                data.map((item: any) => (
                                    <tr
                                        key={item.id}
                                        className="bg-white border hover:bg-gray-100 even:bg-gray-50"
                                    >
                                        <td className="pl-1 py-4 border">
                                            <CheckBox/>
                                        </td>
                                        <td className="px-6 py-4 border">{item.createdDate}</td>
                                        <td className="px-6 py-4 border">{item.name}</td>
                                        <td className="px-6 py-4 border">{item.address || "N/A"}</td>
                                        <td className="px-6 py-4 border">{item.managerName || "N/A"}</td>
                                        <td className="px-6 py-4 border">{
                                            item.rentTypes.length > 0 ? (
                                                item.rentTypes.map((i:any) => i.name).join(', ')
                                            ) : (
                                                'N/A'
                                            )
                                        }</td>
                                        <td className="px-6 py-4 border">{item.floorArea || "N/A"}</td>
                                        <td className="px-6 py-4 border">
                                            {item.rentAreas.length > 0 ? (
                                                item.rentAreas.map((i: any) => i.value).join(', ')
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td className="px-6 py-4 border">{item.rentPrice || "N/A"}</td>
                                        <td className="px-6 py-4 border">{item.serviceFee || "N/A"}</td>
                                        <td className="px-6 py-4 border">{item.brokerageFee || "N/A"}</td>
                                        <td className="px-6 py-4 border">
                                            <div>
                                                <Button onClick={() => editBuildingHandler(item.id)}><FaEdit/></Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))))
                        }

                        </tbody>
                    </table>

            </div>
        </div>
    );
}
