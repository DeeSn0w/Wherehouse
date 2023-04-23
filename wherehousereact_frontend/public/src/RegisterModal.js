import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

export function RegisterModal({ isOpen, onClose }) {
  const [nev, setnev] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Felhasználó regisztrálása ${nev}:${email}:${password}`);

    const response = await fetch('https://localhost:7240/Tulajdonos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nev: nev,
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`Sikeres regisztráció ${data.id}`);
      onClose();
      setnev('');
      setEmail('');
      setPassword('');
      window.alert('Sikeres regisztráció!');
    } else {
      console.error(`Hiba regisztráláskor: ${data.message}`);
      window.alert('Regisztráció sikertelen!');
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseModal = () => {
    setnev('');
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={{
        content: {
          width: '400px',
          height: '500px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '5px',
          overflow: 'hidden'
        }
      }}
    >
      <button className="btn-close" onClick={handleCloseModal}></button>
      <h2 style={{ color: '#333333' }}>Regisztráció</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="nev" style={{ display: 'block', marginBottom: '5px', color: '#333333' }}>Felhasználónév</label>
          <input type="text" id="nev" value={nev} onChange={(e) => setnev(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', width: '100%', boxSizing: 'border-box' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#333333' }}>E-mail cím</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', width: '100%', boxSizing: 'border-box' }} required />
        </div>
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#333333' }}>Jelszó</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
              width: '100%',
              boxSizing: 'border-box'
            }}
            required
          />
          <i
            className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}
            style={{
              position: 'absolute',
              top: '70%',
              right: '10px',
              transform: 'translateY(-50%)',
              cursor: 'pointer'
            }}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
        <br></br>
        <button type="submit" style={{ backgroundColor: '#333333', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', border: 'none', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}>Regisztráció</button>
      </form>
    </Modal>
  );
}
export default RegisterModal;