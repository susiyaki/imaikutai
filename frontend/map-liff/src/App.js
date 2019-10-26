import React from "react";
import styled from "@emotion/styled";
import { db } from "./firebase";
import GoogleMapReact from "google-map-react";
import ShopDetail from "./ShopDetail";

export default class extends React.Component {
  state = {
    presentLocation: {
      lat: 0,
      lng: 0
    },
    shops: [],
    loading: true,
    selectedShop: {}
  };

  componentDidMount = async () => {
    this.getUrlParam();
    this.fetchShopLocations();
  };

  getUrlParam = () => {
    const url = window.location.search;
    const location = url.slice(1).split("&");
    const lat = parseInt(location[0].split("=")[1]);
    const lng = parseInt(location[1].split("=")[1]);

    this.setState({ presentLocation: { lat, lng } });
  };

  fetchShopLocations = async () => {
    const shops = await db
      .collection("Shops")
      .get()
      .then(querySnapshot => {
        let result = [];
        querySnapshot.forEach(doc => {
          const data = {
            docId: doc.id,
            ...doc.data()
          };
          result.push(data);
        });
        return result;
      });

    this.setState({ shops, loading: false });
  };

  handleClickPin = docId => {
    const { shops } = this.state;
    const selectedShop = shops.find(shop => shop.docId === docId);
    this.setState({ selectedShop });
  };

  render() {
    const { lat, lng } = this.state.presentLocation;
    const { shops, loading, selectedShop } = this.state;

    return (
      <Wrap width="100%">
        <Wrap height="40vh">
          <ShopDetail shop={selectedShop} />
        </Wrap>
        <Wrap height="60vh">
          {!loading && (
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAP_API_KEY
              }}
              defaultCenter={{ lat, lng }}
              defaultZoom={3}>
              {shops &&
                shops.map((shop, index) => (
                  <Pin
                    key={index}
                    lat={shop.location.lat}
                    lng={shop.location.lng}
                    onClick={() => this.handleClickPin(shop.docId)}>
                    ▼
                  </Pin>
                ))}
            </GoogleMapReact>
          )}
        </Wrap>
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
  padding: ${props => props.padding};
`;
const Pin = styled.div`
  color: red;
`;
