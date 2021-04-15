import React from "react";
import GuadianCard from "./GuadianCard";

function GuadanceTab({ user }) {
  console.log(user, "guadance tab");
  return (
    <div className="tab__container">
      {user?.length > 0 ? (
        user.map((e) => {
          return <GuadianCard guadian={e} key={e._id} noEdit={true} />;
        })
      ) : (
        <div>No guadian info</div>
      )}
    </div>
  );
}

export default GuadanceTab;
