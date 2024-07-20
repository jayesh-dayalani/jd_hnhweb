import { NavLink } from "react-router-dom";

export default function NavComp() {
    return (
        <div className="bg-blue-400 container mx-auto flex flex-row justify-between">
           <NavLink to='/pending' className='w-1/4 flex flex-col cursor-pointer  justify-center py-6 px-10 text-center items-center mt-12 rounded-2xl md: card-item-div max-w-screen-md '>Pending</NavLink>
           <NavLink to='/accepted' className='w-1/4 flex flex-col cursor-pointer  justify-center py-6 px-10 text-center items-center mt-12 rounded-2xl md: card-item-div max-w-screen-md'>Accepted</NavLink>
           <NavLink to='/rejected' className='w-1/4 flex flex-col cursor-pointer  justify-center py-6 px-10 text-center items-center mt-12 rounded-2xl md: card-item-div max-w-screen-md'>Rejected</NavLink>
           <NavLink to='/inventory' className='w-1/4 flex flex-col cursor-pointer justify-center py-6 px-10 text-center items-center mt-12 rounded-2xl md: card-item-div max-w-screen-md'>Inventory</NavLink>
        </div>
    )
}