import { useUser } from '@clerk/clerk-react';
import { createContext, useContext, useEffect, useState } from 'react';

const record = {
    id: String,
    userID: String,
    date: Date,
    description: String,
    amount: Number,
    category: String,
    paymentMethod: String,
}

const FinancialContextType = {
    records: [record],
    addRecord: (record) => { },
    deleteRecord: (id) => {} 
}

export const FinancialRecordsContext = createContext(FinancialContextType || undefined);

export const FinancialRecordsProvider = ({ children }) => {
    const [stateRecord, setRecord] = useState([]);
    const { user } = useUser();

    const fetchRecord = async () => {
        const response = await fetch(`http://localhost:3001/getData/${user?.id}`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }});

        if (response.ok) {
            const records = await response.json();
            console.log(records);
            setRecord(records);
        }
    };

    useEffect(() => {
        if (user) {
            fetchRecord();
        }
    }, [user]);


    const addRecord = async (record) => {
        const response = await fetch("http://localhost:3001/", {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-type": "application/json",
            }
        });

        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecord((prev) => [...prev, newRecord]);
            }
        } catch (error) {
            console.log(error);
        }

    }

    const deleteRecord = async (id) => {
        const response = await fetch(`http://localhost:3001/${id}`, {
            method: "DELETE",
        });

        try {
            if (response.ok) {
                const deletedRecord = await response.json();
                setRecord((prev) => prev.filter((record)=> record._id !== deletedRecord._id));
            }
        } catch (error) {
            console.log(error);
        }

    }

    return <FinancialRecordsContext.Provider value={{ stateRecord, addRecord, deleteRecord }}>
        {children};
    </FinancialRecordsContext.Provider>
}

export const useFinancialRecords = () => {
    const context = useContext(FinancialRecordsContext || undefined);

    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider.")
    };

    return context;
}