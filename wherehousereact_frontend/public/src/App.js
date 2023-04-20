import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Fooldal } from "./Fooldal";
import { Termekek } from "./Termekek";
import { Rolunk } from "./Rolunk";
import { Elerhetoseg } from "./Elerhetoseg";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import { RaktarSingle } from "./RaktarSingle";
import { Raktaraim } from "./Raktaraim";
import { Admin } from "./Admin";
import './App.css';

function App() {

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 0) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleBackToTopClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  }

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  }

  const handleRegisterModalOpen = () => {
    setIsRegisterModalOpen(true);
  }

  const handleRegisterModalClose = () => {
    setIsRegisterModalOpen(false);
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            <h1 className="m-0 text-uppercase text-warning fw-bold">
              <i className="text-secondary me-2"></i>Wherehouse
            </h1>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                  exact
                >
                  Főoldal
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/termekek"
                  className="nav-link"
                  activeClassName="active"
                >
                  Termékek
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/rolunk"
                  className="nav-link"
                  activeClassName="active"
                >
                  Rólunk
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/elerhetoseg"
                  className="nav-link"
                  activeClassName="active"
                >
                  Elérhetőség
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user && user.nev ? <><i className="bi bi-person-circle"></i> {user.nev}</> : <i className="bi bi-person-circle"></i>}
                </a>
                <ul className="dropdown-menu dropdown-menu-end login-menu" aria-labelledby="navbarDropdown">
                  {user ? (
                    <>
                      {user.nev === "admin" && (
                        <li>
                          <NavLink to="/admin" className="dropdown-item">Admin</NavLink>
                        </li>
                      )}
                      {user.nev !== "admin" && (
                        <li>
                          <NavLink to="/raktaraim" className="dropdown-item">Raktáraim</NavLink>
                        </li>
                      )}
                      <li>
                        <button className='dropdown-item' onClick={handleLogout}>Kijelentkezés</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <button className='dropdown-item' onClick={handleLoginModalOpen}>Bejelentkezés</button>
                        <LoginModal isOpen={isLoginModalOpen} onClose={handleLoginModalClose} />
                      </li>
                      <li>
                        <button className='dropdown-item' onClick={handleRegisterModalOpen}>Regisztráció</button>
                        <RegisterModal isOpen={isRegisterModalOpen} onClose={handleRegisterModalClose} />
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Fooldal />} />
        <Route path="/termekek" element={<Termekek />} />
        <Route path="/rolunk" element={<Rolunk />} />
        <Route path="/elerhetoseg" element={<Elerhetoseg />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/raktar/:raktarId" element={<RaktarSingle />} />
        <Route path="/raktaraim" element={<Raktaraim />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <footer>
        <div className="container-fluid bg-dark text-light px-4 py-4">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-9 col-md-6">
                <h5 className="text-white mb-3" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Kapcsolat</h5>
                <div className="mb-2"><i className="bi bi-pin-map-fill text-primary me-2"></i><span style={{ fontSize: '0.9rem' }}>3529 Miskolc, Valami utca 68</span></div>
                <div className="mb-2"><i className="bi bi-envelope-at-fill text-primary me-2"></i><span style={{ fontSize: '0.9rem' }}>info@example.com</span></div>
                <div className="mb-3"><i className="bi bi-telephone-fill text-primary me-2"></i><span style={{ fontSize: '0.9rem' }}>+36 33 3333</span></div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex flex-column justify-content-center align-items-center">
                <h5 className="text-white mb-3" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Kövess minket</h5>
                <div className="d-flex">
                  <a href="https://www.linkedin.com/" target='blank' className="bi bi-linkedin me-3" style={{ fontSize: '1.2rem' }}></a>
                  <a href="https://www.google.com/business/" target='blank' className="bi bi-google me-3" style={{ fontSize: '1.2rem' }}></a>
                  <a href="https://www.facebook.com/" target='blank' className="bi bi-facebook" style={{ fontSize: '1.2rem' }}></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid bg-warning text-dark py-4">
          <div class="container">
            <div class="row g-0">
              <div class="col-md-6 text-center text-md-start">
                <p class="mb-md-0 font-weight-bold">Copyright &copy;
                  <a class="text-dark fw-bold" href="#">Wherehouse</a>.
                  Minden jog fenntartva.
                </p>
              </div>
              <div class="col-md-6 text-center text-md-end">
                <p class="mb-0 font-weight-bold">Készítette:
                  <a class="text-dark fw-bold" href="">Wherehouse</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {showBackToTop && (
        <button
          className="btn btn-danger back-to-top bi bi-chevron-double-up"
          onClick={handleBackToTopClick} title='Ugrás az oldal tetejére'
        >
        </button>
      )}
    </Router>
  );
}
export default App;
