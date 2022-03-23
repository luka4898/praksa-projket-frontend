

 export const isAuthenticated = () => fetch("https://localhost:7100/api/Authenticate/loggeduser")
    .then(response => response.json());
   

