import React from 'react';
import { Card, CardImg, CardBody, CardText, CardImgOverlay, CardTitle } from 'reactstrap';


function ItemDetail(props) {
    return (
        <div>
            <Card>
                <CardImg width="`100%" src={"ShopWebLearn/" + props.dish.image} alt={props.dish.name} />
                <CardBody>
                    <CardTitle>{props.dish.name}</CardTitle>
                    <CardText>{props.dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};


export default ItemDetail;