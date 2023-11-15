import React from 'react'
import { useState, useEffect } from "react";
import API from '../../api/API';
const Sample = () => {
const [user_list, setUsers] = useState([

]);
useEffect(() => {
        const fetchSession = async () => {
          const res = await API.get("/api/UserAPI/List");
          const data = await res.json();
          setUsers(data.data);
        };
        fetchSession();
      });
  return (
    <div>
     
            {user_list.map((user, index) => {
              return (
              <p>
{user.id}
                {user.first_name}
                {user.last_name}
               {user.email}
                {user.role}
             
              </p>
               
              )
                })}
        
    </div>
  )
}

export default Sample
