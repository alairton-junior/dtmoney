
import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface IHeader {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: IHeader) {

    return (
        <Container>
            <Content>
            <img src={logoImg} alt="dt money" />
            <button type="button" onClick={ onOpenNewTransactionModal }>
                Nova transação
            </button>

           
            </Content>
        </Container>
    )
}