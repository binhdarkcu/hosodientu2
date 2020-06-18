
// cs1.pkdksghosoonline.com
//cs2.pkdksghosoonline.com
const portBE = localStorage.getItem('portBackEnd');
let backendAPI = localStorage.getItem('backendAPI') + ':' + portBE;
console.log(backendAPI)
export default backendAPI;
