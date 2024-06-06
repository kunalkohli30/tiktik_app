import axios from 'axios';
import { jwtDecode }  from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type decodedData = {
    name: string,
    picture: string,
    sub: string
}

export const createOrGetUser = async (response: any, addUser: any) => {
    console.log(response);
    const decoded: decodedData = jwtDecode(response?.credential);

    const { name, picture, sub} = decoded;

    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture
    }

    addUser(user);
    
    return await axios.post('http://localhost:3000/api/auth', user)
    // .then(onFullfilled => onFullfilled.status === 200 ? );
    // console.log('decoded', decoded);
};