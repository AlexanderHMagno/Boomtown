import React from 'react';
/* 
  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
import ShareItemForm from '../../components/ShareItemForm';
// import ShareItemPreview from '../../components/ShareItemPreview';

const Share = ({ classes }) => {
  return (
    <div>
      <p>
        < ShareItemForm />
      </p>
    </div>
  );
};

export default Share;
