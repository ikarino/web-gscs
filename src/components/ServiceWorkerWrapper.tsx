// for PWA update
// https://felixgerschau.com/2020/01/27/cra-pwa-update-notification.html
import React, { FC, useEffect } from "react";
import { Snackbar, Button } from "@material-ui/core";
import * as serviceWorker from "../serviceWorker";

const ServiceWorkerWrapper: FC = () => {
  const [showReload, setShowReload] = React.useState(false);
  const [
    waitingWorker,
    setWaitingWorker
  ] = React.useState<ServiceWorker | null>(null);

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    window.location.reload(true);
  };

  return (
    <Snackbar
      open={showReload}
      message="新しいバージョンが利用可能です"
      onClick={reloadPage}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      action={
        <Button color="inherit" size="small" onClick={reloadPage}>
          Reload
        </Button>
      }
    />
  );
};

export default ServiceWorkerWrapper;
