import { useState } from "react";
import "./header.scss";

type TPropHeader = {
  title: string;
};

function Header(props: TPropHeader) {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="component-header">
        <h1 className="component-header__title">{props.title}</h1>
      </div>
    </>
  );
}

export default Header;
