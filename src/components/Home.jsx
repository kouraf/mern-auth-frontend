import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function Home() {
    const { userData } = useContext(UserContext);
    return (
        <div className="container">
            {userData && userData.token ?
                <h3>hello {userData.user.name}</h3>
                :
                <h3>Login or Register please ! </h3>}
        </div>
    )
}
