import React, { useState, useEffect, } from 'react';

const api_url = "https://localhost:7240/Raktar";

export function Admin() {
    const [raktarak, setRaktar] = useState([]);
    const [alkalmazottak, setAlkalmazott] = useState([]);
    const [tulajdonosok, setTulajdonos] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

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
    useEffect(() => {
        setFetchPending(true);
        fetch("https://localhost:7240/Tulajdonos")
            .then((res) => res.json())
            .then((tulajdonosok) => setTulajdonos(tulajdonosok))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);

    const user = JSON.parse(localStorage.getItem('user'));

    //addRaktar

    function addRaktar(id, cím, tipus, ar, meret, kepurl, elvittek) {
        const newCim = prompt("Add meg a raktár címét:", cím);
        const newTipus = prompt("Add meg a raktár típusát:", tipus);
        const newAr = prompt("Adja meg az új árat:", ar);
        const newMeret = prompt("Adja meg az új méretet:", meret);
        const newKepurl = prompt("Adja meg az új kép URL-t:", kepurl);

        const data = {
            id: id,
            cím: newCim,
            tipus: newTipus,
            ar: newAr,
            meret: newMeret,
            kepurl: newKepurl,
            elvittek: false
        };

        console.log(data);

        fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error))
            .finally(() => {
                window.location.reload();
            });
    }

    //deleteRaktar

    function deleteRaktar(id) {
        console.log(id);
        fetch('https://localhost:7240/Birtokolt/raktarid?raktarId=' + id, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    console.log('Deleted ' + data.length + ' related rows from Birtokolt table');
                    return Promise.all(data.map(birtokolt => {
                        return fetch(api_url + '/' + birtokolt.id, { method: 'DELETE' });
                    }));
                }
            })
            .catch(error => console.error(error))
            .finally(() => {
                fetch(api_url + '/' + id, { method: 'DELETE' })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        setRaktar(raktarak.filter(raktar => raktar.id !== id));
                    })
                    .catch(error => console.error(error))
                    .finally(() => {
                        window.location.reload();
                    });
            });
    }

    //updateRaktar

    function updateRaktar(id, cím, tipus, ar, meret, kepurl, elvittek) {
        const newCim = prompt("Add meg a raktár címét:", cím);
        const newTipus = prompt("Add meg a raktár típusát:", tipus);
        const newAr = prompt("Adja meg az új árat:", ar);
        const newMeret = prompt("Adja meg az új méretet:", meret);
        const newKepurl = prompt("Adja meg az új kép URL-t:", kepurl);
        const newElvittekInput = prompt("Adja meg, hogy birtokolt-e (true/false):", elvittek);
        const newElvittek = newElvittekInput === "true" ? true : false;

        const data = {
            id: id,
            cím: newCim,
            tipus: newTipus,
            ar: newAr,
            meret: newMeret,
            kepurl: newKepurl,
            elvittek: newElvittek
        };

        console.log(data);

        fetch(api_url + '?id=' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error))
            .finally(() => {
                window.location.reload();
            });
    }
    //addAlkalmazott

    function addAlkalmazott(id, nev, pozicio, fizetes) {
        const newNev = prompt("Add meg az alkalmazott nevét:", nev);
        const newPozicio = prompt("Add meg az alkalmazott pozícióját:", pozicio);
        const newFizetes = prompt("Add meg az alkalmazott fizetését:", fizetes);

        const data = {
            id: id,
            nev: newNev,
            pozicio: newPozicio,
            fizetes: newFizetes
        };

        console.log(data);

        fetch('https://localhost:7240/Alkalmazott', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error))
            .finally(() => {
                window.location.reload();
            });
    }

    //deleteAlkalmazott

    function deleteAlkalmazott(id) {
        console.log(id);
        fetch('https://localhost:7240/Alkalmazott?id=' + id, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setRaktar(alkalmazottak.filter(alkalmazott => alkalmazott.id !== id));
            })
            .catch(error => console.error(error))
            .finally(() => {
                window.location.reload();
            });
    }

    //updateAlkalmazott

    function updateAlkalmazott(id, nev, pozicio, fizetes) {
        const newNev = prompt("Add meg az alkalmazott nevét:", nev);
        const newPozicio = prompt("Add meg az alkalmazott pozícióját:", pozicio);
        const newFizetes = prompt("Add meg az alkalmazott fizetését:", fizetes);

        const data = {
            id: id,
            nev: newNev,
            pozicio: newPozicio,
            fizetes: newFizetes
        };

        console.log(data);

        fetch('https://localhost:7240/Alkalmazott?id=' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error))
            .finally(() => {
                window.location.reload();
            });
    }

    //deleteTulajdonos

    function deleteTulajdonos(id) {
        console.log(id);
        fetch('https://localhost:7240/Birtokolt/tulajid?tulajId=' + id, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    console.log('Deleted ' + data.length + ' related rows from Birtokolt table');
                    return Promise.all(data.map(birtokolt => {
                        const raktarToUpdate = raktarak.find(raktar => raktar.id === birtokolt.raktarid);
                        if (!raktarToUpdate) {
                            throw new Error('Related raktar row not found');
                        }
                        return fetch('https://localhost:7240/Raktar?id=' + birtokolt.raktarid, {
                            method: 'PUT',
                            body: JSON.stringify({
                                id: raktarToUpdate.id,
                                cím: raktarToUpdate.cím,
                                tipus: raktarToUpdate.tipus,
                                ar: raktarToUpdate.ar,
                                meret: raktarToUpdate.meret,
                                kepurl: raktarToUpdate.kepurl,
                                elvittek: false
                            }),
                            headers: { 'Content-Type': 'application/json' }
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Updated related row from Raktar table');
                                return fetch('https://localhost:7240/Birtokolt/' + birtokolt.id, { method: 'DELETE' });
                            });
                    }));
                }
            })
            .catch(error => console.error(error))
            .finally(() => {
                fetch('https://localhost:7240/Tulajdonos?id=' + id, { method: 'DELETE' })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        setTulajdonos(tulajdonosok.filter(tulajdonos => tulajdonos.id !== id));
                    })
                    .catch(error => console.error(error))
                    .finally(() => {
                        window.location.reload();
                    });
            });
    }

    //updateTulajdonos

    function updateTulajdonos(id, nev, email, password) {
        const newNev = prompt("Add meg a tulajdonos felhasználónevét:", nev);
        const newEmail = prompt("Add meg a tulajdonos emailjét:", email);
        const newPassword = prompt("Add meg a tulajdonos jelszavát:", password);

        const data = {
            id: id,
            nev: newNev,
            email: newEmail,
            password: newPassword
        };

        console.log(data);

        fetch('https://localhost:7240/Tulajdonos?id=' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error))
            .finally(() => {
                window.location.reload();
            });
    }

    return (
        <div className="container-fluid py-5 bg-secondary" style={{ minHeight: '100vh' }}>
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                <h1 className="display-5 text-white" style={{ fontWeight: 'bold' }}>Raktárak módosítása</h1>
                <button onClick={() => addRaktar()}><i className="bi bi-plus"></i></button>
                <hr className="w-25 mx-auto text-primary" style={{ opacity: 1 }} />
            </div>

            <div className="container-fluid py-5 bg-secondary" style={{ marginBottom: '213px' }}>
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
                                    <img alt={raktar.kepurl}
                                        className="img-fluid"
                                        style={{ maxHeight: 150, borderRadius: '5px', objectFit: 'cover' }}
                                        src={raktar.kepurl ? raktar.kepurl :
                                            "https://via.placeholder.com/400x800"} />
                                    <div>
                                        <br />
                                        <button onClick={() => deleteRaktar(raktar.id)}><i className="bi bi-trash"></i></button> &nbsp;&nbsp;&nbsp;
                                        <button onClick={() => updateRaktar(raktar.id, raktar.cím, raktar.tipus, raktar.ar, raktar.meret, raktar.kepurl, raktar.elvittek)}><i className="bi bi-pencil"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                <h1 className="display-5 text-white" style={{ fontWeight: 'bold' }}>Munkatársak módosítása</h1>
                <button onClick={() => addAlkalmazott()}><i className="bi bi-plus"></i></button>
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
                                            <button onClick={() => deleteAlkalmazott(alkalmazott.id)}><i className="bi bi-trash"></i></button> &nbsp;&nbsp;&nbsp;
                                            <button onClick={() => updateAlkalmazott(alkalmazott.id, alkalmazott.nev, alkalmazott.pozicio, alkalmazott.fizetes)}><i className="bi bi-pencil"></i></button>
                                        </div>
                                        <div className="mt-auto mb-3">
                                            <h4 className="mb-1">{alkalmazott.nev}</h4>
                                            <span className="text-uppercase">{alkalmazott.pozicio}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
                <h1 className="display-5 text-white" style={{ fontWeight: 'bold' }}>Tulajdonosok módosítása</h1>
                <hr className="w-25 mx-auto text-primary" style={{ opacity: 1 }} />
            </div>
            <div className="container-fluid py-5 bg-secondary" style={{ marginBottom: '213px' }}>
                <div className="container">
                    <div className="row gy-4 gx-3">
                        {tulajdonosok.map((tulajdonos) => (
                            <div className="col-lg-4 col-md-6 pt-5" key={tulajdonos.id}>
                                <div className="service-item d-flex flex-column align-items-center justify-content-center text-center p-5 pt-0">
                                    <div className="service-icon p-3 bg-warning">
                                        <div className="bg-success"></div>
                                    </div>
                                    <h3 className="mt-5 text-white" style={{ fontWeight: 'bold' }}>{tulajdonos.nev}</h3>
                                    <h5 className="text-white" style={{ fontWeight: 'bold' }}>{tulajdonos.email}</h5>
                                    <div>{tulajdonos.nev !== 'admin' && (
                                        <>
                                            <br />
                                            <button onClick={() => deleteTulajdonos(tulajdonos.id)}><i className="bi bi-trash"></i></button> &nbsp;&nbsp;&nbsp;
                                            <button onClick={() => updateTulajdonos(tulajdonos.id, tulajdonos.nev, tulajdonos.email, tulajdonos.password)}><i className="bi bi-pencil"></i></button>
                                        </>
                                    )}
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
export default Admin;