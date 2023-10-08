import React, { useEffect , useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the local CSS file


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navig = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged In Successfully", "success");
            navig("/")
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        // Add the pleasant-background class to the body element when the component mounts
        document.body.classList.add('pleasant-background');

        // Remove the pleasant-background class when the component unmounts
        return () => {
            document.body.classList.remove('pleasant-background');
        };
    }, []);

    return (
        <div className='login-container mt-2'>
            <h3>Login to use Inotebook</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;
