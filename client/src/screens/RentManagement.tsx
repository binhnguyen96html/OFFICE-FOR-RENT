import {FaArrowRight, FaChevronLeft, FaEdit} from "react-icons/fa";
import {FaCirclePlus} from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {useState} from "react";
import Button from "../components/Button";
import { Button as FlowbiteButton, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TiDeleteOutline } from "react-icons/ti";

import {
    useDeleteBuildingMutation,
    useFindBuildingsQuery,
    useGetBuildingsQuery,
} from "../store/slices/buildingsApiSlice";
import {Link, useNavigate} from "react-router-dom";
import FormInputForSearch from "../components/FormInputForSearch";
import {FormStateForInsert, FormStateForSearch, initialFormStateForSearch} from "../types/buildingTypes";
import {useGetDistrictsQuery} from "../store/slices/districtsApiSlice";
import Dropdown from "../components/Dropdown";
import {buildingTypeData} from "../constants/buildingTypeData";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { Tooltip } from "flowbite-react";

export default function RentManagement() {
    const [openSearch, setOpenSearch] = useState(true);
    const [form, setForm] = useState<FormStateForSearch>(initialFormStateForSearch);
    const [editBuildingModal, setEditBuildingModal] = useState(false);
    const [deleteOpenModal, setDeleteOpenModal] = useState(false);
    const [buildingIdForDelete, setBuildingIdForDelete] = useState(null);
    const navigate = useNavigate();

    const {data: fetchedDistricts, error: fetchedDistrictsError, isLoading: fetchedDistrictsIsLoading} = useGetDistrictsQuery({});
    // console.log("fetchedDistricts: ", fetchedDistricts)

    const {
        data: searchedBuildings,
        error: searchedBuildingsError,
        isLoading: searchedBuildingsIsLoading,
        refetch: searchedBuildingsRefetch,
    } = useFindBuildingsQuery(form);
    // console.log('searchedBuildings: ',searchedBuildings)
    // console.log('form: ', form)

    const [deleteBuilding, {isLoading: deleteBuildingIsLoading}] = useDeleteBuildingMutation();
    //console.log("deleteBuilding: ", deleteBuilding)

    const inputChangeHandler = (
        field: keyof FormStateForSearch | keyof FormStateForInsert,
        enteredValue: any,
    ) => {
        setForm((curForm) => ({
            ...curForm,
            [field]: enteredValue,
        }));
        // console.log("form: ", form);
    };

    const editBuildingHandler = (buildingId: number) => {
        navigate(`/rent-management/${buildingId}/edit`);
    }

    const deleteBuildingHandler = async () => {
        //console.log("buildingIdForDelete: ", buildingIdForDelete)
        try {
            await deleteBuilding({buildingId: buildingIdForDelete}).unwrap();
            toast.success("Successfully deleted");
            searchedBuildingsRefetch()
        }catch(e){
            toast.error('Failed to delete building')
        }
    }


    // const handleSubmitForSearch = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log(form);
    //
    //     try {
    //         // Use the trigger function instead of directly calling the hook
    //         // const result = await triggerSearch(form).unwrap();
    //         // console.log('result: ', result)
    //
    //         if (searchedBuildings) {
    //             console.log('searchedBuildings:', searchedBuildings);
    //             // setCurrentBuildings(searchedBuildings)
    //         } else if (searchedBuildingsError) {
    //             console.error('Search Error:', searchedBuildingsError);
    //             toast.error("Failed to find buildings");
    //         }
    //     }catch(e){
    //         console.error('Unexpected Error:', e);
    //         toast.error("An unexpected error occurred");
    //     }
    //
    // }

    return (
        <div>
            {/*BUTTON*/}
            <div className='w-full flex justify-end'>
                <Button>
                    <Link to='/rent-management/new-building'>
                        <div className='flex justify-center items-center gap-2'>
                            <FaCirclePlus/> New Building
                        </div>
                    </Link>
                </Button>
            </div>
            {/*SEARCH */}
            <div className="bg-gray-50 rounded shadow mt-6">
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
                    <form className="p-6"
                        // onSubmit={handleSubmitForSearch}
                    >
                        <div className="md:grid grid-cols-2 gap-4">
                            <FormInputForSearch
                                label={"Name"}
                                inputChangeHandler={inputChangeHandler}
                                field={"name"}
                                value={form.name}
                            />
                            <FormInputForSearch
                                label={"Floor Area"}
                                inputChangeHandler={inputChangeHandler}
                                field={"floorArea"}
                                value={form.floorArea}
                                type='number'
                            />
                        </div>

                        <div className="md:grid grid-cols-3 gap-4 mt-2">

                            {/*DISTRICTS*/}
                            <Dropdown
                                data={fetchedDistricts}
                                field='districtCode'
                                label='District'
                                purpose='search'
                                inputChangeHandler={inputChangeHandler}
                            />

                            <FormInputForSearch
                                label={"Ward"}
                                inputChangeHandler={inputChangeHandler}
                                field={"ward"}
                                value={form.ward}
                            />
                            <FormInputForSearch
                                label={"Street"}
                                inputChangeHandler={inputChangeHandler}
                                field={"street"}
                                value={form.street}
                            />
                        </div>

                        <div className="md:grid grid-cols-3 gap-4 mt-2">
                            <FormInputForSearch
                                label={"Number of basement"}
                                inputChangeHandler={inputChangeHandler}
                                field={"numberOfBasement"}
                                value={form.numberOfBasement}
                                type='number'
                            />
                            <FormInputForSearch
                                label={"Direction"}
                                inputChangeHandler={inputChangeHandler}
                                field={"direction"}
                                value={form.direction}
                            />
                            <FormInputForSearch
                                label={"Level"}
                                inputChangeHandler={inputChangeHandler}
                                field={"level"}
                                value={form.level}
                            />
                        </div>

                        <div className="md:grid grid-cols-4 gap-4 mt-2">
                            <FormInputForSearch
                                label={"Area from"}
                                inputChangeHandler={inputChangeHandler}
                                field={"rentAreaFrom"}
                                value={form.rentAreaFrom}
                                type='number'
                            />
                            <FormInputForSearch
                                label={"Area to"}
                                inputChangeHandler={inputChangeHandler}
                                field={"rentAreaTo"}
                                value={form.rentAreaTo}
                                type='number'
                            />
                            <FormInputForSearch
                                label={"Rent price from"}
                                inputChangeHandler={inputChangeHandler}
                                field={"rentPriceFrom"}
                                value={form.rentPriceFrom}
                                type='number'
                            />
                            <FormInputForSearch
                                label={"Rent price to"}
                                inputChangeHandler={inputChangeHandler}
                                field={"rentPriceTo"}
                                value={form.rentPriceTo}
                                type='number'
                            />
                        </div>

                        <div className="md:grid grid-cols-3 gap-4 mt-2">
                            <FormInputForSearch
                                label={"Manager Name"}
                                inputChangeHandler={inputChangeHandler}
                                field={"managerName"}
                                value={form.managerName}
                            />
                            <FormInputForSearch
                                label={"Manager Phone"}
                                inputChangeHandler={inputChangeHandler}
                                field={"managerPhone"}
                                value={form.managerPhone}
                                type='number'
                            />
                            {/*<Dropdown label={"Select assigned staff"} value={districts}/>*/}
                        </div>
                        <div className="mt-2 flex gap-4">
                            {buildingTypeData.map((type, index) => (
                                <div key={`type-${index}`}>
                                    <input
                                        className={`w-4 h-4 text-cyan-900 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2`}
                                        type="checkbox"
                                        id={type.code}
                                        value={type.code}
                                        checked={form.rentType_s.split(',').includes(type.code)}
                                        onChange={(e) => {
                                            const updatedRentTypes = e.target.checked
                                                ? [...new Set([...form.rentType_s.split(','), type.code])]
                                                : form.rentType_s.split(',').filter((t) => t !== type.code);

                                            const cleanRentTypes = updatedRentTypes.join(',').replace(/^,/, ''); // Remove leading comma
                                            inputChangeHandler("rentType_s", cleanRentTypes); // Update state
                                        }}
                                    />

                                    <label
                                        className='ml-2 text-sm font-medium text-gray-900'
                                        htmlFor={type.code}>
                                        {type.name}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type='button'
                                title="Clear Search"
                                onClick={() => setForm(initialFormStateForSearch)}
                            ><TiDeleteOutline className='text-xl'/></Button>
                        </div>
                    </form>
                )}
            </div>


            {/*LIST OF BUILDINGS */}
            <div className='rounded shadow bg-gray-50 mt-12 overflow-hidden overflow-x-auto'>
                <table className="w-full text-sm text-center rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-white bg-cyan-600">
                    <tr>
                        <th className="pl-1 py-3 border">
                            {/*<CheckBox/>*/}
                        </th>
                        <th className="px-6 py-3 border">
                            Date
                        </th>
                        <th className="px-6 py-3 border">
                            Building Name
                        </th>
                        <th className="px-6 py-3 border ">
                            Address
                        </th>
                        <th className="px-6 py-3 border">
                            Manager Name
                        </th>
                        <th className="px-6 py-3 border">
                            Building types
                        </th>
                        <th className="px-6 py-3 border">
                            Floor Area
                        </th>
                        <th className="px-6 py-3 border">
                            Rent Areas
                        </th>
                        <th className="px-6 py-3 border">
                            Rent Price
                        </th>
                        <th className="px-6 py-3 border">
                            Service Fee
                        </th>
                        <th className="px-6 py-3 border">
                            MG Fee
                        </th>
                        <th className="px-6 py-3 border">
                            Manage
                        </th>
                    </tr>
                    </thead>

                    <tbody>

                    {
                        searchedBuildingsIsLoading ? (
                            <tr>
                                <td colSpan={12} className="text-center py-4">
                                    <Spinner/>
                                </td>
                            </tr>
                        ) : searchedBuildingsError ? (
                            <tr>
                                <td colSpan={12} className="text-center py-4">
                                    <Alert
                                        color="red"
                                        message="Error"
                                        error={searchedBuildingsError}
                                    />
                                </td>
                            </tr>
                        ) : (
                            searchedBuildings?.length > 0 ?
                                (searchedBuildings.map((item: any) => (
                                    <tr
                                        key={item.id}
                                        className="bg-white border hover:bg-gray-100 even:bg-gray-50"
                                    >
                                        <td className="pl-1 py-4 border">
                                            {/*<CheckBox/>*/}
                                        </td>
                                        <td className="px-6 py-4 border">{item.createdDate}</td>
                                        <td className="px-6 py-4 border">{item.name}</td>
                                        <td className="px-6 py-4 border">{item.address || "N/A"}</td>
                                        <td className="px-6 py-4 border">{item.managerName || "N/A"}</td>
                                        <td className="px-6 py-4 border">{
                                            item.rentTypes.length > 0 ? (
                                                item.rentTypes.map((i: any) => i).join(', ')
                                            ) : (
                                                'N/A'
                                            )
                                        }</td>
                                        <td className="px-6 py-4 border">{item.floorArea || "N/A"}</td>
                                        <td className="px-6 py-4 border">
                                            {item.rentAreas.length > 0 ? (
                                                item.rentAreas.map((i: any) => i).join(', ')
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td className="px-6 py-4 border">{item.rentPrice || "N/A"}</td>
                                        <td className="px-6 py-4 border">{item.serviceFee || "N/A"}</td>
                                        <td className="px-6 py-4 border">{item.brokerageFee || "N/A"}</td>
                                        <td className="px-6 py-4 border">
                                            <div className='flex gap-2'>
                                            <Tooltip content="Edit">
                                                <Button data-tooltip-target="tooltip-default"
                                                        onClick={() => editBuildingHandler(item.id)}><FaEdit/></Button>
                                            </Tooltip>

                                                <Tooltip content="Delete">
                                                    <Button data-tooltip-target="tooltip-default"
                                                            onClick={()=>{
                                                                setDeleteOpenModal(true);
                                                                setBuildingIdForDelete(item.id)
                                                            }}><RiDeleteBin5Fill /></Button>
                                                </Tooltip>


                                            </div>
                                        </td>
                                    </tr>
                                )))
                                : (
                                    <tr className="bg-white border hover:bg-gray-100 even:bg-gray-50">
                                        <td colSpan={12} className="text-center py-4">Not Found Buildings</td>
                                    </tr>
                                ))
                    }

                    </tbody>
                </table>

            </div>


            <Modal show={deleteOpenModal} size="md" onClose={() => setDeleteOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this building?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <FlowbiteButton color="failure" onClick={() => {
                                setDeleteOpenModal(false);
                                deleteBuildingHandler()
                            }}>
                                {"Yes, I'm sure"}
                            </FlowbiteButton>
                            <FlowbiteButton color="gray" onClick={() => setDeleteOpenModal(false)}>
                                No, cancel
                            </FlowbiteButton>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


        </div>
    );
}
