import React from 'react';
/* 
  When the user is filling ShareItemForm, we will show a preview of 
  this item using the ShareItemPreview. 
  Hint: It should look like any other Item card.

*/
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import {INITIAL_STATE} from '../../redux/reducers';


const Share = ({ classes }) => {
  console.log({INITIAL_STATE})
  return (
   <div>
    {/* //     < ShareItemPreview title={INITIAL_STATE.name}/> */}
   
        < ShareItemForm />
      
    </div>
  );
};

export default Share;
