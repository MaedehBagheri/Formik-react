import { useState } from "react";



const SignupForm =()=>{

const[userData,setUserData]=useState({name:"",email:"",password:""})


const changeHandler =(e)=>{

}

    return (
        <>
        <form>
            <div className="formcontrol">
                <label>Name</label>
                <input type="text" name="name" value={userData.name} onChange={changeHandler}/>
            </div>
            <div className="formcontrol">
                <label>Email</label>
                <input type="text" name="email" value={userData.email} onChange={changeHandler}/>
            </div>
            <div className="formcontrol">
                <label>Password</label>
                <input type="text" name="password" value={userData.password} onChange={changeHandler}/>
            </div>
           <button>submit</button>
        </form>
        </>
    )
}

export default SignupForm;