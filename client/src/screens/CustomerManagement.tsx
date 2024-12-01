import {FaArrowRight, FaChevronLeft, FaEdit} from "react-icons/fa";
import {FaCirclePlus} from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {useEffect, useState} from "react";
import Button from "../components/Button";
import { Button as FlowbiteButton, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TiDeleteOutline } from "react-icons/ti";
import { FaUserCog } from "react-icons/fa";

import {Link, useNavigate} from "react-router-dom";
import FormInputForSearch from "../components/FormInputForSearch";
import Dropdown from "../components/Dropdown";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { Tooltip } from "flowbite-react";
import {
    useGetUsersQuery,
    useLazyGetUsersWithAssignedCustomerQuery, useUpdateAssignStaffToBuildingMutation,
} from "../store/slices/usersApiSlice";
import {
    useDeleteCustomerMutation,
    useFindCustomersQuery, useUpdateAssignStaffsToCustomerMutation,
} from "../store/slices/customersApiSlice";
import {formatDate} from "../functions/useFormat";
import {ICustomerForSearch, initialCustomerForSearch} from "../types/customerTypes";

export default function CustomerManagement() {
    const [openSearch, setOpenSearch] = useState(true);
    const [form, setForm] = useState<ICustomerForSearch>(initialCustomerForSearch);
    const [deleteOpenModal, setDeleteOpenModal] = useState(false);
    const [customerIdForDelete, setCustomerIdForDelete] = useState(null);
    const [assignStaffOpenModal, setAssignStaffOpenModal] = useState(false);
    const [assignedStaffIds, setAssignStaffIds] = useState<any>([]);
    const [buildingIdForAssignStaff, setBuildingIdForAssignStaff] = useState(null);

    const navigate = useNavigate();


    const {
        data: fetchedUsers,
        error: fetchedUsersError,
        isLoading: fetchedUsersIsLoading,
        refetch: fetchedUsersRefetch,
    } = useGetUsersQuery({});
    //console.log("fetchedUsers: ", fetchedUsers)


    const {
        data: searchedCustomers,
        error: searchedCustomersError,
        isLoading: searchedCustomersIsLoading,
        refetch: searchedCustomersRefetch,
    } = useFindCustomersQuery(form);
    //console.log('searchedCustomers: ',searchedCustomers)

    const [
        deleteCustomer,
        {isLoading: deleteCustomerIsLoading}
    ] = useDeleteCustomerMutation();
    //console.log("deleteCustomer: ", deleteCustomer)


    const [triggerGetUsersWithAssignedCustomer, {
        data: fetchedUsersWithAssignedCustomer,
        isLoading: fetchedUsersWithAssignedCustomerIsLoading,
    }] = useLazyGetUsersWithAssignedCustomerQuery();
    //console.log('fetchedUsersWithAssignedCustomer: ',fetchedUsersWithAssignedCustomer)


    const [
        updateAssignUserToCustomer,
        {isLoading: updateAssignUserToCustomerIsLoading}
    ] = useUpdateAssignStaffsToCustomerMutation();

    const inputChangeHandler = (
        field: any,
        enteredValue: any,
    ) => {
        setForm((curForm) => ({
            ...curForm,
            [field]: enteredValue,
        }));
        console.log("form: ", form);
        // console.log('assignedStaffIds: ', assignedStaffIds)
    };


    const editCustomerHandler = (customerId: number) => {
        navigate(`/customer-management/edit/${customerId}`);
    }

    const deleteCustomerHandler = async () => {
        //console.log("buildingIdForDelete: ", buildingIdForDelete)
        try {
            await deleteCustomer({customerId: customerIdForDelete}).unwrap();
            toast.success("Successfully deleted");
            searchedCustomersRefetch()
        }catch(e){
            toast.error('Failed to delete customer')
        }
    }

    useEffect(() => {

       setAssignStaffIds([])
        //console.log('assignStaffIds: ', assignedStaffIds)

        //console.log('fetchedUsersWithAssignedBuilding: ',fetchedUsersWithAssignedBuilding)
        if(fetchedUsersWithAssignedCustomer) {
            fetchedUsersWithAssignedCustomer.forEach((item: any) => {
                if(item.assignedCustomerChecked === true){
                    setAssignStaffIds((prev:any) => [...prev, item.id])
                }
            })
        }
    }, [fetchedUsersWithAssignedCustomer, assignStaffOpenModal]);
        //console.log('assignedStaffIds2: ', assignedStaffIds)

    const assignStaffsToCustomerHandler = async () => {
        const submitedData = {
            customerId: buildingIdForAssignStaff,
            staffIds: assignedStaffIds
        }

        try {
            await updateAssignUserToCustomer(submitedData);
            toast.success("Successfully updated Assigned Staffs to this customer!");
        }catch(e){
            toast.error("Failed to assign staffs to this customer!");
        }finally {
            setAssignStaffOpenModal(false);
        }
    }


    return (
        <div>
            {/*BUTTON*/}
            <div className='w-full flex justify-end'>
                <Button>
                    <Link to='/customer-management/new-customer'>
                        <div className='flex justify-center items-center gap-2'>
                            <FaCirclePlus/> New Customer
                        </div>
                    </Link>
                </Button>
            </div>
            {/*SEARCH */}
            <div className="bg-gray-50 rounded shadow mt-6">
                <div className="flex justify-between items-center bg-cyan-600 p-3 text-white rounded">
                    <div className="italic">Search Customers</div>
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
                                label={"Full Name"}
                                inputChangeHandler={inputChangeHandler}
                                field={"fullName"}
                                value={form.fullName}
                            />
                            <FormInputForSearch
                                label={"Phone Number"}
                                inputChangeHandler={inputChangeHandler}
                                field={"phone"}
                                value={form.phone}
                                type='number'
                            />
                        </div>


                        <div className="md:grid grid-cols-2 gap-4 mt-2">

                            <FormInputForSearch
                                label={"Email"}
                                inputChangeHandler={inputChangeHandler}
                                field={"email"}
                                value={form.email}
                            />

                            {/*ASSIGNED STAFF */}
                            <Dropdown
                                data={fetchedUsers}
                                field='staffId'
                                label='Assigned Staffs'
                                fieldFromFetchedDataForDisplay='fullname'
                                fieldFromFetchedDataForSendBackDatabase='id'
                                inputChangeHandler={inputChangeHandler}
                                reset={form.staffId === ''}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type='button'
                                title="Clear Search"
                                onClick={() => setForm(initialCustomerForSearch)}
                            ><TiDeleteOutline className='text-xl'/></Button>
                        </div>
                    </form>
                )}
            </div>


            {/*LIST OF CUSTOMERS */}
            <div className='rounded shadow bg-gray-50 mt-12 overflow-hidden overflow-x-auto'>
                <table className="w-full text-sm text-center rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-white bg-cyan-600">
                    <tr>
                        <th className="pl-1 py-3 border">
                            {/*<CheckBox/>*/}
                        </th>
                        <th className="px-6 py-3 border">
                            Name
                        </th>
                        <th className="px-6 py-3 border">
                            Assigned Staff
                        </th>
                        <th className="px-6 py-3 border ">
                            Phone Number
                        </th>
                        <th className="px-6 py-3 border">
                            Email
                        </th>
                        <th className="px-6 py-3 border">
                            Demands
                        </th>
                        <th className="px-6 py-3 border">
                            Created By
                        </th>
                        <th className="px-6 py-3 border">
                            Created Date
                        </th>
                        <th className="px-6 py-3 border">
                            Status
                        </th>
                        <th className="px-6 py-3 border">
                            Manage
                        </th>
                    </tr>
                    </thead>

                    <tbody>

                    {
                        searchedCustomersIsLoading ? (
                            <tr>
                                <td colSpan={12} className="text-center py-4">
                                    <Spinner/>
                                </td>
                            </tr>
                        ) : searchedCustomersError ? (
                            <tr>
                                <td colSpan={12} className="text-center py-4">
                                    <Alert
                                        color="red"
                                        message="Error"
                                        error={searchedCustomersError}
                                    />
                                </td>
                            </tr>
                        ) : (
                            searchedCustomers?.length > 0 ?
                                (searchedCustomers.map((item: any) => (
                                    <tr
                                        key={item.id}
                                        className="bg-white border hover:bg-gray-100 even:bg-gray-50"
                                    >
                                        <td className="pl-1 py-4 border">
                                            {/*<CheckBox/>*/}
                                        </td>
                                        <td className="px-6 py-4 border">{item.fullName || "N/A"}</td>
                                        <td className="px-6 py-4 border">{"N/A"}</td>
                                        <td className="px-6 py-4 border">{item.phone || "N/A"}</td>
                                        <td className="px-6 py-4 border">{item.email || "N/A"}</td>
                                        <td className="px-6 py-4 border">demands</td>
                                        <td className="px-6 py-4 border">{item.createdBy || "N/A"}</td>
                                        <td className="px-6 py-4 border">{formatDate(item.createdDate)}</td>
                                        <td className="px-6 py-4 border">{'status' || "N/A"}</td>
                                        <td className="px-6 py-4 border">
                                            <div className='flex gap-2'>
                                            <Tooltip content="Edit">
                                                <Button data-tooltip-target="tooltip-default"
                                                        onClick={() => editCustomerHandler(item.id)}><FaEdit/></Button>
                                            </Tooltip>

                                            <Tooltip content="Delete">
                                                    <Button data-tooltip-target="tooltip-default"
                                                            onClick={()=>{
                                                                setDeleteOpenModal(true);
                                                                setCustomerIdForDelete(item.id)
                                                            }}><RiDeleteBin5Fill /></Button>
                                            </Tooltip>

                                            <Tooltip content="Assign Staff">
                                                <Button
                                                    data-tooltip-target="tooltip-default"
                                                    onClick={async () => {
                                                        console.log('buildingIdForAssignStaff: ',buildingIdForAssignStaff )
                                                        try {
                                                                setAssignStaffOpenModal(true);
                                                                //console.log("item.id: ", item.id)
                                                                setBuildingIdForAssignStaff(item.id)
                                                                const result = await triggerGetUsersWithAssignedCustomer({customerId: item.id});
                                                                if (result.error) {
                                                                    throw result.error;
                                                                }
                                                            } catch(error) {
                                                            console.error('Error fetching assigned staff:', error);
                                                            toast.error('Failed to fetch assigned staffs for this customer!');
                                                            // setAssignStaffOpenModal(false);
                                                        }
                                                    }}
                                                >
                                                    {fetchedUsersWithAssignedCustomerIsLoading ? <Spinner /> : <FaUserCog />}
                                                </Button>
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


            {/*MODAL FOR DELETE BUILDING */}
            <Modal show={deleteOpenModal} size="md" onClose={() => setDeleteOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this customer?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <FlowbiteButton color="failure" onClick={() => {
                                setDeleteOpenModal(false);
                                deleteCustomerHandler()
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



            {/*MODAL FOR ASSIGN STAFF TO BUILDING */}
            <Modal show={assignStaffOpenModal} size="md" onClose={() => setAssignStaffOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <FaUserCog className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Do you want to reassign staffs to this building?
                        </h3>

                        <div>
                            {fetchedUsersWithAssignedCustomerIsLoading
                                ? <Spinner />
                                : fetchedUsersWithAssignedCustomer?.length > 0 ? (
                                    fetchedUsersWithAssignedCustomer.map((user: any) => (
                                       <div key={`assignedUser${user.id}`} className='border rounded flex justify-around py-3'>
                                               <input
                                                   className={`w-4 h-4 text-cyan-900 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2`}
                                                   type="checkbox"
                                                   id={user.id}
                                                   value={user.assignedCustomerChecked}
                                                   checked={assignedStaffIds.includes(user.id)}
                                                   onChange={(e) => {
                                                       const isChecked = e.target.checked;
                                                       setAssignStaffIds((prev: number[]) =>
                                                           isChecked ? [...prev, user.id] : prev.filter((id) => id !== user.id)
                                                       );
                                                   }}
                                               />

                                           <div className='ml-2 text-sm font-medium text-gray-900'>
                                               {user.fullname}
                                           </div>
                                       </div>
                                   ))
                                ) : (<div className='my-3'>None of Users</div>)
                            }
                        </div>

                        <div className="flex justify-center gap-4 mt-3">
                            <FlowbiteButton color="success" onClick={() => {
                                assignStaffsToCustomerHandler();
                            }}>
                                Assign
                            </FlowbiteButton>
                            <FlowbiteButton color="gray" onClick={() => {
                                setAssignStaffOpenModal(false)
                            }}
                            >
                                Cancel
                            </FlowbiteButton>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


        </div>
    );
}
