import React, { Component } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
const AvailableVenues = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://localhost:7100/api/CurrentEvents/getavailablevenues?begin=${props.begin}&end=${props.end}&$filter=status ne false`,
        {
          withCredentials: true,
        }
      );
      props.getvens(result.data);
    };

    fetchData();
  }, [props.begin, props.end]);

  return <></>;
};
export default AvailableVenues;
