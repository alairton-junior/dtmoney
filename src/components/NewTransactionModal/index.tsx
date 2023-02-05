import Modal from "react-modal";
import { FormEvent, useState } from "react";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/entrada.svg";
import outcomeImg from "../../assets/saida.svg";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";




interface INewTransactionModal {
  isOpen: boolean;
  onReaquestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onReaquestClose,
}: INewTransactionModal) {

    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit'); 

    async function handleCreateNewTransaction(event: FormEvent) {
      event.preventDefault();

      await createTransaction({
        title,
        amount,
        category,
        type,
      })

      setTitle('');
      setAmount(0);
      setCategory('');
      setType('deposit');

      onReaquestClose();
    }
    
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onReaquestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onReaquestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input placeholder="Título" value={title} onChange={event => setTitle(event.target.value)}/>

        <input type="number" placeholder="Valor" value={amount} onChange={event => setAmount(Number(event.target.value))}/>

        <TransactionTypeContainer>
          <RadioBox 
            type="button"
            onClick={ () => setType('deposit')} 
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={ () => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)}/>

        <button type="submit">Adicionar</button>
      </Container>
    </Modal>
  );
}
