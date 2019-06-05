import React from "react";
import ShareItemForm from "../../components/ShareItemForm";

const Share = ({ classes, viewer }) => {
  return (
    <div>
      <ShareItemForm viewer={viewer} />
    </div>
  );
};

export default Share;
