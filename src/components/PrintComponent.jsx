import React from "react";

const PrintComponent = React.forwardRef(({ data }, ref) => (
    <div ref={ref} style={{ width: '58mm' }}>
        <div className="w-full">
            <img
                src="https://i.ibb.co/c8tvX2H/hnhblack.png"
                alt=""
                style={{ maxWidth: '100%', height: 'auto' }}
            />

            <div className="text-center">
                <div className="font-bold text-xl">BILL OF SUPPLY</div>
                <div className="text-lg">Bill No. : {data.bill_no}</div>
            </div>

            <div className="w-full pt-1 bg-black mt-2 mb-2"></div>


            <div className="text-center mt-2">
                <div className="font-bold text-2xl">{data.name} - {data.socks}</div>
            </div>
            <div className="flex">
                <div className="w-[30%] text-start">Service :</div>
                <div className="w-[70%] text-end">{data.service}</div>
            </div>
            <div className="flex">
                <div className="w-[50%] text-start">Price :</div>
                <div className="w-[50%] text-end">₹ {data.service_value}/-</div>
            </div>
            <div className="flex">
                <div className="w-[50%] text-start">Socks :</div>
                <div className="w-[50%] text-end">{data.socks}</div>
            </div>
            <div className="flex">
                <div className="w-[50%] text-start">Price :</div>
                <div className="w-[50%] text-end">₹ {data.socks_value}/-</div>
            </div>


            {
                data.payment === 'Mixed' ?
                    <>
                        <div className="flex">
                            <div className="w-[50%] text-start">Paid Cash :</div>
                            <div className="w-[50%] text-end">₹ {data.mixed_cash}/-</div>
                        </div>
                        <div className="flex">
                            <div className="w-[50%] text-start">Paid Online :</div>
                            <div className="w-[50%] text-end">₹ {data.mixed_online}/-</div>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex">
                            <div className="w-[50%] text-start">Payment :</div>
                            <div className="w-[50%] text-end">{data.payment} </div>
                        </div>
                    </>
            }

            <div className="flex">
                <div className="w-[50%] text-start">Billed By :</div>
                <div className="w-[50%] text-end">{data.operator}</div>
            </div>
            <div className="flex">
                <div className="w-[50%] text-start">Bill Date :</div>
                <div className="w-[50%] text-end">{data.date}</div>
            </div>
            <div className="flex">
                <div className="w-[50%] text-start">Bill Time :</div>
                <div className="w-[50%] text-end">{data.time}</div>
            </div>


            <div className="w-full pt-0.5 bg-black"></div>

            <div className="flex">
                <div className="w-[50%] text-start font-bold">Sub Total :</div>
                <div className="w-[50%] text-end font-bold">₹ {data.subTotal}/- </div>
            </div>
            {
                Number(data.discount) > 0 ?

                    <div className="flex">
                        <div className="w-[50%] text-start font-bold">Discount :</div>
                        <div className="w-[50%] text-end font-bold">{data.discount} % </div>
                    </div>
                    :
                    <></>
            }
            <div className="flex">
                <div className="w-[50%] text-start font-bold text-xl">Paid :</div>
                <div className="w-[50%] text-end font-bold text-xl">₹ {data.amount}/- </div>
            </div>
            <div className="text-start text-xs">Including all Taxes</div>
            <div className="w-full pt-0.5 bg-black"></div>

            <div className="text-end text-xs">App by <strong>JAYESH . </strong></div>

        </div>


    </div>
));

export default PrintComponent;
