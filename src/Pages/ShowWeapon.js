import { useState,useEffect } from "react";
import { useStore } from "../context/GlobalState";

function ShowWeapon() {
  const [{ allcnics,contract }] = useStore();
  const [alldata, setalldata] = useState([]);
  const [_cnic, setcnic] = useState("");
  
  console.log(allcnics);

  useEffect(()=>{
    if(allcnics != null){
      allcnics.map(async(obj) => {
            let data = await contract.methods.WeaponLisenceData(obj).call();
            if(data.cnic != ""){ 
             setalldata(alldata => [...alldata, data]);
            }  
       }) 
    }
  },[allcnics])

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2>Weapon</h2>
        <button
          className="btn btn-info"
          onClick={() => {
            window.location.href = "/weapon-Lisence";
          }}
        >
          Add Weapon
        </button>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <div className="input-group mb-3">
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">CNIC</th>
            <th scope="col">Weapon type</th>
            <th scope="col">Lisence #</th>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {_cnic == ""
            ? alldata.map((obj) => {
                  var date2 = new Date(obj.date * 1000);
                  var day = date2.getDate();
                  var month = date2.getMonth() + 1;
                  var year = date2.getFullYear();
                  console.log(obj)
                  return (
                    <tr>
                      <td>{obj.cnic}</td>
                      <td>{obj.weapon_type}</td>
                      <td>{obj.lisence_no}</td>
                      <td>{obj.weapon_issued == true ? "Issued" : "Banned"}</td>
                      <td>{day + "/" + month + "/" + year}</td>
                    </tr>
                  );
                })
            : alldata.map((obj) => {
                  if (obj.cnic == _cnic) {
                    var date2 = new Date(obj.date * 1000);
                    var day = date2.getDate();
                    var month = date2.getMonth() + 1;
                    var year = date2.getFullYear();

                    return (
                      <tr>
                        <td>{obj.cnic}</td>
                        <td>{obj.weapon_type}</td>
                        <td>{obj.lisence_no}</td>
                        <td>{obj.weapon_issued == true ? "Issued" : "Banned"}</td>
                        <td>{day + "/" + month + "/" + year}</td>
                      </tr>
                    );
                  }
                })
            }
        </tbody>
      </table>
    </div>
  );
}
export default ShowWeapon;
