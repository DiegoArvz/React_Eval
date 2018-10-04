import axios from 'axios';

const instance = axios.create({
    baseURL:'https://reacttest-36e3e.firebaseio.com/'
})

export default instance;