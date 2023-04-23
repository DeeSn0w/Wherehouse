import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export function RaktarSingle(props) {
    const params = useParams();
    const id = params.raktarId;
    const navigate = useNavigate();
    const [raktar, setRaktar] = useState([]);
    const [elvittek, setElvittek] = useState(false);
    const [isPending, setPending] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await fetch(`https://localhost:7240/Raktar/id?id=${id}`)
                const raktar = await res.json();
                setRaktar(raktar);
                setElvittek(raktar.elvittek)
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setPending(false);
            }
        })
            ();
    }, [id]);

    return (
        <div className="container-fluid py-5 bg-secondary" style={{ minHeight: '100vh' }}>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm">
                            <img
                                alt={raktar.tipus}
                                className="card-img-top"
                                style={{ maxHeight: "500px" }}
                                src={raktar.kepurl ? raktar.kepurl : "https://via.placeholder.com/400x800"}
                            />
                            <div className="card-body">
                                <h1 className="card-title text-center">{raktar.tipus}</h1>
                                <h5 className="card-subtitle mb-3 text-muted text-center">{raktar.cím}</h5>
                                <hr />
                                <div className="row justify-content-center align-items-center mb-3">
                                    <div className="col-md-6">
                                        <h5 className="card-title text-center">Méret:</h5>
                                        <p className="text-center">{raktar.meret} m<sup>2</sup></p>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="card-title text-center">Bérleti díj:</h5>
                                        <p className="text-center">{raktar.ar} Ft/hó</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-center">
                                    <Link to="/termekek" className="btn btn-link">
                                        <button className="btn btn-primary bi bi-arrow-left">&nbsp;Vissza</button>
                                    </Link>

                                    <button
                                        className="btn btn-success bi bi-check"
                                        onClick={() => {
                                            if (user) {
                                                fetch(`https://localhost:7240/Birtokolt?raktarId=${raktar.id}&tulajId=${user.id}`, {
                                                    method: "POST",
                                                })
                                                    .then((response) => {
                                                        console.log("Sikeres foglalás!");
                                                        window.alert("Bérlésedet rögzítettük, hamarosan megkeresünk!");
                                                        fetch(`https://localhost:7240/Raktar`, {
                                                            method: "PUT",
                                                            body: JSON.stringify({
                                                                id: raktar.id,
                                                                cím: raktar.cím,
                                                                tipus: raktar.tipus,
                                                                ar: raktar.ar,
                                                                meret: raktar.meret,
                                                                kepurl: raktar.kepurl,
                                                                elvittek: true
                                                            }),
                                                            headers: {
                                                                "Content-Type": "application/json"
                                                            }
                                                        })
                                                            .then(() => {
                                                                setElvittek(elvittek)
                                                                console.log("raktar.elvittek sikeresen frissítve");
                                                                navigate("/termekek");
                                                            })
                                                            .catch((error) => {
                                                                console.error("Hiba raktar.elvittek frissítésekor:", error);
                                                            });
                                                    })
                                                    .catch((error) => {
                                                        console.error("Hiba a foglalással:", error);
                                                    });
                                            } else {
                                                console.error("Nincs ilyen felhasználó a gyorsítótárban!");
                                            }
                                        }}

                                        disabled={!user}
                                    >
                                        Kibérlem
                                    </button>
                                </div>
                                <br></br>
                                {!user && (
                                    <p className='text-center'>Kérjük lépj be, a bérléshez!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
export default RaktarSingle;