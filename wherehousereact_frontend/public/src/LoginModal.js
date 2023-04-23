import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";

export function LoginModal({ isOpen, onClose }) {
  const [nev, setnev] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

    const response = await fetch(`https://localhost:7240/Login?name=${nev}&password=${password}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nev: nev,
        password: password
      })
    });

    if (response.ok) {
      const userData = await response.json();
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Sikeres bejelentkezés!');
      console.log(userData)
      window.alert('Sikeres bejelentkezés!');
      navigate("/");
      onClose();
    } else {
      console.log('Bejelentkezés sikertelen!');
      window.alert('Helytelen adatok!');
    }
  };

  const handleCloseModal = () => {
    setnev('');
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
          height: '300px',
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
      <h2 style={{ color: '#333333' }}>Bejelentkezés</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="nev" style={{ display: 'block', marginBottom: '5px', color: '#333333' }}>Felhasználónév</label>
          <input type="text" id="nev" value={nev} onChange={(e) => setnev(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', width: '100%', boxSizing: 'border-box' }} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#333333' }}>Jelszó</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: 'none', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', width: '100%', boxSizing: 'border-box' }} required />
        </div>
        <button type="submit" style={{ backgroundColor: '#333333', color: '#ffffff', padding: '10px 20px', borderRadius: '5px', border: 'none', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}>Belépés</button>
      </form>
    </Modal>
  );
}
export default LoginModal;