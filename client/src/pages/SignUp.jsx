
import '../css/SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      setLoading(true);
    console.log(formData);

    const res = await fetch('/api/auth/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await res.json();
    if(data.success === false){
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
    console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  console.log(formData);
  return (
    <div className='signup'>
      <div className='signup-card'>
        <h1 className='title'>Crear cuenta</h1>

        <p className='subtitle'>
          La mejor experiencia en alquileres comienza aquí. 
        </p>

        <form className='form' onSubmit={handleSubmit}>
          <input
            id='username'
            className='input'
            type='text'
            placeholder='nombre de usuario'
            onChange={handleChange}
          />

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
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>

        <div className='link'>
          <p>¿Ya tienes una cuenta?</p>

          <Link to='/sign-in'>
            <span className='link-text'>
              Iniciar sesión
            </span>
          </Link>
        </div>
        {error && <p className='error'>{error}</p>}
      </div>
    </div>
  )
}

/*
import '../css/SignUp.css'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='signup'>
      <h1 className='title'>Crear cuenta</h1>
      <form className='form'>
        <input 
        className='input' 
        type="text" 
        placeholder='Nombre de usuario' />

        <input 
        className='input' 
        type="email" 
        placeholder='Correo electrónico' />
        
        <input 
        className='input' 
        type="password" 
        placeholder='Contraseña' />

        <button className='btn'>
          registrarse
        </button>
        <div className='link'>
          <p>
            Aun no tienes una cuenta?
          </p>
          <Link to={'/signin'}>
            <span className='link-text'>
              inicia sesion
            </span>
          </Link>
        </div>
      </form>
    </div>
  )
}
*/