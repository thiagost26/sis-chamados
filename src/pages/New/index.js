import { useState, useEffect, useContext } from 'react';

import firebase from '../../services/firebaseConnection';
import { useHistory, useParams } from 'react-router-dom'


import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

import './new.css';
import { FiPlusCircle } from 'react-icons/fi';

export default function New() {
    const { id } = useParams();
    const history = useHistory();    

    const [loadCustomers, setLoadCustomers] = useState(true)
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [assunto, setAssunto] = useState('');
    const [status, setStatus] = useState('Em aberto');
    const [complemento, setComplemento] = useState('');

    const [idCustomer, setIdCustomer] = useState(false);

    const { user } = useContext(AuthContext);


    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })
                
                if(lista.length === 0) {
                    console.log('NENHUMA EMPRESA CADASTRADA');
                    setCustomers([ {id: '1', nomeFantasia: 'FREELA'} ]);
                    setLoadCustomers(false);
                    return;
                }

                setCustomers(lista);
                setLoadCustomers(false);

                if(id) {
                    loadId(lista);
                }


            })
            .catch((error) => {
                console.log('DEU ALGUM!', error);
                setLoadCustomers(false);
                setCustomers([ {id: '1', nomeFantasia: ''} ]);
            })

        }

        loadCustomers();

    }, [id]);


    async function loadId(lista) {
        await firebase.firestore().collection('chamados').doc(id)
        .get()
        .then((snapshot) => {
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento)

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId );
            setCustomerSelected(index);
            setIdCustomer(true);

        })
        .catch((error) => {
            console.log('ERRO NO ID PASSADO', error);
            setIdCustomer(false);
        })
    }



    async function handleRegister(e) {
        e.preventDefault();

        if(idCustomer) {
            await firebase.firestore().collection('chamados')
            .doc(id)
            .update({
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid
            })
            .then(() => {
                toast.success('Chamado editado com sucesso!');
                setCustomerSelected(0);
                setComplemento('');
                history.push('/dashboard');
            })
            .catch((error) => {
                toast.error('Ops erro ao registrar, tente mais tarde.')
                console.log(error);
            })

            return;
        }

        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })
        .then(() => {
            console.log()
            toast.success('Chamado criado com sucesso!');
            setComplemento('');
            setCustomerSelected(0);
        })
        .catch((error) => {
            toast.error('Ops erro ao registrar, tente mais tarde.');
            console.log(error);
        })


    }

    //TROCAR SELECT
    function handleChangeSelect(e) {
        setAssunto(e.target.value);
        console.log(e.target.value);
    }

    //MUDAR STATUS
    function handleStatus(e) {
        setStatus(e.target.value);
        console.log(e.target.value);
    }


    //CHAMANDO MUDANÇA DE USUÁRIO
    function handleChangeCustomers(e) {
        console.log('INDEX DO CLIENTE SELECIONADO', e.target.value);
        console.log('cliente selecionado', customers[e.target.value]);
        setCustomerSelected(e.target.value);
    }




    return(

        <div>
            <Header />

            <div className="content">
                <Title name="Novo Chamado">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>

                        <label>Cliente</label>

                        {loadCustomers ? (
                            <input type="text" disabled={true} value="Carregando clientes..." />
                        ) :(
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item,index) => {
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    )
                                })}
                            </select>
                        )}


                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Técnica">Visita Técnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input 
                            type="radio"
                            name="radio"
                            value="Em aberto"
                            onChange={handleStatus}
                            checked={status === 'Em aberto'}
                            />
                            <span>Em aberto</span>

                            <input 
                            type="radio"
                            name="radio"
                            value="Progresso"
                            onChange={handleStatus}
                            checked={status === 'Progresso'}                      
                            />
                            <span>Progresso</span>

                            <input 
                            type="radio"
                            name="radio"
                            value="Atendido"
                            onChange={handleStatus}    
                            checked={status === 'Atendido'}                 
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea 
                            type="text"
                            placeholder="Descreva seu problema"
                            name="complemento"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />     

                        <button type="submit">Registrar</button>                           


                    </form>

                </div>


            </div>
        </div>
    )
}