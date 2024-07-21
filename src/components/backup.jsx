import { useEffect, useState } from "react"
import supabase from "../../supabase"
import { useDispatch, useSelector } from "react-redux"
import { addAmount, addDiscount, addOperator, addService, addServiceValue, addSocks, addSocksValue, clearForm } from "../redux/FormSlice"

export default function AcceptCard(fromthere) {
    const myredux = useSelector(state => state.form)
    const dispatch = useDispatch()

    // operator start
    const [operatorToggle, setOperatorToggle] = useState(false)
    const [fetchedOperators, setFetchedOperators] = useState()
    const [operatorSaved, setOpertorSaved] = useState(false)

    const fetchOperatorsFunc = async () => {

        const { data } = await supabase.from('operators').select('*')
        setFetchedOperators(data)
    }

    const saveOperatorToRedux = (operatorSelected) => {

        console.log('operator selected: ', operatorSelected);
        dispatch(addOperator(operatorSelected))
        setOperatorToggle(false)
        setOpertorSaved(true)
    }
    // opertaors end

    // services start
    const [servicesToggle, setServicesToggle] = useState(false)
    const [fetchedServices, setFetchedServices] = useState()
    const [servicesSaved, setServicesSaved] = useState(false)

    const fetchServicesFunc = async () => {

        const { data } = await supabase.from('services').select('*')
        setFetchedServices(data)

    }

    const saveServicesToRedux = (servicesSelected, servicesSelectedValue) => {

        console.log('Services selected: ', servicesSelected, servicesSelectedValue);
        dispatch(addService(servicesSelected))
        dispatch(addServiceValue(servicesSelectedValue))
        setServicesToggle(false)
        setServicesSaved(true)

    }
    // services end

    // socks start
    const [socksToggle, setSocksToggle] = useState(false)
    const [fetchedSocks, setFetchedSocks] = useState()
    const [socksSaved, setSocksSaved] = useState(false)

    const fetchSocksFunc = async () => {

        const { data } = await supabase.from('socks').select('*')
        setFetchedSocks(data)

    }

    const saveSocksToRedux = (socksSelected, socksSelectedValue) => {

        console.log('Services selected: ', socksSelected, socksSelectedValue);
        dispatch(addSocks(socksSelected))
        dispatch(addSocksValue(socksSelectedValue))
        setSocksToggle(false)
        setSocksSaved(true)

    }
    // socks end


    // discount start
    const [discountToggle, setDiscountToggle] = useState(false)
    // const [fetchedDiscount, setFetchedDiscount] = useState()
    const [disocuntSaved, setDiscountSaved] = useState(false)

    // const fetchDiscountFunc = async () => {
    //     const { data } = await supabase.from('discounts').select('*')
    //     setFetchedSocks(data)
    // }

    const [inputDiscountValue, setInputDiscountValue] = useState();
    const saveDiscountToRedux = (event) => {

        // console.log('Discount: selected: ', socksSelected, socksSelectedValue);
        // dispatch(addSocks(socksSelected))
        // dispatch(addSocksValue(socksSelectedValue))
        // setSocksToggle(false)
        // setSocksSaved(true)
        setInputDiscountValue(event.target.value)
        dispatch(addDiscount(event.target.value))
        console.log(event.target.value, '-> discount percent');
        console.log(myredux.service_value, '->service', myredux.socks_value, '->socks');


    }
    // discount end

    // calculations
    const [amount, setAmount] = useState()
    const [subTotal, setSubtotal] = useState()
    const [toPay, setToPay] = useState()
    const [amountCollected, setAmountCollected] = useState(false)
    const calculateAmount = () => {
        console.log('calculated');
        setSubtotal(Number(myredux?.service_value) + Number(myredux?.socks_value))
        setToPay(Number(myredux?.service_value) - Number(myredux?.service_value) * Number(myredux?.discount) / 100 + Number(myredux?.socks_value))
        dispatch(addAmount(Number(myredux?.service_value) - Number(myredux?.service_value) * Number(myredux?.discount) / 100 + Number(myredux?.socks_value)))
        console.log('sub total->', subTotal, 'calculated total->', myredux?.amount);
    }
    // calculations end

    // payment start
    const [paymentToggle, setPaymentToggle] = useState(false)
    const [fetchedPayment, setFetchedPayment] = useState()
    const [paymentSaved, setPaymentSaved] = useState(false)
    const [mixedEnabled, setMixedEnabled] = useState(false)

    const fetchPaymentFunc = async () => {
        const { data } = await supabase.from('payment').select('*')
        setFetchedPayment(data)
    }

    const savePaymentToRedux = (paymentSelected, paymentSelectedValueCash, paymentSelectedValueOnline) => {
        console.log('Services selected: ', paymentSelected, paymentSelectedValueCash, paymentSelectedValueOnline);
        // dispatch(addSocks(socksSelected))
        // dispatch(addSocksValue(socksSelectedValue))
        // setPaymentToggle(false)
        // setPaymentSaved(true)
    }

    const [inputValueCash, setInputValueCash] = useState();

    const handleInputChangeCash = (event) => {
        setInputValueCash(event.target.value);
        console.log(event.target.value, '->cash');
    };

    const [inputValueOnline, setInputValueOnline] = useState();

    const handleInputChangeOnline = (event) => {
        setInputValueOnline(event.target.value);
        console.log(event.target.value, '->online');
    };
    // payment end




    useEffect(() => {
        fetchOperatorsFunc()
        fetchServicesFunc()
        fetchSocksFunc()


        console.log('from there ->>', fromthere.item.bill_no);
    }, [])

    return (
        <div className="w-[90%] mt-5 p-3 space-y-2">
            {
                !amountCollected ?

                    {/* operator */ }
                    <div div div className="w-full bg-blue-300 rounded-xl p-2" >
            <div onClick={() => {
                fetchOperatorsFunc()
                setOperatorToggle(true)
            }}> {operatorSaved ? myredux?.operator : 'Tap to select Operator'}</div>

            {
                operatorToggle ? <>
                    <div className="space-y-1 mt-2">

                        {
                            fetchedOperators?.map((item, index) => (
                                <div key={index} className="w-full rounded-lg bg-white p-2" onClick={() => {
                                    saveOperatorToRedux(item.name)

                                }}>
                                    {item?.name}
                                </div>
                            ))
                        }

                    </div>

                </> : <></>
            }
        </div>
            {/* operator end */ }


    {/* service */ }
    <div className="w-full bg-blue-300 rounded-xl p-2" >
        <div onClick={() => {
            fetchServicesFunc()
            setServicesToggle(true)
        }}> {servicesSaved ? myredux?.service : 'Tap to select Service'}</div>

        {
            servicesToggle ? <>
                <div className="space-y-1 mt-2">

                    {
                        fetchedServices?.map((item, index) => (
                            <div key={index} className="w-full rounded-lg bg-white p-2" onClick={() => {
                                saveServicesToRedux(item.name, item.value)

                            }}>
                                {item?.name}
                            </div>
                        ))
                    }

                </div>

            </> : <></>
        }
    </div>
    {/* service end */ }

    {/* socks */ }
    <div className="w-full bg-blue-300 rounded-xl p-2" >
        <div onClick={() => {
            fetchSocksFunc()
            setSocksToggle(true)

        }}> {socksSaved ? myredux?.socks : 'Tap to select Socks'}</div>

        {
            socksToggle ? <>

                <div className="space-y-1 mt-2">

                    {

                        fetchedSocks?.map((item, index) => (
                            <div key={index} className="w-full rounded-lg bg-white p-2" onClick={() => {
                                saveSocksToRedux(item.name, item.value)

                            }}>
                                {item?.name}
                            </div>
                        ))
                    }

                </div>

            </> : <></>
        }
    </div>
    {/* socks end */ }

    {/* discount */ }
    <div className="w-full bg-blue-300 rounded-xl p-2 flex" >
        <div className="w-[40%]">Discount :</div>
        <input type="text" value={inputDiscountValue} onChange={saveDiscountToRedux} className="bg-blue-300 text-center w-[60%]" />
    </div>
    {/* discount end */ }

            : <></>
}

<div className="font-bold" onClick={() => calculateAmount()}>Collect Amount: {myredux?.amount}</div>



{/* payment */ }
< div className="w-full bg-blue-300 rounded-xl p-2" >
    <div onClick={() => {
        fetchPaymentFunc()
        setPaymentToggle(true)
        setMixedEnabled(false)

    }}> {paymentSaved ? myredux?.payment : 'Tap to select Payment Mode'}</div>

    {
        paymentToggle ? <>
            <div className="space-y-1 mt-2">

                {
                    fetchedPayment?.map((item, index) => (
                        <div key={index} className="w-full rounded-lg bg-white p-2" onClick={() => {

                            if (item.name == 'Mixed') {
                                setMixedEnabled(true)
                            }
                            else {
                                savePaymentToRedux(item.name, 0, 0)
                                setMixedEnabled(false)
                            }
                        }}>
                            {item?.name}
                        </div>
                    ))
                }

                {
                    mixedEnabled ?
                        <div className=" p-2 w-[100%] space-y-2">
                            <div className="flex">
                                <div className="p-1 w-[40%]">Cash :</div>
                                <input type="text" value={inputValueCash} onChange={handleInputChangeCash} className="w-[60%] p-1 rounded-lg text-center" />
                            </div>
                            <div className="flex">
                                <div className="p-1 w-[40%]">Online :</div>
                                <input type="text" value={inputValueOnline} onChange={handleInputChangeOnline} className="w-[60%] p-1 rounded-lg text-center" />
                            </div>
                        </div>
                        : <></>}
            </div>

        </> : <></>
    }
</div >
{/* payment end */ }

        </div >
    )
}