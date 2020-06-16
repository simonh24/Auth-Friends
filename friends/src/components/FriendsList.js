import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const FriendsList = () => {
    const [friends, setFriends] = useState([]);

    const getFriends = () => {
        axiosWithAuth()
            .get("/api/friends")
            .then(res => setFriends(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getFriends();
    }, [friends])
    return (
        <>
            {
                friends.map(friend => {
                    return (<div key={friend.id}>
                        <p>{friend.name}</p>
                        <p>{friend.age}</p>
                        <p>{friend.email}</p>
                    </div>
                    );
                })
            }
        </>
    )
}

export default FriendsList;