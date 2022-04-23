import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4 pb-0">
        <section className="mb-5">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://github.com/anton156/PraksaProjektBackend"
            role="button"
          >
            Git Hub
          </a>
        </section>
      </div>

      <div className="text-center p-3">© 2022 Copyright: FSRE Team</div>
    </footer>
  );
};
