import React from "react";
import styled from "@emotion/styled";
import { db } from "./firebase";
import GoogleMapReact from "google-map-react";
import StoreDetail from "./StoreDetail";

export default class extends React.Component {
  state = {
    presentLocation: {
      lat: 33.589728,
      lng: 130.420727
    },
    stores: [],
    selectedStore: {},
    defaultLatLng: { lat: 33.589728, lng: 130.420727 },
    defaultZoom: 16
  };

  componentDidMount = async () => {
    this.getUrlParam();
  };

  getUrlParam = () => {
    const url = window.location.search;
    const location = url.slice(1).split("&");
    const lat = parseFloat(location[0].split("=")[1]);
    const lng = parseFloat(location[1].split("=")[1]);

    this.setState({ presentLocation: { lat, lng } });
  };

  fetchStoreLocations = async (latMax, latMin, lngMax, lngMin) => {
    const stores = await db
      .collection("Stores")
      .where("location.lat", "<", latMax)
      .where("location.lat", ">", latMin)
      .get()
      .then(querySnapshot => {
        let result = [];
        querySnapshot.forEach(doc => {
          const data = {
            docId: doc.id,
            ...doc.data()
          };

          if (data.location.lng > lngMin && data.location.lng < lngMax) {
            result.push(data);
          }
        });
        return result;
      });

    this.setState({ stores });
  };

  handleClickPin = docId => {
    const { stores } = this.state;
    const selectedStore = stores.find(store => store.docId === docId);

    this.setState({ selectedStore });
  };

  handleBoundsChange = (center, zoom, bounds, marginBounds) => {
    const latMax = bounds[0];
    const latMin = bounds[2];
    const lngMax = bounds[3];
    const lngMin = bounds[1];

    this.fetchStoreLocations(latMax, latMin, lngMax, lngMin);
  };

  render() {
    const { presentLocation } = this.state;
    const { stores, selectedStore, defaultZoom, defaultCenter } = this.state;

    return (
      <Wrap width="100%">
        <Wrap height="40vh">
          <StoreDetail store={selectedStore} />
        </Wrap>
        <Wrap height="60vh">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAP_API_KEY
            }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            center={presentLocation}
            onBoundsChange={this.handleBoundsChange}>
            {stores &&
              stores.map((store, index) => (
                <Pin
                  key={index}
                  lat={store.location.lat}
                  lng={store.location.lng}
                  onClick={() => this.handleClickPin(store.docId)}>
                  ▼
                </Pin>
              ))}
          </GoogleMapReact>
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
