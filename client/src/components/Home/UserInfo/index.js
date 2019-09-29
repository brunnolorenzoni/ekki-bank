import React from 'react';

import BalanceInfo from './BalanceInfo'
import UserData from './UserData'

import Loader from '4all-ui/components/Loader';

const UserInfo = (props) => {

    const { user, account } = props;

    return (
        <section className="section section-home user-info">
            {Object.keys(user).length && Object.keys(account).length ? 
                <>
                    <UserData name={user.name} cpf={user.cpf} />
                    <BalanceInfo balance={account.balance} limit={account.limit}/>
                </>
                : <Loader color="#3f51b5" />
            }
        </section>
    )


}

export default UserInfo;