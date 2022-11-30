import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPermIdentity} from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, Row, Wrapper, Text, HaveAccount, MakeLogin } from './styles';

const Signin = () => {

    const navigate = useNavigate()

    const handleClickSignin = () => {
        navigate('/login')
    }

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });
    
    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Faça seu cadastro</TitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Nome completo" leftIcon={<MdPermIdentity />} name="name"  control={control} />
                    {errors.name && <span>Nome completo é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <Text>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO</Text>
                </Row>
                <Row>
                    <HaveAccount>Já tenho conta.</HaveAccount> <MakeLogin onClick={handleClickSignin}>Fazer login</MakeLogin>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Signin }

//TODO Fazer com que button criartext redirecione á pagina de cadastro/signin