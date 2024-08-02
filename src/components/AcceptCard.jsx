import React, { useEffect, useRef, useState } from "react"
import supabase from "../../supabase"
import { useDispatch, useSelector } from "react-redux"
import { addAmount, addDiscount, addMixedCash, addMixedOnline, addOperator, addPayment, addService, addServiceValue, addSocks, addSocksValue, clearForm } from "../redux/FormSlice"
// import escpos from 'escpos';
// import 'escpos-usb';
import { useReactToPrint } from "react-to-print"
import PrintComponent from "./PrintComponent"

export default function AcceptCard(fromthere) {

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Format the date as per your locale
    const formattedTime = currentDate.toLocaleTimeString(); // Format the time as per your locale

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
    const [inputDiscountValue, setInputDiscountValue] = useState();
    const [discountSaved, setDiscountSaved] = useState(false)

    const saveDiscountToRedux = (event) => {
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
        // setPaymentSaved(false)
        console.log('calculated');
        setSubtotal(Number(myredux?.service_value) + Number(myredux?.socks_value))
        if (myredux?.payment === "Card") {
            let amt = Number(myredux?.service_value) - Number(myredux?.service_value) * Number(myredux?.discount) / 100 + Number(myredux?.socks_value);
            setToPay(amt * 1.02); // Adding 2% to the total amount
            dispatch(addAmount(amt * 1.02))
            console.log("card detected, add 2% here", amt * 1.02);
        }
        else {
            setToPay(Number(myredux?.service_value) - Number(myredux?.service_value) * Number(myredux?.discount) / 100 + Number(myredux?.socks_value))
            console.log("non card payment detected");
            dispatch(addAmount(Number(myredux?.service_value) - Number(myredux?.service_value) * Number(myredux?.discount) / 100 + Number(myredux?.socks_value)))
        }
        console.log('calculated total->', myredux?.amount);
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
        calculateAmount()
        if (mixedEnabled) {
            if (Number(paymentSelectedValueCash) + Number(paymentSelectedValueOnline) === myredux?.amount) {
                console.log('sexy -> dispatch');
                dispatch(addPayment(paymentSelected))
                dispatch(addMixedCash(paymentSelectedValueCash))
                dispatch(addMixedOnline(paymentSelectedValueOnline))
                setPaymentSaved(true)
                setPaymentToggle(false)
            }
            else {
                console.log('wrong sum xxxxx');
            }
        }
        else {
            console.log('sexy -> dispatch notmixed');
            dispatch(addPayment(paymentSelected))
            dispatch(addMixedCash(paymentSelectedValueCash))
            dispatch(addMixedOnline(paymentSelectedValueOnline))
            setPaymentSaved(true)
            setPaymentToggle(false)
        }
    }

    const [inputValueCash, setInputValueCash] = useState();
    const handleInputChangeCash = (event) => {
        setInputValueCash(event.target.value);
        savePaymentToRedux('Mixed', event.target.value, inputValueOnline)
        console.log(event.target.value, '->cash');
    };

    const [inputValueOnline, setInputValueOnline] = useState();
    const handleInputChangeOnline = (event) => {
        setInputValueOnline(event.target.value);
        savePaymentToRedux('Mixed', inputValueCash, event.target.value)
        console.log(event.target.value, '->online');
    };
    // payment end

    // print
    // Create a ref to hold the print component
    const componentRef = useRef();

    // Function to handle print
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // Define PrintComponent inside AcceptCard using React.forwardRef
    // const PrintComponent = React.forwardRef((props, ref) => (
    //     <div ref={ref}>
    //         hello
    //     </div>
    // ))

    const checkPrint = () => {
        if (myredux?.operator === '' || myredux?.service === '' || myredux?.socks === '' || myredux?.payment === '') {
            console.log('print empty---', myredux);
        } else {
            console.log('print success---', myredux)
            printFunc()
        }
    }

    const printFunc = async () => {
        const { error } = await supabase.from('bills_printed').insert({
            bill_no: fromthere.item.bill_no,
            name: fromthere.item.name,
            service: myredux.service,
            service_value: myredux.service_value,
            socks: myredux.socks,
            socks_value: myredux.socks_value,
            subTotal: subTotal,
            discount: myredux.discount,
            amount: myredux.amount,
            phone: fromthere.item.phone,
            operator: myredux.operator,
            payment: myredux.payment,
            mixed_cash: myredux.mixed_cash,
            mixed_online: myredux.mixed_online,
            date: formattedDate,
            time: formattedTime,
        })
        if (error) {
            console.log(error, 'in bills_printed');
            alert('error in printfunc')
        }

        const { error2 } = await supabase
            .from('trampolinemaster')
            .update({ status: 'accepted' })
            .eq('bill_no', fromthere.item.bill_no)
        if (error2) {
            console.log(error2, 'in trampoline master');
        }

        handlePrint();


    };
    // print end


    useEffect(() => {

        fetchOperatorsFunc()
        fetchServicesFunc()
        fetchSocksFunc()
        console.log('from there ->>', fromthere.item.bill_no);

    }, [])

    return (
        <div className="w-[90%] mt-5 p-3 space-y-2">


            {/* operator */}
            <div className="w-full bg-blue-300 rounded-xl p-2">
                <div onClick={() => {
                    fetchOperatorsFunc()
                    setOperatorToggle(true)
                }}>
                    {operatorSaved ? myredux?.operator : 'Tap to select Operator'}
                </div>
                {operatorToggle ? (
                    <div className="space-y-1 mt-2">
                        {fetchedOperators?.map((item, index) => (
                            <div key={index} className="w-full rounded-lg bg-white p-2" onClick={() => {
                                saveOperatorToRedux(item.name)
                            }}>
                                {item?.name}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            {/* operator end */}

            {/* service */}
            <div className="w-full bg-blue-300 rounded-xl p-2">
                <div onClick={() => {
                    fetchServicesFunc()
                    setServicesToggle(true)
                }}>
                    {servicesSaved ? myredux?.service : 'Tap to select Service'}
                </div>
                {servicesToggle ? (
                    <div className="space-y-1 mt-2">
                        {fetchedServices?.map((item, index) => (
                            <div key={index} className="w-full rounded-lg bg-white p-2" onClick={() => {
                                saveServicesToRedux(item.name, item.value)
                            }}>
                                {item?.name}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            {/* service end */}

            {/* socks */}
            <div className="w-full bg-blue-300 rounded-xl p-2">
                <div onClick={() => {
                    fetchSocksFunc()
                    setSocksToggle(true)
                }}>
                    {socksSaved ? myredux?.socks : 'Tap to select Socks'}
                </div>
                {socksToggle ? (
                    <div className="space-y-1 mt-2">
                        {fetchedSocks?.map((item, index) => (
                            <div key={index} className="w-full rounded-lg bg-white p-2" onClick={() => {
                                saveSocksToRedux(item.name, item.value)
                            }}>
                                {item?.name}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            {/* socks end */}

            {/* discount */}
            <div className="w-full bg-blue-300 rounded-xl p-2 flex">
                <div className="w-[40%]">Discount :</div>
                <input type="text" value={inputDiscountValue} onChange={saveDiscountToRedux} className="bg-blue-300 text-center w-[60%]" />
            </div>
            {/* discount end */}

            <div className="w-full bg-blue-300 rounded-xl p-2 text-center" onClick={() => calculateAmount()}>Tap to Calculate Amount: {myredux?.amount}</div>

            {/* payment */}
            <div className="w-full bg-blue-300 rounded-xl p-2">
                <div onClick={() => {
                    fetchPaymentFunc()
                    setPaymentToggle(true)
                    setMixedEnabled(false)
                }}>
                    {paymentSaved ? myredux?.payment : 'Tap to select Payment Mode'}
                </div>
                {paymentToggle ? (
                    <div className="space-y-1 mt-2">
                        {fetchedPayment?.map((item, index) => (
                            <div key={index} className="w-full rounded-lg bg-white p-2" onClick={() => {
                                if (item.name === 'Mixed') {
                                    setMixedEnabled(true)
                                } else {
                                    savePaymentToRedux(item.name, 0, 0)
                                    setMixedEnabled(false)
                                }
                            }}>
                                {item?.name}
                            </div>
                        ))}
                        {mixedEnabled ? (
                            <div className="p-2 w-[100%] space-y-2">
                                <div className="flex">
                                    <div className="p-1 w-[40%]">Cash :</div>
                                    <input type="text" value={inputValueCash} onChange={handleInputChangeCash} className="w-[60%] p-1 rounded-lg text-center" />
                                </div>
                                <div className="flex">
                                    <div className="p-1 w-[40%]">Online :</div>
                                    <input type="text" value={inputValueOnline} onChange={handleInputChangeOnline} className="w-[60%] p-1 rounded-lg text-center" />
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>
            {/* payment end */}



            {/* print */}
            <div className="bg-white  flex">
                <div className="hidden">
                    {/* xxxxxxxxxxxxxxxxxxxxxx */}
                    <PrintComponent ref={componentRef} data={
                        {
                            bill_no: fromthere.item.bill_no,
                            name: fromthere.item.name,
                            service: myredux.service,
                            service_value: myredux.service_value,
                            socks: myredux.socks,
                            socks_value: myredux.socks_value,
                            subTotal: subTotal,
                            discount: myredux.discount,
                            amount: myredux.amount,
                            phone: fromthere.item.phone,
                            operator: myredux.operator,
                            payment: myredux.payment,
                            mixed_cash: myredux.mixed_cash,
                            mixed_online: myredux.mixed_online,
                            date: formattedDate,
                            time: formattedTime,

                        }
                    } />
                </div>
                <div className="bg-blue-300 mx-auto rounded-xl p-2 pl-3 pr-3" onClick={() => checkPrint()}>
                    Print
                </div>
            </div>
            {/* print end */}
        </div>
    )
}
