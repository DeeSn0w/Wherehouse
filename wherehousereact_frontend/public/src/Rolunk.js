import React, { useState, useEffect } from 'react';

export function Rolunk() {
    const [alkalmazottak, setAlkalmazott] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        fetch("https://localhost:7240/Alkalmazott")
            .then((res) => res.json())
            .then((alkalmazottak) => setAlkalmazott(alkalmazottak))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);

    return (
        <div className="container-fluid py-5 bg-secondary" style={{ minHeight: '100vh' }}>
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                <h1 className="display-5 text-white" style={{ fontWeight: 'bold' }}>Munkatársaink</h1>
                <hr className="w-25 mx-auto text-primary" style={{ opacity: 1 }} />
            </div>
            <div className="container-fluid py-5 bg-secondary">
                <div className="container py-5">
                    <div className="row g-3">
                        {alkalmazottak.map((alkalmazott) => (
                            <div className="col-lg-4 col-md-6">
                                <div className="team-item">
                                    <img className="img-fluid w-100" src={require('./img/avatar-1.webp')} alt="" />
                                    <div className="team-text">
                                        <div className="team-social">
                                            <a className="bi bi-telephone-fill" href="tel:"></a>&nbsp;&nbsp;
                                            <a className="bi bi-linkedin" href="https://linkedin.com/" target='blank'></a>&nbsp;&nbsp;
                                            <a href="https://www.google.com/business/" className="bi bi-google" target='blank'></a>&nbsp;&nbsp;
                                            <a href="https://www.facebook.com/" className="bi bi-facebook" target='blank'></a>
                                        </div>
                                        <div className="mt-auto mb-3">
                                            <h4 className="mb-1 fw-bold">{alkalmazott.nev}</h4>
                                            <span className="text-uppercase">{alkalmazott.pozicio}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Rolunk;