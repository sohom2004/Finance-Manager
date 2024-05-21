import React from 'react';
import { useFinancialRecords } from '../Context/recordContext';

const RecordListList = ({ data }) => {
  const {deleteRecord} = useFinancialRecords();
  return (
    <div>
      <div className='flex justify-center items-center'>
        <input value={data.date.slice(0, 10)} type='text' name='date' className='m-1 px-1'/>
        <input value={data.description} type='text' name='description' className='m-1 px-1'/>
        <input value={data.amount} type='number' name='amount' className='mx-1 my-2 px-1'/>
        <input value={data.category} type='text' name='category' className='m-1 px-1'/>
        <input value={data.paymentMethod} type='text' name='payment_method' className='m-1 px-1'/>
        <button onClick={()=>deleteRecord(data._id)} className='my-4 p-2 bg-emerald-300 text-white rounded-md shadow shadow-black-500/50 hover:bg-emerald-500 hover:shadow-lg'>Delete</button>
      </div>
    </div>
  );
};

export default RecordListList;
