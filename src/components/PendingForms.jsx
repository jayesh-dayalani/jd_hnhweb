import { useEffect, useState } from "react";
import CardComp from "./CardComp";
import supabase from "../../supabase";

export default function PendingForms() {
    const [cardList, setCardList] = useState()
    const fetchData = async () => {
        console.log('hie');
        const { data, error } = await supabase.from('trampolinemaster').select('*').eq('status', 'pending').order('created_at', { ascending: false })
        if (data) setCardList(data)
        if (error) console.log(error)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <div className="bg-blue-300 container mx-auto flex flex-col justify-between gap-2 pb-[20rem]">
                <div className="w-full  px-[2.5rem]">
                    {/* about cards */}
                    <div className="grid place-items-center gap-10  md:flex-row">
                        {cardList?.map((item, index) => (
                            <CardComp key={index} item={item} />))}
                    </div>
                </div>
            </div>
        </>
    )
}
