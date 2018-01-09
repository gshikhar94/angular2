export class Users{
    Phone:string;
    DateOfBirth:string;
    userName:string;
    password:string;

    constructor(phone:string,dob:string,username:string,password:string){
        this.Phone = phone;
        this.DateOfBirth = dob;
        this.userName = username;
        this.password = password;
    }
    // toString():string{
     
    //     return (console.log("Username : "+user.userName+"Password : "+ password+"Date of birth : "+));
    // }
}