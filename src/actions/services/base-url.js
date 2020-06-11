
// cs1.pkdksghosoonline.com
//cs2.pkdksghosoonline.com
const portBE = localStorage.getItem('portBackEnd');
let backendAPI = localStorage.getItem('backendAPI') + ':' + portBE;

export default backendAPI;
