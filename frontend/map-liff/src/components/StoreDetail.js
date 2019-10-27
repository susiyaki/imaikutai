import React from "react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Wrap from "../components/Wrap";

export default ({ store, history }) => {
  const handleClickOpenMap = location => {
    window.open(
      `https://maps.google.com/maps?q=${location.lat},${location.lng}`
    );
  };

  return (
    <Wrap bgColor="#20283a" height="50vh">
      {store.docId ? (
        <>
          <Wrap justifyContent="flex-start" height="40%">
            <Wrap
              alignItems="center"
              height="100%"
              width="50%"
              margin="0 0 0 5%">
              <Thumbnail url={store.thumbnailUrl} />
            </Wrap>
            <Wrap
              width="45%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              flexDirection="column">
              <Typography>
                空席数 {store.filledSeats} / {store.seats}
              </Typography>
              {/* <Typography>現在地から○m</Typography> */}
            </Wrap>
          </Wrap>
          <Wrap height="40%" padding="0 5%">
            <Wrap justifyContent="flex-start">
              <Typography width="5rem">店名</Typography>
              <Typography>{store.name}</Typography>
            </Wrap>
            <Wrap justifyContent="flex-start">
              <Typography width="5rem">住所</Typography>
              <Typography>{store.name}</Typography>
            </Wrap>
            <Wrap justifyContent="flex-start">
              <Typography width="5rem">電話番号</Typography>
              <Typography>{store.tel}</Typography>
            </Wrap>
            <Wrap justifyContent="flex-start">
              <Typography width="5rem">営業時間</Typography>
              <Typography>
                {`${dayjs(store.businessHour.open.toDate()).format(
                  "hh:mm"
                )} ~ ${dayjs(store.businessHour.close.toDate()).format(
                  "hh:mm"
                )}`}
              </Typography>
            </Wrap>
            <Wrap justifyContent="flex-start">
              <Typography width="5rem">店休日</Typography>
              <Typography>{store.businessHour.holiday}</Typography>
            </Wrap>
          </Wrap>
          <Wrap
            width="100%"
            height="20%"
            justifyContent="space-around"
            alignItems="center">
            <Button onClick={() => handleClickOpenMap(store.location)}>
              <Typography size="1.5rem">マップで開く</Typography>
            </Button>
            <Button onClick={() => history.push("/menus", store)}>
              <Typography size="1.5rem">メニュー</Typography>
            </Button>
          </Wrap>
        </>
      ) : (
        <Wrap height="100%" justifyContent="center" alignItems="center">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            color="orange"
            size="2x"
            style={{ marginRight: "1rem" }}
          />
          <Typography>ピンをタップしてね</Typography>
        </Wrap>
      )}
    </Wrap>
  );
};

const ColumnTitle = styled.span`
  color: white;
  width: 4rem;
`;
const Typography = styled.div`
  color: white;
  width: ${props => props.width};
  font-size: ${props => (props.size ? props.size : "1rem")};
`;

const Thumbnail = styled.div`
  background-image: ${props => `url(${props.url})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: orange;
  height: 70%;
  width: 40%;
  border-radius: 5px;
`;
