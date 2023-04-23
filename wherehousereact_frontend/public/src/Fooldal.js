import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Fooldal() {

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
        <div style={{ backgroundColor: '#6c757d', minHeight: '100vh' }}>
            <div className="container-fluid bg-warning bg-hero" style={{ marginBottom: '90px' }}>
                <div className="container py-5">
                    <div className="row justify-content-start">
                        <div className="col-lg-8 text-center text-lg-start">
                            <h1 className="col-lg-8 display-2 text-dark" style={{ fontWeight: 'bold' }}>Köszöntünk a Wherehouse oldalán!</h1>
                            <p className="col-lg-8 fs-4 text-dark mb-4">Raktárainkkal a lehetőségek határtalanok - növeld vállalkozásod sikereit velünk!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-secondary">
                <div className="container">
                    <div className="row gx-0 mb-3 mb-lg-0">
                        <div className="col-lg-6 my-lg-5 py-lg-5">
                            <div className="about-start bg-primary p-5">
                                <h1 className="display-5 mb-4" style={{ fontWeight: 'bold' }}>Szolgáltatásaink</h1>
                                <p><strong>Küldetésünk, hogy online felületünkön
                                    olyan raktárakat kínáljunk, amelyek segítenek Neked vállalkozásod növekedésében, céljaid elérésében!</strong></p>
                                <div className="d-flex justify-content-center">
                                    <Link to={`/termekek`} style={{ fontWeight: 'bold' }} className="btn btn-primary rounded-pill py-md-3 px-md-5 mt-4">
                                        Raktáraink
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6" style={{ minHeight: '400px' }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100" src={require('./img/about-1.webp')} style={{ objectFit: 'cover' }} alt="About 1" />
                            </div>
                        </div>
                    </div>
                    <div className="row gx-0">
                        <div className="col-lg-6" style={{ minHeight: '400px' }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100" src={require('./img/about-2.webp')} style={{ objectFit: 'cover' }} alt="About 2" />
                            </div>
                        </div>
                        <div className="col-lg-6 my-lg-5 py-lg-5">
                            <div className="about-end bg-primary p-5">
                                <h1 className="display-5 mb-4" style={{ fontWeight: 'bold' }}>Miért válassz minket?</h1>
                                <p><strong>Szenvedélyünk, hogy ügyfeleink terveit megkönnyítsük, és üzleti céljaikat elérjük azáltal, hogy magas szintű szolgáltatást nyújtunk, amelyre mindig lehet számítani.</strong>
                                </p>
                                <div className="d-flex justify-content-center">
                                    <Link to={`/elerhetoseg`} style={{ fontWeight: 'bold' }} className="btn btn-primary rounded-pill py-md-3 px-md-5 mt-4">
                                        Kapcsolat
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                        <h1 className="display-5 text-white" style={{ fontWeight: 'bold' }}>Kiemelt ajánlataink</h1>
                        <hr className="w-25 mx-auto text-primary" style={{ opacity: 1 }} />
                    </div>
                    <div className="row gy-4 gx-3">
                        {raktarak.slice(0, 3).map((raktar) => (
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
                                    <img alt={raktar.kepurl}
                                        className="img-fluid"
                                        style={{ maxHeight: 150, borderRadius: '5px', objectFit: 'cover' }}
                                        src={raktar.kepurl ? raktar.kepurl :
                                            "https://via.placeholder.com/400x800"} />
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

            <div className="container-fluid bg-warning bg-quote" style={{ margin: "90px 0" }}>
                <div className="container py-5">
                    <div className="row g-0 justify-content-start">
                        <div className="col-lg-6">
                            <div className="bg-white text-center p-5">
                                <h1 className="mb-4" style={{ fontWeight: 'bold' }}>Üzleti megkeresés</h1>
                                <p className="fs-4 fw-normal">Számunkra fontos a tehetséges és motivált ügyfelek megtalálása, akik elkötelezettek a minőség mellett, szakértői tudással rendelkeznek, és motiváltak az innovációra, illetve segítenek abban, hogy üzleti céljainkat elérjük.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-warning bg-call-to-action" style={{ margin: "90px 0" }}>
                <div className="container py-5">
                    <div className="row g-0 justify-content-end">
                        <div className="col-lg-6">
                            <div className="bg-white text-center p-5">
                                <h1 className="mb-4" style={{ fontWeight: 'bold' }}>Kiadnád a raktárad?</h1>
                                <p className="fs-4 fw-normal">Ha saját raktárad van, amelyet szívesen kiadnál, ne habozz tovább! Cégünk szívesen megvizsgálja az ajánlatot, és ha a feltételek megfelelnek, akkor felvásároljuk! Vedd fel velünk a kapcsolatot telefonon vagy e-mailben, akár személyesen is.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
export default Fooldal;