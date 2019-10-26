import React from "react";
import styled from "@emotion/styled";

export default ({ store }) => {
  console.log(store);
  return (
    <Wrap
      bgColor="#20283a"
      width="100%"
      height="100%"
      padding=""
      justifyContent="space-around">
      <Wrap>
        {store.menu && store.menu.imageUrl && (
          <Image src={store.menu.imageUrl} />
        )}
        <Typography>○席空きあり</Typography>
        <Typography>現在地から○m</Typography>
      </Wrap>
      <Wrap width="40%">
        <Typography>店名： {store.name}</Typography>
        <Typography>住所： {store.name}</Typography>
        <Typography>マップで開く{store.name}</Typography>
        <Typography>Tel： {store.name}</Typography>
        <Typography>営業時間： {store.name}</Typography>
        <Typography>休日： {store.name}</Typography>
      </Wrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: ${props => props.bgColor};
  height: ${props => props.height};
  width: ${props => props.width};
  padding: ${props => props.padding};
  display: ${props => (props.justifyContent || props.alignItems) && "flex"};
  justify-content: ${props => props.justifyContent};
  aling-items: ${props => props.alignItems};
`;

const Typography = styled.div`
  color: white;
`;

const Image = styled.img`
  height: "60%";
  width: "100%";
`;
