import React from "react";

const H = (props) => {
  switch (props.level) {
    case 1:
      return <h1 className="text-5xl">{props.children}</h1>
    case 2:
      return <h2 className="text-4xl">{props.children}</h2>
    case 3:
      return <h3 className="text-3xl">{props.children}</h3>
    case 4:
      return <h4 className="text-2xl">{props.children}</h4>
    case 5:
      return <h5 className="text-xl">{props.children}</h5>
    default:
      return <h6 className="text-lg">{props.children}</h6>
  }
};

const Heading = (props) => {
  const {document: {level, children}} = props;

  return (
    <H level={level}>
      {children.map(child => child.text)}
    </H>
  );
};

export default Heading;
