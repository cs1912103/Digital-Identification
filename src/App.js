import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LandingHome from "./Pages/LandingHome";
import Citizen from "./Pages/Citizen";

import UnionLogin from "./Pages/UnionLogin";
import UnionCouncil from "./Pages/UnionCounci";
import ShowUnionCouncil from "./Pages/ShowUnionCouncil";

import TrafficLogin from "./Pages/TrafficLogin";
import TrafficChallan from "./Pages/TrafficChallan";

import WeaponLogin from "./Pages/WeaponLogin";
import WeaponLisence from "./Pages/WeaponLisence";
import ShowWeapon from "./Pages/ShowWeapon";

import Educations from "./Pages/Educations";
import EducationLogin from "./Pages/EducationLogin";
import ShowEducation from "./Pages/ShowEducation";

import CriminalRecord from "./Pages/CriminalRecord";
import CriminalLogin from "./Pages/CriminalLogin";
import ShowCriminal from "./Pages/ShowCriminal";

import ShowChallan from "./Pages/ShowChallan";

import MarriageLogin from "./Pages/MarriageLogin";
import MarriageRecord from "./Pages/MerriageRecord";

import { GlobalProvider } from "./context/GlobalState";
import Navbar from "./Pages/Navbar";
import Death from "./Pages/Death";

export default class App extends React.Component {
  render() {
    return (
      <GlobalProvider>
        <Navbar />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/landing" element={<LandingHome />}></Route>
            <Route path="/citizen" element={<Citizen />}></Route>

            {/* <Route path="/union-login" element={ <UnionLogin />}></Route> */}
            <Route
              path="/union-council"
              element={
                window.localStorage.getItem("union") === "true" ? (
                  <UnionCouncil />
                ) : (
                  <UnionLogin />
                )
              }
            ></Route>
            <Route
              path="/show-union"
              element={
                window.localStorage.getItem("union") === "true" ? (
                  <ShowUnionCouncil />
                ) : (
                  <UnionLogin />
                )
              }
            ></Route>
            <Route
              path="/death"
              element={
                window.localStorage.getItem("union") === "true" ? (
                  <Death />
                ) : (
                  <UnionLogin />
                )
              }
            ></Route>

            {/* <Route path="/weapon-login" element={<WeaponLogin />}></Route> */}
            <Route
              path="/show-weapon"
              element={
                window.localStorage.getItem("weapon") === "true" ? (
                  <ShowWeapon />
                ) : (
                  <WeaponLogin />
                )
              }
            ></Route>
            <Route
              path="/weapon-Lisence"
              element={
                window.localStorage.getItem("weapon") === "true" ? (
                  <WeaponLisence />
                ) : (
                  <WeaponLogin />
                )
              }
            ></Route>

            {/* <Route path="/education-login" element={<EducationLogin />}></Route> */}
            <Route
              path="/show-education"
              element={
                window.localStorage.getItem("education") === "true" ? (
                  <ShowEducation />
                ) : (
                  <EducationLogin />
                )
              }
            ></Route>
            <Route
              path="/education"
              element={
                window.localStorage.getItem("education") === "true" ? (
                  <Educations />
                ) : (
                  <EducationLogin />
                )
              }
            ></Route>

            {/* <Route path="/traffic-login" element={<TrafficLogin />}></Route> */}
            <Route
              path="/show-challan"
              element={
                window.localStorage.getItem("traffic") === "true" ? (
                  <ShowChallan />
                ) : (
                  <TrafficLogin />
                )
              }
            ></Route>
            <Route
              path="/challan"
              element={
                window.localStorage.getItem("traffic") === "true" ? (
                  <TrafficChallan />
                ) : (
                  <TrafficLogin />
                )
              }
            ></Route>

            {/* <Route path="/criminal-login" element={<CriminalLogin />}></Route> */}
            <Route
              path="/criminal"
              element={
                window.localStorage.getItem("criminal") === "true" ? (
                  <CriminalRecord />
                ) : (
                  <CriminalLogin />
                )
              }
            ></Route>
            <Route
              path="/show-criminal"
              element={
                window.localStorage.getItem("criminal") === "true" ? (
                  <ShowCriminal />
                ) : (
                  <CriminalLogin />
                )
              }
            ></Route>

            {/* <Route path="/marriage-login" element={<MarriageLogin />}></Route> */}
            <Route
              path="/marriage"
              element={
                window.localStorage.getItem("marriage") === "true" ? (
                  <MarriageRecord />
                ) : (
                  <MarriageLogin />
                )
              }
            ></Route>
          </Routes>
        </Router>
      </GlobalProvider>
    );
  }
}
