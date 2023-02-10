import React, { useEffect, useRef, useState } from "react";
import {
  Circle,
  GoogleMap,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import Loader from "./Loader";
import UserBox from "./UserBox";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map({
  center,
  isLoaded,
  mapRef,
  icon,
  google,
  getAllLocation,
  markers,
  km,
  getClickedUser,
  userPopups,
  userImage,
  mapId,
}) {
  useEffect(() => {
    getAllLocation();
  }, []);

  return isLoaded ? (
    <StyledMap>
      <UserBox userImage={userImage} userPopups={userPopups} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={{ mapId: mapId }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {markers.map((m) => (
          <MarkerF
            onClick={(e) => getClickedUser(m, e)}
            // onClick={() => console.log(markers)}
            position={m}
            icon={icon}
            key={uuid()}
          />
        ))}
        {google && (
          <Circle
            center={center}
            radius={km ? km : 1500}
            map={mapRef.current}
            options={{
              fillColor: "#696fff",
              fillOpacity: 0.2,
              strokeColor: "#f8f2f2",
              strokeOpacity: 2,
              strokeWeight: 1,
            }}
          />
        )}
      </GoogleMap>
    </StyledMap>
  ) : (
    <Loader />
  );
}

const StyledMap = styled.div`
  width: 100%;
  height: calc(100vh);
`;

export default React.memo(Map);
