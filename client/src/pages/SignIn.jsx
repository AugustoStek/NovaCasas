
import '../css/SignIn.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
    console.log(formData);

    const res = await fetch('/api/auth/signin',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await res.json();
    if(data.success === false){
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data.user));
    navigate('/');
    console.log(data);
    } catch (error) {
      dispatch(signInFailure('Error al iniciar sesión. Por favor, inténtalo de nuevo.' + error.message));
    }
  }

  console.log(formData);
  return (
    <div className='signup'>
      <div className='signup-card'>
        <h1 className='title'>Iniciar sesión</h1>

        <p className='subtitle'>
          La mejor experiencia en alquileres comienza aquí. 
        </p>

        <form className='form' onSubmit={handleSubmit}>
          <input
            id='email'
            className='input'
            type='email'
            placeholder='Correo electrónico'
            onChange={handleChange}
          />

          <input
            id='password'
            className='input'
            type='password'
            placeholder='Contraseña'
            onChange={handleChange}
          />

          <button className='btn' 
          disabled={loading}>
            {loading ? 'Cargando...' : 'iniciar sesión'}
          </button>
          <OAuth />
        </form>

        <div className='link'>
          <p>¿Aún tienes una cuenta?</p>

          <Link to='/sign-up'>
            <span className='link-text'>
              Registrarse
            </span>
          </Link>
        </div>
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
  )
}