import React, { useEffect, useState } from "react";

const withClientSideRendering = (Component) => {
  const ClientSideRenderedComponent = (props) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
      return () => setIsMounted(false);
    }, []);

    if (!isMounted) {
      return null;
    }

    return <Component {...props} />;
  };

  return ClientSideRenderedComponent;
};

export default withClientSideRendering;
