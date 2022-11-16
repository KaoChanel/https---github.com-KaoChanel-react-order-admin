import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { loginUser } from '../store/reducers/authSlice';

// interface FieldState {
//     value: string
//     valid: boolean
//     errorMsg: string
// }

interface LoginFormModel {
    username: string,
    password: string,
    remember: boolean | false
}

const LoginFormSchema = yup.object().shape({
    username: yup.string().min(5).required(),
    password: yup.string().required()
});

function Login() {
    const [isAuthLoading, setAuthLoading] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigator = useNavigate();

    // const handleSubmit(event: FormEvent<HTMLFormElement>) {
    //     event.preventDefault()
    // }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextFormState = {
            ...form,
            [event.target.name]: event.target.value,
        };

        setForm(nextFormState);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        // const payload = {}

        // const response = await fetch('/api/auth/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(payload)
        // }).then(res => res.json())

        try {
            e.preventDefault();
            setAuthLoading(true);
            // alert(JSON.stringify(form, null, 2));

            if (form.email === 'admin' && form.password === 'admin') {
                toast.success('Welcome Pookao !');
                dispatch(loginUser(''));
                navigator('/');
            }
            else{
                toast.info('Invalid, E-mail & Password not match.');
            }
            setAuthLoading(false);
        }
        catch(error: any) {
            setAuthLoading(false);
            toast.error(error.message || 'Failed !!');
        }
    }

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-12 col-md-6 offset-md-3">
                    <h2 className="my-4 text-center">LOGIN</h2>

                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                type="text"
                                name='email'
                                onChange={handleChange}
                                className="form-control"
                                id="email01"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                name='password'
                                onChange={handleChange}
                                className="form-control"
                                id="password01"
                                placeholder="Password"
                            />
                        </div>
                        {/* <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Accept term and conditions
              </label>
            </div> */}

                        <button type="submit" className="btn btn-primary">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login