import '../css/OAuth.css'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const proveedor = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, proveedor);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    

      console.log('Usuario autenticado:', result);

    } catch (error) {
      console.error('Error durante autenticacion de google:', error);
    }
  }
  return (
    <button onClick={handleGoogleClick} className='oauth-button'>
        Iniciar sesión con Google
    </button>
  )
}
