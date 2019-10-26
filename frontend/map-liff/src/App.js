import React from "react";
import styled from "@emotion/styled";
import { db } from "./firebase";
import GoogleMapReact from "google-map-react";
import StoreDetail from "./StoreDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

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

  componentDidMount() {
    this.getUrlParam();
  }

  getUrlParam = () => {
    const url = window.location.search;
    const location = url.slice(1).split("&");
    if (location.length !== 1) {
      const lat = parseFloat(location[0].split("=")[1]);
      const lng = parseFloat(location[1].split("=")[1]);
      this.setState({ presentLocation: { lat, lng } });
    } else {
      const { defaultCenter } = this.state;
      this.setState({ defaultCenter });
    }
  };

  fetchStoreLocations = async (latMax, latMin, lngMax, lngMin) => {
    console.log("call");
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

  handleBoundsChange = e => {
    const latMax = e.bounds.nw.lat;
    const latMin = e.bounds.se.lat;
    const lngMax = e.bounds.se.lng;
    const lngMin = e.bounds.nw.lng;

    this.fetchStoreLocations(latMax, latMin, lngMax, lngMin);
  };

  render() {
    const {
      presentLocation,
      stores,
      selectedStore,
      defaultZoom,
      defaultCenter
    } = this.state;

    return (
      <Wrap width="100%">
        <StoreDetail store={selectedStore} />
        <Wrap height="50vh">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAP_API_KEY
            }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            center={presentLocation}
            onChange={this.handleBoundsChange}>
            <Pin
              lat={presentLocation.lat}
              lng={presentLocation.lng}
              color="blue"
            />
            {stores &&
              stores.map((store, index) => (
                <Pin
                  key={index}
                  lat={store.location.lat}
                  lng={store.location.lng}
                  onClick={() => this.handleClickPin(store.docId)}
                  color="orange"
                />
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

const Pin = ({ color, lat, lng, onClick }) => (
  <FontAwesomeIcon
    icon={faMapMarkerAlt}
    color={color}
    size="2x"
    lat={lat}
    lng={lng}
    onClick={onClick}
  />
);
