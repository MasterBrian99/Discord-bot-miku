const axios = require('axios');
require('dotenv').config({ path: '../.env' });


 const  getUser =async () =>{
    try {
        const response = await axios.get(process.env.GITHUB_API); 
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }


}

