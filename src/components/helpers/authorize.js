export const Role = {
  Admin: 'Admin',
  User: 'User',
  Dev:'Dev',
  Guest:'Guest',
  Company:'Company'
}

export const authorize = (roles = []) =>{
  if (typeof roles === "string") {
    roles = [roles];
  } 
  let UserRoles = JSON.parse(localStorage.getItem("authUser")).roles;  
  for(let i=0; i<roles.length; i++){
    if(UserRoles.find(x=>x.name == roles[i])) return true;
  } 
  return false;
}
 