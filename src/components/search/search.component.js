import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const Search = ({placeholder, handleChange }) => {
  return (
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
};

export default Search;
