import React, { useState } from "react";
import Axios from 'axios';
import { Form, Modal, ModalFooter } from "reactstrap";

function UserInput() {

    const [id, setId] = useState("");
    const [proposer, setProposer] = useState("");
    const [idea, setIdea] = useState("");
    const [votes, setVotes] = useState(0);

    const [isOpen, setIsOpen] = useState(true);
    const handleSubmit = (event) => {
        Axios.post("http://localhost:3001/api/insert", {
            id: id,
            proposer: proposer,
            idea: idea,
            votes: votes}
        ).then(() => {
            alert("success insert!");
        }).catch((err) => {
            console.log(err);
        })
        setIsOpen(false);
        //event.preventDefault();
    }

    /*
    const checkSubmitted = (e) => {
        console.log(this.state);
        e.preventDefault();     // prevent automatically refresh the page
    }
    */

    // adding name field in input tag so [name]: value could map them
    return (
        <div>
            <Modal isOpen={isOpen} onSubmit={handleSubmit}>
                <label className="col-3">
                    id:
                    <input name="id" type="text" value={id} onChange={(e) => { setId(e.target.value); }} />
                </label>
                <br></br>
                <label className="col-3 row-3">
                    proposer:
                    <input name="proposer" type="text" value={proposer} onChange={(e) => { setProposer(e.target.value); }}/> 
                </label>
                <br></br>
                <label className="col-3">
                    idea:
                    <textarea id="inputText" name="idea" type="text" defaultValue={""} onChange={(e) => { setIdea(e.target.value); }}/>
                </label>
                <br></br>
                <label className="col-3 row-3">
                    votes:
                    <input name="votes" type="number" value={votes} onChange={(e) => { setVotes(e.target.value); }}/>
                </label>
                <ModalFooter>
                    <button>Submit</button>
                    <button onClick={setIsOpen(false)}>Cancel</button>
                </ModalFooter>
            </Modal>
        </div>
        );
    }

export default UserInput;
