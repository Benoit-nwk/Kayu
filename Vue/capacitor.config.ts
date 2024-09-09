import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'kayu.app',
  appName: 'kayu-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
