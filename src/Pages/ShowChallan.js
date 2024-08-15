import React, { useState,useEffect } from "react";
import { Table } from "react-bootstrap";
import { useStore } from "../context/GlobalState";

function ShowChallan() {
  const [{  allcnics,contract }] = useStore();
  const [alldata, setalldata] = useState([]);
  const [_cnic, setcnic] = useState("");
  const [getView, setView] = React.useState(0);

  console.log(allcnics);

  useEffect(()=>{
    if(allcnics != null){
      allcnics.map(async(obj) => {
        for(var i=0; i<3; i++){
            let data = await contract.methods.TrafficChallanData(obj,i).call();
            setalldata(alldata => [...alldata, data]);
        }
       }) 
    }
  },[allcnics])


  const changeHandle1 = (e) => {
    e.preventDefault();
    setView(1);
  };

  const changeHandle2 = (e) => {
    e.preventDefault();
    setView(2);
  };
  console.log(getView);
  const logOut = () => {
    localStorage.setItem("traffic", "false");
    window.location.href = "/landing";
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <h2>Challan</h2>
          <div>
            <button className="btn btn-info" onClick={logOut}>
            LOGOUT
            </button>
            <button
            className="btn btn-info"
            onClick={() => {
              window.location.href = "/challan";
            }}
          >
            Add Challan
          </button>
        </div>
        </div>
        <div className="row justify-content-around mt-5">
          <div className="col-md-6 col-12">
            <div className="p-5 bg-white rounded shadow text-center m-3 mb-4 w-md-50">
              <h2 className="mb-4 text-dark">Paid Challan</h2>
              <button
                className="btn-lg btn btn-primary text-uppercase"
                onClick={changeHandle1}
              >
                Show All
              </button>
            </div>
          </div>

          <div className="col-md-6 col-12">
            <div className="p-5 bg-white rounded shadow text-center m-3 mb-4 w-md-50">
              <h2 className="mb-4 text-dark">Not Paid Challan</h2>
              <button
                className="btn-lg btn btn-primary text-uppercase"
                onClick={changeHandle2}
              >
                Show All
              </button>
            </div>
          </div>
        </div>
      </div>

      {getView === 1 ? (
        <div className="container">
          <br />
          <div className="row">
            <div className="col-12">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your CNIC"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setcnic(e.target.value);
                  }}
                  required
                />
                &nbsp;
              </div>
            </div>
          </div>
          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th scope="col">CNIC</th>
                <th scope="col">Vehicle #</th>
                <th scope="col">Challan Type</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {_cnic == ""
                ? alldata.map((obj) => {
                    console.log(obj)
                    if(obj.isPaid == true){
                      var date2 = new Date(obj.date * 1000);
                      var day = date2.getDate();
                      var month = date2.getMonth() + 1;
                      var year = date2.getFullYear();
                      return (
                        <tr>
                          <td>{obj.cnic}</td>
                          <td>{obj.vehicle_no}</td>
                          <td>{obj.challan_type}</td>
                          <td>{obj.amount}</td>
                          <td>{day + "/" + month + "/" + year}</td>
                        </tr>
                      );
                    }
                  })
                
                : alldata.map((obj) => {
                     console.log(obj)
                      if (obj.cnic == _cnic && obj.isPaid == true) {
                        var date2 = new Date(obj.date * 1000);
                        var day = date2.getDate();
                        var month = date2.getMonth() + 1;
                        var year = date2.getFullYear();
                        return (
                          <tr>
                            <td>{obj.cnic}</td>
                            <td>{obj.vehicle_no}</td>
                            <td>{obj.challan_type}</td>
                            <td>{obj.amount}</td>
                            <td>{day + "/" + month + "/" + year}</td>
                          </tr>
                        );
                      }
                   })
               }
            </tbody>
          </Table>
        </div>
      ) : null}

      {getView === 2 ? (
        <div className="container">
          <br />
          <div className="row">
            <div className="col-12">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your CNIC"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setcnic(e.target.value);
                  }}
                  required
                />
                &nbsp;
              </div>
            </div>
          </div>
          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th scope="col">CNIC</th>
                <th scope="col">Vehicle #</th>
                <th scope="col">Challan Type</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {_cnic == ""
                ? alldata.map((obj) => {
                    console.log(obj)
                    if(obj.isPaid == false){
                      var date2 = new Date(obj.date * 1000);
                      var day = date2.getDate();
                      var month = date2.getMonth() + 1;
                      var year = date2.getFullYear();

                      return (
                        <tr>
                          <td>{obj.cnic}</td>
                          <td>{obj.vehicle_no}</td>
                          <td>{obj.challan_type}</td>
                          <td>{obj.amount}</td>
                          <td>{day + "/" + month + "/" + year}</td>
                        </tr>
                      );
                    }
                    })
                : alldata.map((obj) => {
                      console.log(obj)  
                      if (obj.cnic == _cnic && obj.isPaid == false) {
                        var date2 = new Date(obj.date * 1000);
                        var day = date2.getDate();
                        var month = date2.getMonth() + 1;
                        var year = date2.getFullYear();

                        return (
                          <tr>
                            <td>{obj.cnic}</td>
                            <td>{obj.vehicle_no}</td>
                            <td>{obj.challan_type}</td>
                            <td>{obj.amount}</td>
                            <td>{day + "/" + month + "/" + year}</td>
                          </tr>
                        );
                      }
                    })
               }
            </tbody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
export default ShowChallan;
