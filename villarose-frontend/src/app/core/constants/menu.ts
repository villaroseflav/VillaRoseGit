import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            // { label: 'Nfts', route: '/dashboard/nfts' },
            { label: 'Graphics', route: '/dashboard/graphics' },
            { label: 'Data', route: '/dashboard/data' },
            { label: 'Rayonnement', route: '/dashboard/rayonnement' },
            // { label: 'Météo', route: '/dashboard/meteo' }
            { label: 'Vitii', route: '/dashboard/vitii' }
          ],
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/lock-closed.svg',
        //   label: 'Auth',
        //   route: '/auth',
        //   children: [
        //     { label: 'Sign up', route: '/auth/sign-up' },
        //     { label: 'Sign in', route: '/auth/sign-in' },
        //     { label: 'Forgot Password', route: '/auth/forgot-password' },
        //     { label: 'New Password', route: '/auth/new-password' },
        //     { label: 'Two Steps', route: '/auth/two-steps' },
        //   ],
        // },
      ],
    },
    {
      group: 'Collaboration',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Smart Plugs',
          route: '/plugs',
        },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        // {
        //   icon: 'assets/icons/heroicons/outline/cog.svg',
        //   label: 'Settings',
        //   route: '/config/settings',
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/bell.svg',
        //   label: 'Notifications',
        //   route: '/config/notifications',
        // }, // todo notification mail reglages
        {
          icon: 'assets/icons/heroicons/outline/esp.svg',
          label: 'Esp',
          route: '/config/esp',
        }
      ],
    },
  ];
}
