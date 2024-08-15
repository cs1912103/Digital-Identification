import { useState,useEffect } from "react";
import { useStore } from "../context/GlobalState";

function ShowEducation() {
  var [{ allcnics,contract }] = useStore();
  const [alldata, setalldata] = useState([]);
  const [_cnic, setcnic] = useState("");
  console.log(allcnics);

  useEffect(()=>{
    if(allcnics != null){
      allcnics.map(async(obj) => {
          for(var i=0; i<2; i++){ 
            let data = await contract.methods.EducationData(obj,i).call();
            console.log(data)
            setalldata(alldata => [...alldata, data]);  
          }
        }) 
    }
  },[allcnics])

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2>Education</h2>

        <button
          className="btn btn-info"
          onClick={() => {
            window.location.href = "/education";
          }}
        >
          Add Education
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
            <th scope="col">Subject</th>
            <th scope="col">Marks</th>
            <th scope="col">Percentage</th>
            <th scope="col">Grade</th>
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

                  return (
                    <tr>
                      <td>{obj.cnic}</td>
                      <td>{obj.subject}</td>
                      <td>{obj.marks}</td>
                      <td>{obj.percentage}%</td>
                      <td>{obj.grade}</td>
                      <td>{day + "/" + month + "/" + year}</td>
                    </tr>
                  );
               })
            : alldata.map((obj) =>{
                  if (obj.cnic == _cnic) {
                    var date2 = new Date(obj.date * 1000);
                    var day = date2.getDate();
                    var month = date2.getMonth() + 1;
                    var year = date2.getFullYear();

                    return (
                      <tr>
                        <td>{obj.cnic}</td>
                        <td>{obj.subject}</td>
                        <td>{obj.marks}</td>
                        <td>{obj.percentage}%</td>
                        <td>{obj.grade}</td>
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
export default ShowEducation;
