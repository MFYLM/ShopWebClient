import React, { Component, useState } from 'react';
import { Card, CardImg, CardBody, CardText, CardImgOverlay, CardTitle } from 'reactstrap';
import { Link, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ItemDetail from "./ItemDetail";

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        };
    }
    // react-bootstrap gives className meaning of setting up layout of a tag            TODO: check the syntax!!!
    
    onDishSelect(dish) {
        this.setState( { selectedDish: dish } );
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="`100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return ( <div></div> );
        }
    }

    // route shall use only once in App.js to direct to different pages with components and elements

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Link to="/itemDetail">      
                        <Card onClick={() => this.onDishSelect(dish)}>
                            <CardImg width="`100%" src={"ShopWebLearn/" + dish.image} alt={dish.name} />
                            <CardImgOverlay>
                                <CardTitle>{dish.name}</CardTitle>
                            </CardImgOverlay>
                        </Card>
                    </Link>
                </div>
            );
        });

        return (
            <div className="container">
               <Router>
                    <Routes>
                        <Route exact path="/ShopWebLearn" element={menu} />
                        <Route path="/itemDetail" element={<ItemDetail dish={this.state.selectedDish}/>} />
                    </Routes>
                </Router>
            </div>
        );
    }

};

export default Menu;