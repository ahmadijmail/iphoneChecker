import React, { useState } from "react";
import axios from "axios";
import { When } from "react-if";
import './body.scss'
const Body = () => {
    const [imei, setimei] = useState({ type: "" });
    const [serviceInfo, setserviceInfo] = useState({ type: "" });
    const [serviceid, setserviceID] = useState({ type: "" });
    const [result, setresult] = useState();
    let url = process.env.REACT_APP_API_URL;
    let key = process.env.REACT_APP_API_KEY;
  
    const imeicCheck = async (e) => {
      e.preventDefault();
  
      axios
        .post(url, null, {
          params: {
            service: serviceInfo.id,
            imei: imei.imei,
            key: key,
          },
        })
        .then((res) => {
          

          if(res.data.error){
            console.log("errorrss", res);
            setresult({error:res.data.error })
          }else {

            setresult({ response: res.data });
            console.log(res.data ,"sfsfsf");
            setserviceID(res.config.params.service);
            console.log("API Response", res);

          }
         
        })
        .catch((error) => {
         
          console.log(error, "errorr");
        });
    };
  return (
   <>
    <select
        onChange={(e) => {
          const ServiceName = e.target.value;
          console.log(ServiceName);

          if (e.target.value == "FindMy") {
            setserviceInfo({ id: 4 });
          } else if (ServiceName == "AppleBasicInfo") {
            setserviceInfo({ id: 205 });
          }
          console.log("serviceInfo", serviceInfo);
        }}
        className="btn2"
        id="copy"
      >
        <option className="btn" value="">
          Select Service
        </option>

        <option value="FindMy" className="submit">
          Find My iPhone
        </option>

        <option value="AppleBasicInfo" className="submit">
          Apple Basic info
        </option>
      </select>

      <div className="buttonIn">
        <input
          className="btn3"
          type="text"
          placeholder="IMEI / Serial"
          name="imei"
          onChange={(e) => setimei({ imei: e.target.value })}
        />
        <button className="btn4" onClick={imeicCheck}>
          submit
        </button>
      </div>
{result? <span className="error">{result.error} </span>:""}


      {serviceid == 4 && result.response? (
        <div>
          <div className="courses-container">
            <div className="course">
              <div className="course-preview">
                <div className="course-info">
                  <img
                    className="img"
                    src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios13-iphone-xs-home-assistive-touch.png"
                  />
                </div>
              </div>
              <div className="course-info">
                <h2> IMEI: {result.response.object.imei}</h2>

                <h4>
                  {" "}
                  Find My iPhone:{" "}
                  {result.response.object.fmiON == false ? "OFF" : "ON"}
                  <span>{result ? result.response.name : ""}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {serviceid == 205 && result.response? (
        <div className="courses-container">
          <div className="course">
            <div className="course-preview">
              <h6>Service: Basic info 0.5$</h6>
              <td width="80">
                <img className="img" src={result.response.object.thumbnail} />
              </td>{" "}
              <br />
              <a href="#">
                View All Details <i class="fas fa-chevron-right"></i>
              </a>
            </div>
            <div className="course-info">
              <h2>{result.response.object.modelDesc}</h2>
              <h4>Serial : {result.response.object.serial}</h4>
              <h4>
                Purchase Country: {result.response.object.purchaseCountry}{" "}
              </h4>
              <h4>Purchase Date: {result.response.object.estPurchaseDate}</h4>
              <h4>Warranty Status: {result.response.object.warrantyStatus}</h4>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
   </>
  )
}

export default Body