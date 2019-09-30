import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import Button from '4all-ui/components/Button';
import Select from '4all-ui/components/Select';
import Input from '4all-ui/components/Input';
import Alert from '4all-ui/components/Alert';
import InputCurrency from '4all-ui/components/InputCurrency';

import AlertDialog from '../../AlertDialog';

import { setTransaction } from '../../../service';

const CPFLib = require('node-cpf');

const FormTransaction = (props) => {

    const { user, account, contacts } = props;

    const [ CPFToSend, setCPFToSend ] = useState({
        value: '',
        error: false
    });
    const [ contactToSend, setContactToSend ] = useState({
        value: '',
        error: false
    });
    const [ amountToSend, setAmountToSend ] = useState({
        value: '0,00',
        error: false
    });
    const [ transactionStatusError, setTransactionStatusError ] = useState({
        message: '',
        show: false
    });

    const [ transactionNeedLimit, setTransactionNeedLimit ] = useState({
        dialog: null,
        transaction: null,
        show: false,
    });

    const onChangeSelectContacts = (e) => {
        setContactToSend({...contactToSend, value: e})
    }

    const handleChangeCPF = (e) => {
        setCPFToSend({...CPFToSend, value: e.target.value})
    }
    const handleChangeAmonut = (e, value) => {
        setAmountToSend({...amountToSend, value: value})
    }

    const releaseListener = async (isReleased, key) => {

        console.log(isReleased, key)

        setTransactionNeedLimit({
            ...transactionNeedLimit,
            show: false
        })
        
        if(isReleased){
            const data = {...transactionNeedLimit.transaction, [key]: isReleased}
            const transaction = await setTransaction(data);
            window.location = '/';
        }
        
        else {
            setTransactionStatusError({
                message: "Transferência cancelada.",
                show: true
            })
        }

    }

    const prepareDateToSend = async (amount, toUser, isContact) =>
    {

        const data = {};

        if(isContact){
            data.fom_user = user.id;
            data.to_user = toUser;
            data.amount = amount;
            data.is_contact = isContact
        } else {
            data.fom_user = user.id;
            data.to_user = CPFLib.unMask(toUser);
            data.amount = amount;
            data.is_contact = isContact
        }

        const transaction = await setTransaction(data);

        if(transaction.status == 400){

            if(transaction.data.type == "dialog"){

                setTransactionNeedLimit({
                    dialog: transaction.data,
                    transaction: data,
                    show: true
                })

                
            } else {

                setTransactionStatusError({
                    message: transaction.data.message,
                    show: true
                })

            }
            
        }

        if(transaction.status == 200){
            window.location = '/';
        }
    }


    const handleSubmit = (e) =>
    {
        e.preventDefault();
        const amount = parseFloat(amountToSend.value.replace("R$ ", "").replace(/\./g, "").replace(",", "."));
        if(amount <= 0){
            setAmountToSend({...amountToSend, error: true});
            return;
        }
        setAmountToSend({...amountToSend, error: false});

        if(CPFToSend.value && CPFLib.validate(CPFToSend.value)){
            prepareDateToSend(amount, CPFToSend.value, false);
            setCPFToSend({...CPFToSend, error: false});
            return;
        } else {

            if(!contactToSend.value.value){
                setContactToSend({...contactToSend, error: true});
            } else {
                setContactToSend({...contactToSend, error: false});
                prepareDateToSend(amount, contactToSend.value.value, true);
                return;
            }

            setCPFToSend({...CPFToSend, error: true});
            return;

        }

    }

    const getContactsOptions = () => {

        let optionsContacts = [
            {
                value: false,
                label: "Nenhum"
            }
        ];

        for (let i in contacts){
            optionsContacts.push({ 
                value: contacts[i].user_contact.id,
                label: contacts[i].user_contact.name
            })
        }
        return optionsContacts
    }

    useEffect(() => {

        if(transactionStatusError.show){
            setTimeout(function(){
                setTransactionStatusError({show: false})
            }, 3000)
        }


    }, [transactionStatusError.show]);

    return (
        
        <>
            <form id="form-transaction" >

                <div className="container">
                    
                    <h4 className="title-description">Você pode transferir ...</h4>
                    
                    <div className="form-group">
                        <label htmlFor="select-contact" className="label">... selecionando um contato</label>
                        <Select
                            name="select-contact"
                            value={contactToSend.value}
                            onChange={onChangeSelectContacts}
                            options={getContactsOptions()}
                            optionsListHeight="200px"
                            placeholder="Selecione um contato"
                            closeMenuOnSelect={true}
                            isSearchable={true}
                            error={contactToSend.error}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf" className="label">Ou digitando o CPF de um usuario</label>
                        <Input
                            maxlength="11"
                            name="cpf"
                            onChange={handleChangeCPF}
                            placeholder="Digite o CPF do favorecido"
                            width="100%"
                            value={CPFToSend.value}
                            id="cpf"
                            error={CPFToSend.error}
                        />
                    </div>
                </div>

                <div className="container">
                    <h4 className="title-description">E o valor?</h4>
                    <div className="form-group">
                        <label htmlFor="ammout" className="label">Digite um valor</label>
                        <InputCurrency
                            name="ammout"
                            onChange={handleChangeAmonut}
                            value={amountToSend.value}
                            placeholder="Digite um valor"
                            width="250px"
                            error={amountToSend.error}
                        />
                    </div>
                </div>

                <div className="container wrappar-btns">

                    <Link to="/">
                        <Button onClick={() => {}} secondary>
                            Cancelar
                        </Button>
                    </Link>
                    
                    <Button onClick={handleSubmit}>
                        Confirmar
                    </Button>

                </div>
                

            </form>

            { transactionStatusError.show ?

                <Alert>
                    {transactionStatusError.message}
                </Alert>

                : null

            }

            { transactionNeedLimit.show ?

                <AlertDialog dialog={transactionNeedLimit.dialog} show={transactionNeedLimit.show} releaseListener={releaseListener}/>

            : null

            }
            

        </>

    )

} 

export default FormTransaction;