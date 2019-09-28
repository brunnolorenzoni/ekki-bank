import React, { useEffect } from 'react';

import Header from '../../components/Header';
import UserInfo from '../../components/Home/UserInfo';
import NavOperations from '../../components/Home/NavOperations';
import UserTransfers from '../../components/UserTransfers';


import { getUser, getAccount } from '../../service';

import { setUser } from '../../store/actions/user';
import { setAccount } from '../../store/actions/account';

import { connect } from 'react-redux';

const Home = (props) => {

    const { storeUser, setUser, storeAccount, setAccount } = props;

    const idUser = 9;

    useEffect(() => {

        setTimeout(function(){
        getUser(idUser).then(user => {
            setUser(user)
            getAccount(user.id_user).then(account => {
                setAccount(account)
            })
        });
        }, 2000)
    }, []);

    return (
        <>
            <Header/>
            <main className="main-wrapper">
                <UserInfo user={storeUser} account={storeAccount}/>
                <NavOperations />
                <UserTransfers/>
                
            </main>
        </>
    )
}

const mapStateToProps = (state) => {
    return { 
        storeUser: state.user,
        storeAccount: state.account,
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        setUser: (user) => { dispatch(setUser(user)) },
        setAccount: (account) => { dispatch(setAccount(account)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);