import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingHome = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <div className="main-wrapper main-wrapper-1 const-landing">
      {/* <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Blockchain
          </a>
        </div>
      </nav> */}
      <div className="container">
        <section className="">
          <div className="">
            <div className="">
              <h1 className="const-choose mt-5">Choose Authentication</h1>
              <br />
              <br />
            </div>
            <div className="section-body">
              <div className="row">
                <div className="col-12 col-md-3 col-lg-3">
                  <div className="pricing const-citizen">
                    {/* <div className="pricing-title">Authentication</div> */}
                    <div className="text-center card-height ">
                      <div className="pricing-price">
                        <div>Union</div>
                      </div>
                    </div>
                    <div className="pricing-cta mt-0">
                      <a href="/show-union">
                        Union<i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-3 col-lg-3">
                  <div className="pricing const-education pricing-highlight">
                    {/* <div className="pricing-title">Authentication</div> */}
                    <div className="text-center card-height ">
                      <div className="pricing-price">
                        <div>Education</div>
                      </div>
                    </div>
                    <div className="pricing-cta mt-0">
                      <a href="/show-education">
                        Education<i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-3 col-lg-3">
                  <div className="pricing const-weapon">
                    {/* <div className="pricing-title">Authentication</div> */}
                    <div className="text-center card-height ">
                      <div className="pricing-price">
                        <div>Weapon</div>
                      </div>
                    </div>
                    <div className="pricing-cta mt-0">
                      <a href="/show-weapon">
                        Weapon<i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-3 col-lg-3">
                  <div className="pricing const-citizen pricing-highlight">
                    {/* <div className="pricing-title">Authentication</div> */}
                    <div className="text-center card-height ">
                      <div className="pricing-price">
                        <div>Criminal</div>
                      </div>
                    </div>
                    <div className="pricing-cta mt-0">
                      <a href="/show-criminal">
                        Criminal<i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-3 col-lg-3">
                  <div className="pricing const-traffic">
                    {/* <div className="pricing-title">Authentication</div> */}
                    <div className="text-center card-height ">
                      <div className="pricing-price">
                        <div>Traffic</div>
                      </div>
                    </div>
                    <div className="pricing-cta mt-0">
                      <a href="/show-challan">
                        Traffic<i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div></div>
                {/* <div className="col-12 col-md-3 col-lg-3">
                  <div className="pricing const-citizen pricing-highlight">
                   
                    <div className="text-center card-height ">
                      <div className="pricing-price">
                        <div>Marriage</div>
                      </div>
                    </div>
                    <div className="pricing-cta mt-0">
                      <a href="/marriage">
                        Marriage<i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div> */}

                <div className="col-12 col-md-3 col-lg-3">
                  <div className="pricing const-citizen">
                    {/* <div className="pricing-title">Authentication</div> */}
                    <div className="text-center card-height ">
                      <div className="pricing-price">
                        <div>Citizen</div>
                      </div>
                    </div>
                    <div className="pricing-cta mt-0">
                      <a href="/citizen">
                        Citizen<i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingHome;
