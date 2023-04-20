import React, { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';

export function Termekek() {
  const [raktarak, setRaktar] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setFetchPending(true);
    fetch("https://localhost:7240/Raktar")
      .then((res) => res.json())
      .then((raktarak) => setRaktar(raktarak))
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);

  return (
    <div className="container-fluid py-5 bg-secondary" style={{ minHeight: '100vh' }}>
      <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                <h1 className="display-5 text-white" style={{ fontWeight: 'bold' }}>Termékek</h1>
                <hr className="w-25 mx-auto text-primary" style={{ opacity: 1 }} />
            </div>
      <div className="container">
        <div className="row gy-4 gx-3">
          {raktarak.map((raktar) => (
            <div className="col-lg-4 col-md-6 pt-5" key={raktar.id}>
              <div className="service-item d-flex flex-column align-items-center justify-content-center text-center p-5 pt-0">
                {raktar.elvittek ? (
                  <div className="service-icon p-3 bg-warning">
                    <div className="bg-danger"><i className="bi bi-x-lg"></i></div>
                  </div>
                ) : (
                  <div className="service-icon p-3 bg-warning">
                    <div className="bg-success"><i className="bi bi-bootstrap-reboot"></i></div>
                  </div>
                )}
                <h3 className="mt-5 text-white" style={{ fontWeight: 'bold' }}>{raktar.tipus}</h3>
                <h5 className="text-white" style={{ fontWeight: 'bold' }}>{raktar.cím}</h5>
                <img
                  alt={raktar.kepurl}
                  className="img-fluid"
                  style={{ maxHeight: 150, borderRadius: '5px', objectFit: 'cover' }}
                  src={raktar.kepurl ? raktar.kepurl : "https://via.placeholder.com/400x800"}
                />
                {user && user.nev === 'admin' ? (
                  <></>
                ) : (
                  <>
                    {raktar.elvittek ? (
                      <div>
                        <br />
                        <button className="btn btn-secondary" disabled>
                          A raktár jelenleg nem elérhető!
                        </button>
                      </div>
                    ) : (
                      <Link to={`/raktar/${raktar.id}`} style={{ marginTop: '30px' }} className="btn btn-primary">
                        Információ <i className="bi bi-arrow-right ms-1"></i>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Termekek;
