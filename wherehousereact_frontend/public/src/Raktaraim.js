import React, { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';

export function Raktaraim() {
  const [raktarak, setRaktar] = useState([]);
  const [birtokoltak, setBirtokolt] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setFetchPending(true);
    fetch("https://localhost:7240/Birtokolt")
      .then((res) => res.json())
      .then((birtokoltak) => setBirtokolt(birtokoltak))
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);

  useEffect(() => {
    setFetchPending(true);
    Promise.all([
      fetch("https://localhost:7240/Raktar"),
      fetch("https://localhost:7240/Birtokolt")
    ])
      .then(([raktarRes, birtokoltRes]) => Promise.all([raktarRes.json(), birtokoltRes.json()]))
      .then(([raktarak, birtokoltak]) => {
        const filteredRaktar = raktarak.filter((raktar) => {
          return birtokoltak.some((birtokolt) => {
            return (
              birtokolt.raktarid === raktar.id &&
              birtokolt.tulajid === user.id
            );
          });
        });
        setRaktar(filteredRaktar);
      })
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, [user.id]);

  function Lemondas(raktarid) {
    const promises = birtokoltak
      .filter((birtokolt) => birtokolt.raktarid === raktarid)
      .map((birtokolt) => {
        // Find the raktar object that matches raktarid
        const raktarToUpdate = raktarak.find((raktar) => raktar.id === raktarid);
        if (!raktarToUpdate) {
          throw new Error("Related raktar row not found");
        }
        // Update the related raktar row
        const updatePromise = fetch(`https://localhost:7240/Raktar?id=${raktarid}`, {
          method: "PUT",
          body: JSON.stringify({
            ...raktarToUpdate,
            elvittek: false,
          }),
          headers: { "Content-Type": "application/json" },
        }).then((response) => response.json());

        // Delete the related birtokolt row after updating the raktar row
        const deletePromise = fetch(`https://localhost:7240/Birtokolt?id=${birtokolt.id}`, {
          method: "DELETE",
        }).then(() => console.log("Deleted related row from Birtokolt table"))
          .finally(() => {
            window.location.reload();
          });
        return Promise.all([updatePromise, deletePromise]).then(() => console.log("Updated and deleted related rows"));
      });
    return Promise.all(promises).then(() => {
      console.log("All related rows updated and deleted");
    });
  }

  return (
    <div className="container-fluid py-5 bg-secondary" style={{ minHeight: '100vh' }}>
      <div className="container">
        {raktarak.length === 0 ? (
          <h1 className="display-5 text-white" style={{ fontWeight: 'bold', textAlign: 'center' }}>Jelenleg nincs raktárad!</h1>
        ) : (
          <div className="row gy-4 gx-3">
            {raktarak.map((raktar) => (
              <div className="col-lg-4 col-md-6 pt-5" key={raktar.id}>
                <div className="service-item d-flex flex-column align-items-center justify-content-center text-center p-5 pt-0">
                  <div className="service-icon p-3 bg-warning">
                    <div className="bg-success"><i className="bi bi-check-lg"></i></div>
                  </div>
                  <h3 className="mt-5 text-white" style={{ fontWeight: 'bold' }}>{raktar.tipus}</h3>
                  <h5 className="text-white" style={{ fontWeight: 'bold' }}>{raktar.cím}</h5>
                  <img
                    alt={raktar.kepurl}
                    className="img-fluid"
                    style={{ maxHeight: 150, borderRadius: '5px', objectFit: 'cover' }}
                    src={raktar.kepurl ? raktar.kepurl : "https://via.placeholder.com/400x800"}
                  />
                  <hr />
                  <button onClick={() => Lemondas(raktar.id)}>Lemondás</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Raktaraim;
