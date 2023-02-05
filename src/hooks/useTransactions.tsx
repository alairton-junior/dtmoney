import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface ITransaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionContextData {
    transactions: ITransaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

interface TransactionProviderProps {
    children: ReactNode;
}

const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {

    
    const [transactions, setTransactions] = useState<ITransaction[]>([]);

    useEffect(() => {
        api('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput : TransactionInput) {    
         const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        })
         const { transaction } = response.data;

         setTransactions([...transactions, transaction]);
    } 

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            { children }
        </TransactionsContext.Provider>
    );
}


export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}