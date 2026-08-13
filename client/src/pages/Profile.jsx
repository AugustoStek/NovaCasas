import '../css/Profile.css';
import { useSelector } from 'react-redux';

export default function Profile() {
  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  console.log('CURRENT USER:', currentUser);
  return (
    <div className='profile-container'>

      <h1 className='tittle'>Perfil</h1>

      <form className='form-profile'>

        <img
          className='imagen-profile'
          src={currentUser.avatar}
          alt='profile'
        />

        <input
          className='input-profile'
          type='text'
          placeholder='Nombre de usuario'
          id='username'
        />

        <input
          className='input-profile'
          type='email'
          placeholder='Email'
          id='email'
        />

        <input
          className='input-profile'
          type='password'
          placeholder='Contraseña'
          id='password'
        />

        <button
          className='btn-profile'
          type='submit'
        >
          Actualizar
        </button>

      </form>

      <div className='div-profile'>
        <span className='span-profile'>
          Eliminar cuenta
        </span>

        <span className='span-profile'>
          Cerrar sesión
        </span>
      </div>

    </div>
  );
}