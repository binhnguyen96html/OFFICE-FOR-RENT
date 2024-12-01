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
import {Spinner} from "flowbite-react";
import {useNavigate} from "react-router-dom";


export default function NewBuildingScreen(){
    const [form, setForm] = useState<FormStateForInsert>(initialFormStateForInsert);
    const [validationErrors, setValidationErrors] = useState({
        rentType_s: '',
        districtId: ''
    });

    const navigate = useNavigate();

    const {
        data: fetchedDistricts,
        error: fetchedDistrictsError,
        isLoading: fetchedDistrictsIsLoading
    } = useGetDistrictsQuery({});
    // console.log("fetchedDistricts: ", fetchedDistricts)


    const [createBuilding, {isLoading: isLoadingForCreateBuilding}] = useCreateBuildingMutation();


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

    const validateForm = () => {
        const errors = {
            rentType_s: '',
            districtId: ''
        };

        // Validate Rent Types
        if (!form.rentType_s || form.rentType_s.trim() === '') {
            errors.rentType_s = 'Please select at least one building type';
        }

        // Validate District ID
        if (!form.districtId) {
            errors.districtId = 'Please select a district';
        }

        setValidationErrors(errors);

        // Return true if no errors, false otherwise
        return !errors.rentType_s && !errors.districtId;
    };

    const submitHandler = async (e: any) => {
        e.preventDefault();
        //console.log('form: ', form)

        try {

            if (validateForm()) {
                const result = await createBuilding(form).unwrap();
                //console.log('Success:', result);
                toast.success("Sucessfully created");
                setForm(initialFormStateForInsert)
            }

            // setForm(initialFormStateForInsert);

            // axios.post("http://localhost:8081/api/building", {...form}, {
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // })
            //     .then((response) => {
            //         console.log("Success:", response.data);
            //     })
            //     .catch((error) => {
            //         console.error("Error:", error.response || error.message);
            //     });

        }catch(e){
            console.error('Error:', e);
            toast.error("Failed to create building");
        }
    }

    return(
        <div>
            <div className="bg-gray-50 rounded shadow">
                <div className="flex justify-between items-center bg-cyan-600 p-3 text-white rounded">
                    <div className="italic">Add new building</div>
                </div>

                {isLoadingForCreateBuilding ? (
                    <Spinner />
                ) : (

                    <form className="p-6" onSubmit={(e: any) => submitHandler(e)}>
                        <div className="">
                            <FormInputForInsert
                                label={"Name"}
                                inputChangeHandler={inputChangeHandler}
                                field={"name"}
                                value={form.name}
                                required={true}
                            />
                            <FormInputForInsert
                                label={"Street"}
                                inputChangeHandler={inputChangeHandler}
                                field={"street"}
                                value={form.street}
                            />
                            <FormInputForInsert
                                label={"Ward"}
                                inputChangeHandler={inputChangeHandler}
                                field={"ward"}
                                value={form.ward}
                            />

                            {/*DISTRICT */}
                            <div className={'md:grid grid-cols-6 gap-4 mb-2 '}>

                                <div className='flex'>
                                    <p className='col-span-1 text-green-900 mb-1 text-sm'>District</p>
                                    <LuAsterisk className='text-xs'/>
                                </div>
                                <div className='col-span-5'>
                                    <Dropdown
                                        data={fetchedDistricts}
                                        inputChangeHandler={(field, value) => {
                                            inputChangeHandler(field, value);
                                            // Clear district validation error when a selection is made
                                            setValidationErrors(prev => ({
                                                ...prev,
                                                districtId: ''
                                            }));
                                        }}
                                        field='districtId'
                                        fieldFromFetchedDataForDisplay='name'
                                        fieldFromFetchedDataForSendBackDatabase='id'
                                    />
                                    {validationErrors.districtId && (
                                        <p className="text-red-500 text-xs mt-2">{validationErrors.districtId}</p>
                                    )}
                                </div>
                            </div>

                            <FormInputForInsert
                                label={"Number of basement"}
                                inputChangeHandler={inputChangeHandler}
                                field={"numberOfBasement"}
                                value={form.numberOfBasement}
                                type='number'
                            />
                            <FormInputForInsert
                                label={"Floor Area"}
                                inputChangeHandler={inputChangeHandler}
                                field={"floorArea"}
                                value={form.floorArea}
                                type='number'
                            />
                            <FormInputForInsert
                                label={"Direction"}
                                inputChangeHandler={inputChangeHandler}
                                field={"direction"}
                                value={form.direction}
                            />
                            <FormInputForInsert
                                label={"Level"}
                                inputChangeHandler={inputChangeHandler}
                                field={"level"}
                                value={form.level}
                            />
                            <FormInputForInsert
                                label={"Structure"}
                                inputChangeHandler={inputChangeHandler}
                                field={"structure"}
                                value={form.structure}
                            />
                            <FormInputForInsert
                                label={"Rent Price"}
                                inputChangeHandler={inputChangeHandler}
                                field={"rentPrice"}
                                value={form.rentPrice}
                                required={true}
                                type='number'
                            />
                            <FormInputForInsert
                                label={"Rent Price Description"}
                                inputChangeHandler={inputChangeHandler}
                                field={"rentPriceDescription"}
                                value={form.rentPriceDescription}
                            />
                            <FormInputForInsert
                                label={"Service Fee"}
                                inputChangeHandler={inputChangeHandler}
                                field={"serviceFee"}
                                value={form.serviceFee}
                            />
                            <FormInputForInsert
                                label={"Car Fee"}
                                inputChangeHandler={inputChangeHandler}
                                field={"carFee"}
                                value={form.carFee}
                            />
                            <FormInputForInsert
                                label={"Motorbike Fee"}
                                inputChangeHandler={inputChangeHandler}
                                field={"motorbikeFee"}
                                value={form.motorbikeFee}
                            />
                            <FormInputForInsert
                                label={"Overtime Fee"}
                                inputChangeHandler={inputChangeHandler}
                                field={"overtimeFee"}
                                value={form.overtimeFee}
                            />
                            <FormInputForInsert
                                label={"Water Fee"}
                                inputChangeHandler={inputChangeHandler}
                                field={"waterFee"}
                                value={form.waterFee}
                            />
                            <FormInputForInsert
                                label={"Electricity Fee"}
                                inputChangeHandler={inputChangeHandler}
                                field={"electricityFee"}
                                value={form.electricityFee}
                            />
                            <FormInputForInsert
                                label={"Deposit"}
                                inputChangeHandler={inputChangeHandler}
                                field={"deposit"}
                                value={form.deposit}
                            />
                            <FormInputForInsert
                                label={"Payment"}
                                inputChangeHandler={inputChangeHandler}
                                field={"payment"}
                                value={form.payment}
                            />
                            <FormInputForInsert
                                label={"Rent time"}
                                inputChangeHandler={inputChangeHandler}
                                field={"rentTime"}
                                value={form.rentTime}
                            />
                            <FormInputForInsert
                                label={"Decoration time"}
                                inputChangeHandler={inputChangeHandler}
                                field={"decorationTime"}
                                value={form.decorationTime}
                            />
                            <FormInputForInsert
                                label={"Brokerage Fee"}
                                inputChangeHandler={inputChangeHandler}
                                field={"brokerageFee"}
                                value={form.brokerageFee}
                            />
                            <FormInputForInsert
                                label={"Note"}
                                inputChangeHandler={inputChangeHandler}
                                field={"note"}
                                value={form.note}
                            />
                            <FormInputForInsert
                                label={"Link of Building"}
                                inputChangeHandler={inputChangeHandler}
                                field={"linkOfBuilding"}
                                value={form.linkOfBuilding}
                            />
                            <FormInputForInsert
                                label={"Map"}
                                inputChangeHandler={inputChangeHandler}
                                field={"map"}
                                value={form.map}
                            />
                            <FormInputForInsert
                                label={"Image"}
                                inputChangeHandler={inputChangeHandler}
                                field={"image"}
                                value={form.image}
                            />
                            <FormInputForInsert
                                label={"Manager Name"}
                                inputChangeHandler={inputChangeHandler}
                                field={"managerName"}
                                value={form.managerName}
                            />
                            <FormInputForInsert
                                label={"Manager Phone"}
                                inputChangeHandler={inputChangeHandler}
                                field={"managerPhone"}
                                value={form.managerPhone}
                                type='number'
                            />

                            <FormInputForInsert
                                label={"Rent Areas"}
                                inputChangeHandler={inputChangeHandler}
                                field={"rentArea_s"}
                                value={form.rentArea_s}
                                required={true}
                                placeholder='100,200,300'
                            />
                            <FormInputForInsert
                                label={"Rent Area Description"}
                                inputChangeHandler={inputChangeHandler}
                                field={"rentAreaDescription"}
                                value={form.rentAreaDescription}
                            />


                            {/*RENT TYPE */}
                            <div className={'md:grid grid-cols-6 gap-4 mb-2'}>
                                <div className='flex'>
                                    <p className='col-span-1 text-green-900 mb-1 text-sm'>Rent Type</p>
                                    <LuAsterisk className='text-xs'/>
                                </div>

                                <div className='col-span-5'>
                                    <div className='flex  items-center gap-4'>
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
                                                        setValidationErrors(prev => ({
                                                            ...prev,
                                                            rentType_s: ''
                                                        }));
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
                                    {validationErrors.rentType_s && (
                                        <p className="text-red-500 text-xs">{validationErrors.rentType_s}</p>
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="mt-2 flex gap-4 justify-end">
                            <Button
                                title="Cancel"
                                bgColor={'bg-gray-400'}
                                hoverColor='hover:bg-gray-900'
                                onClick={() => navigate('/building-management')}
                            ></Button>
                            <Button
                                title="Add Building"
                                type='submit'
                            ></Button>
                        </div>
                    </form>

                )}
            </div>
        </div>
    )
}