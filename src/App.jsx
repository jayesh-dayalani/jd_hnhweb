import React from 'react'
import { useSelector } from 'react-redux'
import supabase from '../supabase';
import NavComp from './components/NavComp';

function App() {
  const formdata = useSelector(state => state.form)
  const saveComp = async () => {
      console.log(formdata);
      alert(formdata.comp2)
      const {data, error} = await supabase.from('trampolinemaster').select('*')
      if(data){
        console.log('datad:',data);
      }
      if(error){
        console.log(error);
      }
  }
  return (
    <>
    <div className="bg-black"></div>
    </>
  )
}

export default App
