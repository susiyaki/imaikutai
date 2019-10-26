import React from "react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default ({ store }) => {
  return (
    <Wrap bgColor="#20283a" height="50vh">
      {store.docId ? (
        <>
          <Wrap alignItems="flex-end" height="40%">
            <Wrap alignItems="center" height="100%" width="50%">
              <Thumbnail url={store.thumbnailUrl} />
            </Wrap>
            <Wrap width="50%">
              <Typography>○席空きあり</Typography>
              <Typography>現在地から○m</Typography>
            </Wrap>
          </Wrap>
          <Wrap height="40%" padding="0 5%">
            <Typography>店名：　{store.name}</Typography>
            <Typography>住所：　{store.name}</Typography>
            <Typography>Tel：　{store.tel}</Typography>
            <Typography>
              営業時間：　
              {`${dayjs(store.businessHour.open.toDate()).format(
                "hh:mm"
              )} ~ ${dayjs(store.businessHour.close.toDate()).format("hh:mm")}`}
            </Typography>
            <Typography>休日：　{store.businessHour.holiday}</Typography>
          </Wrap>
          <Wrap
            width="100%"
            height="20%"
            justifyContent="center"
            alignItems="center">
            <Button
              href={`https://maps.google.com/maps/@${store.location.lat},${store.location.lng},10z`}>
              <Typography size="1.5rem">マップで開く</Typography>
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

const Wrap = styled.div`
  background-color: ${props => props.bgColor};
  height: ${props => props.height};
  width: ${props => props.width};
  padding: ${props => props.padding};
  display: ${props =>
    props.justifyContent || props.alignItems ? "flex" : "block"};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
`;

const Typography = styled.div`
  color: white;
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

const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: orange;
  height: 70%;
  width: 80%;
  border-radius: 5px;
`;
