import {useLinking} from '@react-navigation/native';

export default function (containerRef) {
  return useLinking(containerRef, {
    prefixes: ['/'],
    config: {
      Root: {
        path: 'root',
        screens: {
          Login: 'login',
          Dashboard: 'dashboard',
        },
      },
    },
  });
}
