import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from "./styles/global";

import { useState } from 'react';
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModal] = useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModal(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModal(false);
    }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={ handleOpenNewTransactionModal }/>
      <Dashboard/>
      <NewTransactionModal
        isOpen={ isNewTransactionModalOpen }
        onReaquestClose={ handleCloseNewTransactionModal }/>
      <GlobalStyle/>
    </TransactionsProvider>
  );
}

