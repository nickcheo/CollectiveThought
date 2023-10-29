// components/Layout.tsx
import React from 'react';
import '/src/app/globals.css';
import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <div className="p-3 mb-4 bg-black position-relative text-center">
      <div className="container position-absolute top-5 start-50 translate-middle-x">
        <Link href="/" passHref>
          <h1 className="display-2 text-bold cursor-pointer" style={{ fontSize: '24px' }}>
            collective thought
          </h1>
        </Link>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link active sidebar-link">HOME</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/aboutPage">
                  <a className="nav-link sidebar-link">ABOUT</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/similarResponses">
                  <a className="nav-link sidebar-link">EXPERIENCES</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">{children}</main>
      </div>
    </div>
  </div>
);

export default Layout;
