import React from "react";
import { GlobalToolBar } from "../../global";
import "../../global.css";
import "./test.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Testing() {
    const navigate = useNavigate();
    function handleClick(path) {
        navigate(path);
      }


    return <div>
        <GlobalToolBar />
        <div className = "overlap">
            <br></br>
            <h1>
                <span>Support Your Favourite Projects On Our</span>
                <br/>
                <span className="text-green-600">PLATFORM.</span>
            </h1>
            <br/>
            <Button
            className="btn btn-info me-2"
            onClick ={()=>handleClick("/InterfaceDemo/createProject")}>
                <span>Add Project</span>
            </Button>
            <br></br>
            <br></br>
            <div class="card-group container">
                <div class="card text-white bg-info mb-3">
                    <div class="card-header">3</div>
                    <div class="card-body text-success">
                        <h5 class="card-title">Projects</h5>
                    </div>
                </div>
                <div class="card text-white bg-info mb-3">
                    <div class="card-header">2</div>
                    <div class="card-body text-success">
                        <h5 class="card-title">Backed</h5>
                    </div>
                </div>
                <div class="card text-white bg-info mb-3">
                    <div class="card-header">0.238783 ETH</div>
                    <div class="card-body text-success">
                        <h5 class="card-title">Donated</h5>
                    </div>
                </div>

            </div>


        </div>

    </div>

}

export default Testing;
