import React, { } from 'react';

export function Elerhetoseg() {
  return (
    <div className="container-fluid py-5 bg-secondary" style={{ minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
          <h1 className="display-5 text-white" style={{ fontWeight: 'bold' }}>Forduljon hozzánk bizalommal!</h1>
          <hr className="w-25 mx-auto text-primary" style={{ opacity: 1 }} />
        </div>
        <div className="row g-3 mb-5">
          <div className="col-lg-4 col-md-6 pt-5">
            <div className="contact-item d-flex flex-column align-items-center justify-content-center text-center pb-5">
              <div className="contact-icon p-3 bg-warning">
                <div><i className="bi bi-pin-map-fill"></i></div>
              </div>
              <h4 className="mt-5 text-white fw-bold">3529 Miskolc, Valami utca 68</h4>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 pt-5">
            <div className="contact-item d-flex flex-column align-items-center justify-content-center text-center pb-5">
              <div className="contact-icon p-3 bg-warning">
                <div><i className="bi bi-telephone-fill"></i></div>
              </div>
              <h4 className="mt-5 text-white fw-bold">+36 33 3333</h4>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 pt-5">
            <div className="contact-item d-flex flex-column align-items-center justify-content-center text-center pb-5">
              <div className="contact-icon p-3 bg-warning">
                <div><i className="bi bi-envelope-at-fill"></i></div>
              </div>
              <h4 className="mt-5 text-white fw-bold">info@example.com</h4>
            </div>
          </div>
        </div>
        <div className="iframeproba">
          <iframe className="responsive-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d170565.92775479722!2d20.6757494!3d48.08915495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47409e878d72ebe7%3A0x400c4290c1e11b0!2sMiskolc!5e0!3m2!1shu!2shu!4v1678691216066!5m2!1shu!2shuY"></iframe>
        </div>
      </div>
    </div>
  );
}
export default Elerhetoseg;