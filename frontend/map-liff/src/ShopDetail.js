import React from "react";
import styled from "@emotion/styled";

export default ({ shop }) => {
  return (
    <Card>
      <div>{shop.docId}</div>
      <div>{shop.name}</div>
      <div>{shop.location && shop.location.lat}</div>
      <div>{shop.location && shop.location.lng}</div>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellow;
`;
