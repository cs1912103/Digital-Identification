import { useEffect, useState } from "react";
import { useStore } from "../context/GlobalState";

function ShowUnionCouncil() {
  var [{ allcnics,contract }] = useStore();
  const [alldata, setalldata] = useState([]);
  const [_cnic, setcnic] = useState("");

  console.log(allcnics);

    useEffect(()=>{
      if(allcnics != null){
        allcnics.map(async(obj) => {
            // obj.map(async(na) => {
              let data = await contract.methods.UnionConcilData(obj).call();
              setalldata(alldata => [...alldata, data]);  
            // })
          }) 
      }
    },[allcnics])

    const logOut = () => {
      localStorage.setItem("union", "false");
      window.location.href = "/landing";
    };

  return (
    <div className="container mt-5">
      <br />
      <div className="d-flex justify-content-between">
        <h2>Union</h2>
        <div>
          <button
            className="btn btn-info"
            onClick={() => {
              window.location.href = "/union-council";
            }}
          >
            Add Union
          </button>
          <button
            className="btn btn-info"
            onClick={() => {
              window.location.href = "/death";
            }}
          >
            Add Death Status
          </button>
          <button className="btn btn-info" onClick={logOut}>
            LOGOUT
          </button>
        </div>
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

      <table className="table" name="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">CNIC</th>
            <th scope="col">Father Name</th>
            <th scope="col">Mother Name</th>
            <th scope="col">Father CNIC</th>
            <th scope="col">Mother CNIC</th>
            <th scope="col">Gender</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">City</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody>
          {
            _cnic == "" ?
                      alldata.map((obj) => {
                            var date2 = new Date(obj.dob * 1000);
                            var day = date2.getDate();
                            var month = date2.getMonth() + 1;
                            var year = date2.getFullYear();
                            console.log(obj)
                            return (
                              <tr>
                                <td key={obj.name}>{obj.name}</td>
                                <td key={obj.cnic}>{obj.cnic}</td>
                                <td key={obj.f_name}>{obj.f_name}</td>
                                <td key={obj.m_name}>{obj.m_name}</td>
                                <td key={obj.f_cnic}>{obj.f_cnic}</td>
                                <td key={obj.m_cnic}>{obj.m_cnic}</td>
                                <td key={obj.gender}>{obj.gender}</td>
                                <td key={obj.dob}>{day + "/" + month + "/" + year}</td>
                                <td key={obj.city}>{obj.city}</td>
                                <td key={obj.isDied}>{obj.isDied == true ? "Die" : "Alive"}</td>
                              </tr>
                            );
                        })
             
               : 
                      alldata.map((obj) => {
                        if(_cnic == obj.cnic){
                        var date2 = new Date(obj.dob * 1000);
                        var day = date2.getDate();
                        var month = date2.getMonth() + 1;
                        var year = date2.getFullYear();
                        console.log(obj)
                        return (
                        <tr>
                          <td key={obj.name}>{obj.name}</td>
                          <td key={obj.cnic}>{obj.cnic}</td>
                          <td key={obj.f_name}>{obj.f_name}</td>
                          <td key={obj.m_name}>{obj.m_name}</td>
                          <td key={obj.f_cnic}>{obj.f_cnic}</td>
                          <td key={obj.m_cnic}>{obj.m_cnic}</td>
                          <td key={obj.gender}>{obj.gender}</td>
                          <td key={obj.dob}>{day + "/" + month + "/" + year}</td>
                          <td key={obj.city}>{obj.city}</td>
                          <td key={obj.isDied}>{obj.isDied == true ? "Die" : "Alive"}</td>
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
export default ShowUnionCouncil;
