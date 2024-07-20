import { useState } from "react";
import AcceptCard from "./AcceptCard";
import { useDispatch } from "react-redux";
import { clearForm } from "../redux/FormSlice";

export default function CardComp(item) {
    console.log(item);
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false)

    
    return (
        <>

            <div className="flex flex-col cursor-pointer bg-white justify-center py-3 px-5 text-center items-center mt-12 rounded-2xl shadow-2xl md:min-h-[340px] w-full card-item-div max-w-screen-md min-h-[260px]">
                <p className="text-[24px] font-bold uppercase mb-2">{item.item?.name}</p>
                <p className="text-[15px] font-medium leading-2 w-full">
                    {item.item?.phone}
                </p>
                <img src={item.item?.sign} alt="box_img" className="w-[75px] mb-4" />

                <div className="flex space-x-5">
                    <div className="bg-blue-300 p-2 rounded-lg">Reject</div>
                    <div className="bg-blue-300 p-2 rounded-lg" onClick={() => {
                        if (toggle) {
                            dispatch(clearForm())
                            setToggle(false)
                        }
                        if (!toggle) {
                            setToggle(true)
                        }

                    }}>{toggle ? 'Cancle' : 'Accept'}</div>
                </div>
                {
                    toggle ?
                        <AcceptCard item={item.item} />
                        :
                        <></>}
            </div>

        </>
    )
}
