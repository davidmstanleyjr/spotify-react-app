import { useState, useEffect } from 'react';
import axios from 'axios'


export default function useAuth(code) {
   const [accessToken, setAccessToken] = useState();
   const [refreshToken, setRefreshToken] = useState();
   const [expiresIn, setExpiresIn] = useState();


   //this gets all the info we need to make the code above work
   useEffect(() => {
       axios.post('http://localhost:3001/login', {
           code,
       }).then(res => {
           console.log(res.data)
       })
   }, {code});
}
