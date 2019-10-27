import React from "react";
import styled from "@emotion/styled";
import Wrap from "../components/Wrap";

export default class extends React.Component {
  render() {
    const store = this.props.location.state;

    return store ? (
      <Wrap bgColor="#dae6ed" style={{ minHeight: "100vh" }}>
        {store.menus.map((menu, index) => (
          <MenuCard key={index} menu={menu} />
        ))}
      </Wrap>
    ) : (
      <></>
    );
  }
}

const MenuCard = menu => {
  const item = menu.menu;

  return (
    <Wrap
      bgColor="#20283a"
      margin="0 0 5% 0"
      padding="3% 5%"
      width="90%"
      style={{ minHeight: "30vh" }}>
      <Typography size="1.5rem">{item.name}</Typography>
      <hr />
      <Image url={item.imageUrl} />
      <Typography style={{ wordBreak: "break-all" }}>
        {item.description}
      </Typography>
      <Wrap justifyContent="flex-end">
        <Typography size="1.2rem">{item.price} 円</Typography>
      </Wrap>
    </Wrap>
  );
};

const Typography = styled.div`
  color: white;
  width: ${props => props.width};
  font-size: ${props => (props.size ? props.size : "1rem")};
`;

const Image = styled.div`
  background-size: 100%, auto;
  background-image: ${props => `url(${props.url})`};
  background-repeat: no-repeat;
  margin: 10px 0;
  height: 200px;
`;
