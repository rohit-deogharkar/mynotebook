import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Signup(props) {

  const [credentials, setCredentials] = useState({name:"", email:"", cpassword:"", password:""})
  const navigate = useNavigate()

  const handleSubmit= async(e)=>{
    e.preventDefault()
    const response = await fetch(`http://localhost:3001/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          
      },
      body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
    });
    const json = await response.json()
    console.log(json)
    if(json.success){
      localStorage.setItem('token', json.authtoken)
      navigate('/')
      props.showAlert('Account created succesfully','success')
    }
    else{
      props.showAlert("Invalid credentials", 'danger')

    }
  }

  const onchange=(e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  return (
    <div className="container my-3">
      <h2>Signup to continue to mynotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={credentials.name}
            onChange={onchange}
            name="name"
            minLength={5}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={credentials.email}
            onChange={onchange}
            name="email"
            minLength={5}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={credentials.password}
            onChange={onchange}
            name="password"
            minLength={5}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={credentials.cpassword}
            onChange={onchange}
            name="cpassword"
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
