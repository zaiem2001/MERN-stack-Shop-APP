import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBox = ({ set }) => {
  const [keyword, setKeyword] = useState("");

  const history = useHistory();

  const [show, setShow] = useState(true);

  useEffect(() => {
    const width = window.innerWidth;

    width < 500 ? setShow(false) : setShow(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    set(false);

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      inline
      style={{ display: show ? "flex" : "none" }}
      className="searchBox"
    >
      <Form.Control
        type="text"
        style={{ color: "white" }}
        value={keyword}
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>

      <Button type="submit" variant="outline-success" className="mx-2">
        {" "}
        Search{" "}
      </Button>
    </Form>
  );
};

export default SearchBox;
