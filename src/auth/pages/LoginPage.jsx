
import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
};
const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
};


export const LoginPage = () => {
  
    const {startLogin, errorMessage, startRegister} = useAuthStore();

    const {loginEmail, loginPassword, onInputChange:onLoginInputChange, onResetForm} = useForm(loginFormFields);
    const {registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange, onResetForm:onResetFormRegister} = useForm(registerFormFields);

    const onLoginSubmit = (event) => {
        event.preventDefault();

        onResetForm();
        startLogin({email: loginEmail, password: loginPassword,});
    };

    const onRegisterSubmit = (event) => {
        event.preventDefault();

        startRegister({name: registerName, email: registerEmail, password: registerPassword})
        if (registerPassword !== registerPassword2) {
            Swal.fire('Error en registro', 'contrasenas no coinciden', 'error'); //? 1er arg msg, 2do dependencia, 3er icono
            return
        }
        // console.log({registerName, registerEmail, registerPassword, registerPassword2});
    };

    //* mostrando error message
    useEffect(() => {
      if (errorMessage !== undefined) {
        Swal.fire('Error en la autenticacion', errorMessage, 'error'); //? 1er arg msg, 2do dependencia, 3er icono
      }
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row g-2">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={onLoginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={onRegisterSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
