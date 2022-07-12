import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


function DisplayIdeas() {
    const [ideaList, setIdeaList] = useState([]);

    const [newIdea, setNewIdea] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [selectedIdea, setSelectedIdea] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    const [id, setId] = useState("");
    const [proposer, setProposer] = useState("");
    const [idea, setIdea] = useState("");
    const [votes, setVotes] = useState(0);
    //const [newVote, setNewVote] = useState(0);
    //const [disableVote, setDisableVote] = useState(false);
    // set up an array to denote all the ideas user votes       bool[ideaList.length()]

    // find out what this does!!!!
    //Axios.defaults.withCredentials = true;

    /*
    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            console.log(response);
        })
    }, []);
    */

    useEffect(() => {
        Axios.get("http://localhost:3001/api/get").then((response) => {
            setIdeaList(response.data);
        });
    }, []);
    // if there is a change inside of get method, useEffect function will be called over and over again
    // empty dependency array in the end means it should only run once; no array means fetch data everytime render DOM tree
    // but change of state is not immediately reflected on the web...

    

    const updateIdea = () => {
        Axios.put(`http://localhost:3001/api/update/idea/${selectedIdea.id}`, {
            idea: newIdea,
        }).then((err) => { if (err) console.log(err); });
        setEditMode(false);
        //setIdeaList();
    };


    const handelDelete= (event) => {
        Axios.delete(`http://localhost:3001/api/delete/${event.target.value}`).then((err) => {
            if (err) console.log(err);
        });

        setIdeaList(current => current.filter(idea => { return idea.id !== event.target.value }));
    };


    const updateVotes = (idea) => {
        //console.log(idea);
        Axios.put(`http://localhost:3001/api/update/votes/${idea.id}`, {
            votes: Number(idea.votes) + 1
        }).then((err) => {
            if (err) console.log(err);
        });
        //setDisableVote(true);
    };

    // float-right for align right on buttons, text-right for texts

    const table = ideaList.map((idea) => {
        return (
            <div className="card" key={idea.id}>
                <button className="btn btn-outline-dark ml-auto" value={ idea.id } onClick={handelDelete}>delete</button>
                <p>Idea ID: {idea.id}, Proposed by {idea.proposer}</p>
                <p>{idea.idea}</p>
                <br></br>
                <p className="text-right">votes: {idea.votes}</p>
                <div>
                    <button className="btn btn-outline-dark float-left" onClick={() => { setEditMode(true); setSelectedIdea(idea); }} >edit</button>
                    <button className="btn btn-outline-dark float-right" value={ idea.id } onClick={ () => updateVotes(idea) }>vote</button>
                </div>
            </div>
        );
    });

    // create an array to store all information retrieved from database, and modify it 
    
    const submitModal =
        <div>
            <Modal isOpen={editMode}>
                <ModalHeader>
                    Content of Idea
                </ModalHeader>
                <ModalBody>
                    <textarea id="inputText" defaultValue={ selectedIdea ? selectedIdea.idea : ""} onChange={(e) => { setNewIdea(e.target.value) }}/>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-outline-dark" onClick={() => setEditMode(false)}>cancel</button>
                    <button className="btn btn-outline-dark" value={selectedIdea ? selectedIdea.id : ""} onClick={updateIdea}>submit</button>
                </ModalFooter>
            </Modal>
        </div>;

    /*
    const [id, setId] = useState("");
    const [proposer, setProposer] = useState("");
    const [idea, setIdea] = useState("");
    const [votes, setVotes] = useState(0);
    */

    const handleSubmit = () => {
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

    const UserInput = 
        /*
        const checkSubmitted = (e) => {
            console.log(this.state);
            e.preventDefault();     // prevent automatically refresh the page
        }
        */

        // adding name field in input tag so [name]: value could map them
        <div>
            <Modal isOpen={isOpen}>
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
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </ModalFooter>
            </Modal>
        </div>;

        // if we do a setState call without using arrow functions, it will automatically trigger re-render, causing infinite loop
    return (
        <div>
            <div>
            <button className="btn btn-outline-black float-right" onClick={() => setIsOpen(true)}>add an idea</button>
                { UserInput }
            </div>
            <div>
                {table}
            </div>
            <div>
                {submitModal}
            </div>
        </div>
    );
};


export default DisplayIdeas;