import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import styled from "styled-components";
import { Card } from "@material-ui/core";

const StyledCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 20%;
  margin: 25px 2%;
  padding: 20px 0;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

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
        <div>
            <h1>Friends</h1>
            <StyledDiv>
            {
                friends.map(friend => {
                    return (<StyledCard key={friend.id}>
                        <p>{friend.name}</p>
                        <p>{friend.age}</p>
                        <p>{friend.email}</p>
                    </StyledCard>
                    );
                })
            }
            </StyledDiv>
        </div>
    )
}

export default FriendsList;