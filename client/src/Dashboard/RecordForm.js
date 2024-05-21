import React from 'react';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useFinancialRecords } from '../Context/recordContext';

const RecordForm = () => {

    const {user} = useUser();

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const { addRecord } = useFinancialRecords();


    const handleSubmit = (e) =>{
        e.preventDefault();

        const newRecord = {
            userID: user?.id,
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod,
        };

        console.log(newRecord);

        addRecord(newRecord);
        setDescription("");
        setAmount("");
        setCategory("");
        setPaymentMethod("");
    };

    return (
        <div className='flex flex-col items-center text-center justify-center'>
            <form className='flex flex-col w-full items-center' onSubmit={handleSubmit}>
                <div className='py-4 md:py-2 px-32 md:px-0 flex md:flex-row flex-col justify-center w-full md:w-5/6'>
                    <label className='m-1 md:px-1 w-32 text-5xl md:text-sm pb-2 md:pb-0'>Description:</label>
                    <input type='text' name='description' placeholder='Enter description' value={description} onChange={(e)=>{setDescription(e.target.value)}} required className='md:w-3/4 w-full px-1 py-5 md:py-1 shadow shadow-black-500/50 text-2xl md:text-sm' />
                </div>
                <div className='py-4 md:py-2 px-32 md:px-0 flex md:flex-row flex-col justify-center w-full md:w-5/6'>
                    <label className='m-1 md:px-1 w-32 text-5xl md:text-sm pb-2 md:pb-0'>Amount:</label>
                    <input type='number' name='amount' placeholder='Enter amount' value={amount} onChange={(e)=>{setAmount(e.target.value)}} required className='md:w-3/4 w-full px-1 py-5 md:py-1 shadow shadow-black-500/50 text-2xl md:text-sm' />
                </div>
                <div className='py-4 md:py-2 px-32 md:px-0 flex md:flex-row flex-col justify-center w-full md:w-5/6'>
                    <label className='m-1 md:px-1 w-32 text-5xl md:text-sm pb-2 md:pb-0'>Category:</label>
                    <select required name='category' value={category} onChange={(e)=>{setCategory(e.target.value)}} className='md:w-3/4 w-full px-1 py-5 md:py-1 shadow shadow-black-500/50 text-2xl md:text-sm'>
                        <option value="">Select a Category</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Salary">Salary</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className='py-4 md:py-2 px-8 md:px-0 flex md:flex-row flex-col justify-center w-5/6'>
                    <label className='m-1 md:px-1 w-32 text-5xl md:text-sm pb-2 md:pb-0'>Payment:</label>
                    <select required name='paymentMethod' value={paymentMethod} onChange={(e)=>{setPaymentMethod(e.target.value)}} className='md:w-3/4 w-full px-1 py-5 md:py-1 shadow shadow-black-500/50 text-2xl md:text-sm mb-20 md:mb-0'>
                        <option value="">Select a Payment method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>
                <button type='submit' className='h-18 md:h-10 justify-center text-center text-5xl md:text-lg md:rounded-lg my-12 p-8 md:p-2 bg-emerald-300 text-white rounded-2xl shadow shadow-black-500/50 hover:bg-emerald-500 hover:shadow-lg mb-20 md:mb-0'>
                    Add Record
                </button>
            </form>
        </div>
    )
}

export default RecordForm
