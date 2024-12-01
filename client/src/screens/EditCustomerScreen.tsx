import Button from "../components/Button";
import {useEffect, useState} from "react";
import {useGetDistrictsQuery} from "../store/slices/districtsApiSlice";
import {buildingTypeData} from "../constants/buildingTypeData";
import {FormStateForInsert, FormStateForSearch, initialFormStateForInsert} from "../types/buildingTypes";
import Dropdown from "../components/Dropdown";
import {
    useCreateBuildingMutation,
    useGetBuildingByIdQuery,
    useUpdateBuildingMutation
} from "../store/slices/buildingsApiSlice";
import FormInputForInsert from "../components/FormInputForInsert";
import {toast} from "react-toastify";
import {LuAsterisk} from "react-icons/lu";
import {useNavigate, useParams} from 'react-router-dom';
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import {ICustomerForInsert, initialCustomerForInsert} from "../types/customerTypes";
import { useFindCustomerByIdQuery, useUpdateCustomerMutation} from "../store/slices/customersApiSlice";

export default function EditCustomerScreen(){
    const [form, setForm] = useState<ICustomerForInsert>(initialCustomerForInsert);

    const navigate = useNavigate();

    const { id: customerId } = useParams();
    //console.log('buildingId: ', buildingId);



    const {
        data: fetchedCustomerById,
        error: fetchedCustomerByIdError,
        isLoading: fetchedCustomerByIdIsLoading,
        refetch: fetchedCustomerByIdRefetch,
    } = useFindCustomerByIdQuery({customerId})
    // console.log('fetchedBuildingById: ', fetchedBuildingById)

    const [updateCustomer, {isLoading: updateCustomerIsLoading}] = useUpdateCustomerMutation();

    useEffect(() => {
        if(fetchedCustomerById){
            setForm(fetchedCustomerById);
        }
    }, [fetchedCustomerById]);

    const inputChangeHandler = (
        field: any,
        enteredValue: any,
    ) => {

        setForm((curForm) => ({
            ...curForm,
            [field]: enteredValue,
        }));
        // console.log("form: ", form);
    };


    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        //console.log('form: ', form)

        try {
            const result = await updateCustomer({customerId, data: form}).unwrap();
            // console.log('Success:', result);
            if(result){
                    toast.success("Successfully updating customer");
                    fetchedCustomerByIdRefetch();
                    navigate('/customer-management');
            }
        }catch(e){
            console.error('Error:', e);
            toast.error("Failed to update customer");
        }
    }

    return(
        <div>
            <div className="bg-gray-50 rounded shadow">
                <div className="flex justify-between items-center bg-cyan-600 p-3 text-white rounded">
                    <div className="italic">Edit Building</div>
                </div>


                {
                    fetchedCustomerByIdIsLoading ? (
                            <div  className="text-center py-4">
                                <Spinner/>
                            </div>
                    ) : fetchedCustomerByIdError ? (
                            <div className="text-center py-4">
                                <Alert
                                    color="red"
                                    message="Error"
                                    error={fetchedCustomerByIdError}
                                />
                            </div>
                    ) :
                        (fetchedCustomerById  && (
                           updateCustomerIsLoading ? (
                               <Spinner />
                           ) : (
                               <form className="p-6"
                                     onSubmit={(e: React.FormEvent) => submitHandler(e)}>
                                   <div className="">
                                       <FormInputForInsert
                                           label={"Full Name"}
                                           inputChangeHandler={inputChangeHandler}
                                           field={"fullName"}
                                           value={form.fullName}
                                           required={true}
                                       />
                                       <FormInputForInsert
                                           label={"Phone"}
                                           inputChangeHandler={inputChangeHandler}
                                           field={"phone"}
                                           value={form.phone}
                                           type='number'
                                           required={true}
                                       />
                                       <FormInputForInsert
                                           label={"Email"}
                                           inputChangeHandler={inputChangeHandler}
                                           field={"email"}
                                           value={form.email}
                                           type='email'
                                           required={true}
                                       />
                                   </div>

                                   <div className="mt-2 flex gap-4 justify-end">
                                       <Button
                                           title="Cancel"
                                           bgColor={'bg-gray-400'}
                                           hoverColor='hover:bg-gray-900'
                                           onClick={() => navigate('/customer-management')}
                                       ></Button>
                                       <Button
                                           title="Update Building"
                                           type='submit'
                                       ></Button>
                                   </div>
                               </form>
                           )
                        ))}

            </div>
        </div>
    )
}