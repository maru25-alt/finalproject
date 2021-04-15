import React from "react";
import GuadianCard from "./GuadianCard";

function GuadanceTab({ user }) {
  return (
    <div className="tab__container">
      {user ? (
        <GuadianCard guadian={user} noEdit={true} />
      ) : (
        <div>No nextofkin info</div>
      )}
    </div>
  );
}

export default GuadanceTab;
