const pkg = require('./package.json');

const config = {
  "appId": "ru.bast.skudsprutkeymanager",
  "productName": "SKUD SPRUT Key manager",
  "copyright": "Copyright @2023 Bastion",
  "buildVersion": "1.0.3",
  "directories": {
    "buildResources": "resources"
  },
  "files": [
    "assets/**/*",
    "build/**/*",
    "capacitor.config.*",
    "app/**/*"
  ],
  "publish": null,
  "nsis": {
    "allowElevation": true,
    "oneClick": false,
    "deleteAppDataOnUninstall": true,
    "allowToChangeInstallationDirectory": true,
    "menuCategory": "SKUD SPRUT",
    "artifactName": `skud_sprut_key_manager_setup_${pkg.version}.exe`
  },
  "win": {
    "target": "nsis",
    "icon": "assets/appIcon.ico"
  },
  "linux": {
    "category": "Education",
    "artifactName": `skud_sprut_key_manager_${pkg.version}.appImage`,
    "target": "AppImage",
    "description": "Bastion SKUD SPRUT Key manager"
  },
  "mac": {
    "category": "ru.bast.skudsprutkeymanager",
    "target": "dmg"
  }
}

module.exports = config;
