import './Login.css';
import {Formik, Form, Field, ErrorMessage} from"formik";
import * as yup from "yup";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleClickLogin = (values) => {
        axios.post('http://127.0.0.1:8000/api/login/', {
            username: values.username,
            password: values.password
        })
        .then(response => {
            const token = response.data.access_token;
            const user_id = response.data.user_id;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user_id', user_id)
            navigate('/');
            console.log('login bem sucedido!');
        })
        .catch(error => {
            console.error('Erro: ', error);
        });
    };

    const validationLogin = yup.object().shape({
        username: yup.string().required("Campo obrigatório"),
        password: yup.string().required("Campo obrigatório"),
    });

    return (
        <div className="container">
            <h1 className='loginText'>Acesso</h1>
            <p>Digite os seus dados de acesso no campo abaixo.</p>
            <Formik initialValues={{}}
            onSubmit={handleClickLogin} validationSchema={validationLogin}>
                <Form> 
                    <div className="login-form-group">
                        <label for="username" className="textUser">Usuário:</label>
                        <Field name="username" className="form-field" placeHolder="Nome de Usuário:" />
                        <ErrorMessage name="username" component="span" className="form-error"/>
                    </div>
                    <div className="login-form-group">
                        <label for="password" className="textUser">Senha:</label>
                            <Field name="password" className="form-field" placeHolder="Senha:" />
                            <ErrorMessage name="password" component="span" className="form-error"/>
                    </div>
                    <Link to="/register" className="cadastro">Cadastre-se</Link>
                    <button className="buttonLogin" type='submit'>Acessar</button>
                </Form>
            </Formik>
        </div>
  );
}

export default Login;
