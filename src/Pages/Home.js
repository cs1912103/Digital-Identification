import React, { useEffect } from "react";
import digit_card from "../images/digital_card.png";
import "./style2.css";

function Home() {
  return (
    <div className="body">
      <section className="header-navbar">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <a className="navbar-brand" href="#">
            Digital Identity
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link" href="#">
                Home<span className="sr-only">(current)</span>
              </a>
              <a className="nav-item nav-link" href="/landing">
                Departments
              </a>
              <a className="nav-item nav-link" href="#">
                About Us
              </a>
              <a className="nav-item nav-link" href="#">
                FAQs
              </a>
            </div>
          </div>
        </nav>
      </section>

      <section className="dot-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </section>

      <section className="body-content">
        <div id="title">
          <span>WELCOME TO DIGITAL IDENTITY SYSTEM</span>
        </div>

        <section className="sec-1">
          <div className="row">
            <div className="col-sm">
              <p className="intro-text">
                This system record all the data about the person’s birth until
                death with only one identity. The environment of the system
                based on blockchain, which is decentralized and distributed,
                which will increase the security and data protection of the
                system, and all the data will be store on different nodes
                (distributed) in the form of hashes.
              </p>
            </div>
            <div className="col-sm">
              <img src={digit_card} width="80%"></img>
            </div>
          </div>
        </section>

        <section className="sec-2">
          <div className="row justify-content-center">
            <div id="title2">
              <span>DEPARTMENTS</span>
            </div>
          </div>
          <div className="row depart-sec">
            <div className="col-sm departments">
              <span className="dept-title">
                <a href="/show-union">Union Council</a>
              </span>
              <span className="dept-detail">
                Union Council Department is responsible for managing data of
                birth child or death in their union.
              </span>
            </div>
            <div className="col-sm departments">
              <span className="dept-title">
                <a href="/challan">Traffic Challan</a>
              </span>
              <span className="dept-detail">
                Union Council Department is responsible for managing data of
                birth child or death in their union.
              </span>
            </div>
          </div>
          <div className="row depart-sec">
            <div className="col-sm departments">
              <span className="dept-title">
                <a href="show-weapon">Weapon</a>
              </span>
              <span className="dept-detail">
                Union Council Department is responsible for managing data of
                birth child or death in their union.
              </span>
            </div>
            <div className="col-sm departments">
              <span className="dept-title">
                <a href="/education">Education</a>
              </span>
              <span className="dept-detail">
                Union Council Department is responsible for managing data of
                birth child or death in their union.
              </span>
            </div>
            <div className="col-sm departments">
              <span className="dept-title">
                <a href="/criminal">Criminal</a>
              </span>
              <span className="dept-detail">
                Union Council Department is responsible for managing data of
                birth child or death in their union.
              </span>
            </div>
          </div>
          <div className="row depart-sec">
            <div className="col-sm-4 departments">
              <span className="dept-title">
                <a href="/citizen">View Citizen</a>
              </span>
              <span className="dept-detail">
                Union Council Department is responsible for managing data of
                birth child or death in their union.
              </span>
            </div>
            {/* <div className="col-sm departments">
                  
                </div>
                <div className="col-sm departments">
                   
                </div> */}
          </div>
        </section>

        <section className="sec-3">
          <div className="row justify-content-center">
            <div id="title">
              <span>SYSTEM KEY FEATURES</span>
            </div>
          </div>
          <div className="row justify-content-center">
            <ul className="feature-list">
              <li className="feature">
                Will Connect All the Government sectors on single platform.
              </li>
              <li className="feature">Tracking of it’s citizens</li>
              <li className="feature">Security of Citizen’s data</li>
              <li className="feature">De-Centralized Data Storage</li>
              <li className="feature">No Ownership of data</li>
              <li className="feature">Digital Communication</li>
              <li className="feature">Prototype for Government</li>
              <li className="feature">All Details can be seen on one click </li>
              <li className="feature">Portal For Citizens</li>
            </ul>
          </div>
        </section>

        <section className="sec-4">
          <div className="row justify-content-center">
            <div id="title">
              <span>ABOUT US</span>
            </div>
          </div>
          <div className="row">
            <ul className="feature-list">
              <li className="feature">
                Will Connect All the Government sectors on single platform.
              </li>
              <li className="feature">Tracking of it’s citizens</li>
              <li className="feature">Security of Citizen’s data</li>
              <li className="feature">De-Centralized Data Storage</li>
              <li className="feature">No Ownership of data</li>
              <li className="feature">Digital Communication</li>
              <li className="feature">Prototype for Government</li>
              <li className="feature">All Details can be seen on one click </li>
              <li className="feature">Portal For Citizens</li>
            </ul>
          </div>
        </section>

        <section className="sec-5">
          <div className="row justify-content-center">
            <div id="title">
              <span>FAQs</span>
            </div>
          </div>
          <div className="row">
            <ul className="feature-list">
              <li className="feature">
                Will Connect All the Government sectors on single platform.
              </li>
              <li className="feature">Tracking of it’s citizens</li>
              <li className="feature">Security of Citizen’s data</li>
              <li className="feature">De-Centralized Data Storage</li>
              <li className="feature">No Ownership of data</li>
              <li className="feature">Digital Communication</li>
              <li className="feature">Prototype for Government</li>
              <li className="feature">All Details can be seen on one click </li>
              <li className="feature">Portal For Citizens</li>
            </ul>
          </div>
        </section>
      </section>

      <style>
        {`
            
            .row{
                margin-left: 0px !important;
                margin-right: 0px !important;
            }
            .navbar-nav{
                width: 100%;
            }
            
            `}
      </style>
    </div>
  );
}
export default Home;
