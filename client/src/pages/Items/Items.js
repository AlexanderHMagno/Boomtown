import React from 'react';
import Card from './Card';

const divStyle = {
  minWidth: '100%',
  background: 'black'
  
};

const ulStyle = {
  margin: 'auto',
  marginTop:'5%'
};

const liStyle = {
  color: 'white',
  display: 'inline-block',
  minWidth: '45%',
};

const Items = ({ classes, items }) => {

  
  return (
    <div style={divStyle}>   
      <ul style={ulStyle}>
        {items.map(element=> 
        <li style={liStyle} key={element.id}>
          <Card 
                item_owner={element.itemowner.fullname}
                title={element.title}
                description={element.description}
                imageUrl={element.imageurl}
                item_id={element.id} />
        </li>)}
      </ul>
    </div>
  );
};

export default Items;

