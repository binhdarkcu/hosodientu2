
// cs1.pkdksghosoonline.com
//cs2.pkdksghosoonline.com
const portBE = localStorage.getItem('portBackEnd') || 9001;
let backendAPI = localStorage.getItem('backendAPI') || 'https://cs1.pkdksghosoonline.com'
backendAPI = backendAPI + ':' + portBE
console.log(backendAPI)
export default backendAPI;
