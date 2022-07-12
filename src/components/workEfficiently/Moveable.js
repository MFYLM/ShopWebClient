import React from "react";
import "./Moveable.css"

class Moveable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            difX: 0, 
            difY: 0,
            dragging: false,
            objects: [],
            outputText: "",
        }



        this.dragStart = this.dragStart.bind(this);
        this.drag = this.drag.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.addObject = this.addObject.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
        this.linkObject = this.linkObject.bind(this);
        this.setText = this.setText.bind(this);
    };
    

    /*
        arrows: [
            style of object,

        ]
    */

    dragStart(e) {
        this.setState({
            difX: e.screenX - e.currentTarget.getBoundingClientRect().left,
            difY: e.screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true,
        });
    };


    drag(e) {
        if (this.state.dragging)
        {
            for (var i = 0; i < this.state.objects.length; ++i)
            {
                if (this.state.objects[i].id === e.target.getAttribute("value"))
                {
                    let items = [...this.state.objects];
                    let item = {...items[i]};

                    let left = e.screenX - this.state.difX;
                    let top = e.screenY - this.state.difY;

                    item.style = { left: left, top: top };          // make shallow copy of items and item to modify array and reset the state
                    items[i] = item;

                    this.setState( {
                        objects: items
                    });

                    
                } 
            }

        }
    };


    dragEnd() {
        this.setState({
            dragging: false
        });
    };


    addObject() {
        this.setState({
            objects: [...this.state.objects, { id: Math.random().toString(16).slice(2), text: "default", style: { left: 200, top: 200 }, edges: [{left: 200, top: 200}] }]
        });
    }


    deleteObject(e) {
        this.setState({
            objects: [...this.state.objects.filter(object => object.id !== e.target.value)]
        });
    }


    linkObject(e) {

    }

    setText(e) {

    }

    // after click link button, there should be an detect another click on node

    render() {
        return (
            <div>
                <button className="btn btn-outline-dark" onClick={ this.addObject }>add moveable</button>
                <div>
                    { 
                        this.state.objects.map((object) => {
                        return <div key={object.id}>
                            <div className="Moveable" style={ object.style } value={object.id} onMouseDown={ this.dragStart } onMouseMove={this.drag} onMouseUp={this.dragEnd}>
                                <button className="circleNode" />
                                <textarea disabled={false} defaultValue={object.text} onChange={(e) => this.setState({outputText: e.target.value})}></textarea>
                                <button value={object.id} onClick={this.linkObject}>edit</button>
                                <button value={object.id} onClick={this.deleteObject}>delete</button>
                                <div>
                                    { object.edges.map((edge) => {
                                        return <svg key={edge.left + edge.right}>
                                            <line 
                                                x1={object.style.left} y1={object.style.top}
                                                x2={edge.left} y2={edge.top}
                                            />
                                        </svg>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        })
                    }
                </div>
                <svg width="500" height="500">
                    <path fill="white" stroke="black" stoke-width="4"
                        d="M66.039,133.545c0,0-21-57,18-67s49-4,65,8
                        s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
                        C46.039,146.545,53.039,128.545,66.039,133.545z"
                        pathLength="1"
                    />
                </svg>
            </div>
        );
    };
};


export default Moveable;