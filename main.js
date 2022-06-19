const { app, Tray, Menu, Notification, nativeImage } = require("electron");
const AutoLaunch = require("auto-launch");
const path = require("path");

let autoLaunch = new AutoLaunch({
  name: "Your app name goes here",
  // path: app.getPath("exe"),
});

autoLaunch.isEnabled().then((isEnabled) => {
  if (!isEnabled) autoLaunch.enable();
});

const NOTIFICATION_TITLE = "Basic Notification";
const NOTIFICATION_BODY = "Notification from the Main process";

function showNotification() {
  new Notification({
    urgency: "critical",
    icon: nativeImage.createFromPath("./icon.png"),
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show();
}

let tray;

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath("./icon.png");
  tray = new Tray(icon);

  // note: your contextMenu, Tooltip and Title code will go here!
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Notification",
      type: "normal",
      click: (event) => {
        showNotification();
      },
    },
    {
      label: "Exit",
      type: "normal",
      click: (event) => {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  tray.setToolTip("This is my application");
  tray.setTitle("This is my title");
});
