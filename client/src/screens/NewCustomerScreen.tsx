import Button from "../components/Button";
import {useState} from "react";
import {useGetDistrictsQuery} from "../store/slices/districtsApiSlice";
import {buildingTypeData} from "../constants/buildingTypeData";
import {FormStateForInsert, FormStateForSearch, initialFormStateForInsert} from "../types/buildingTypes";
import Dropdown from "../components/Dropdown";
import {useCreateBuildingMutation} from "../store/slices/buildingsApiSlice";
import FormInputForInsert from "../components/FormInputForInsert";
import {toast} from "react-toastify";
import {LuAsterisk} from "react-icons/lu";
import {useCreateCustomerMutation} from "../store/slices/customersApiSlice";
import {ICustomerForInsert, initialCustomerForInsert} from "../types/customerTypes";
import Spinner from "../components/Spinner";
import {useNavigate} from "react-router-dom";


export default function NewCustomerScreen(){
    const [form, setForm] = useState<ICustomerForInsert>(initialCustomerForInsert);
    const navigate = useNavigate();
    const [createCustomer, {isLoading: isLoadingForCreateCustomer}] = useCreateCustomerMutation();


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

    const submitHandler = async (e: any) => {
        e.preventDefault();
        //console.log('form: ', form)

        try {
            const result = await createCustomer(form).unwrap();
            //console.log('Success:', result);
            toast.success("Sucessfully create customer");
            setForm(initialCustomerForInsert)

        }catch(e){
            console.error('Error:', e);
            toast.error("Failed to create customer");
        }
    }

    return(
        <div>
            <div className="bg-gray-50 rounded shadow">

                <div className="flex justify-between items-center bg-cyan-600 p-3 text-white rounded">
                    <div className="italic">Add new customer</div>
                </div>

                {isLoadingForCreateCustomer ? (
                    <Spinner />
                ) : (
                    <form className="p-6"
                          onSubmit={(e: any) => submitHandler(e)}>

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
                            <FormInputForInsert
                                label={"Demand"}
                                inputChangeHandler={inputChangeHandler}
                                field={"demand"}
                                value={form.demand}
                            />
                            <FormInputForInsert
                                label={"Note"}
                                inputChangeHandler={inputChangeHandler}
                                field={"note"}
                                value={form.note}
                                textarea={true}
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
                                title="Add Customer"
                                type='submit'
                            ></Button>
                        </div>
                    </form>
                )}

            </div>
        </div>
    )
}