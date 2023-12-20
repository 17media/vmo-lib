// import uuid from 'uuid';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
export const meow = () => {
    // const id = uuid.v4();
    // const id = uuidv4();
    console.log('meow !');
    return axios.get('http://google.com');
    // return id;
};
export default meow;
//# sourceMappingURL=cat.js.map