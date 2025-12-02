import { Box, Clock, Home } from 'lucide-react';

export const SIDEBAR_LINKS = [
  {
    title: 'Home',
    url: '/zerobox/home',
    icon: Home,
    isActive: true,
  },
  {
    title: 'Mi ZBox',
    url: '/zerobox/my-box',
    icon: Box,
  },
  {
    title: 'Actividad reciente',
    url: '/zerobox/recent',
    icon: Clock,
  },
] as const;

export const AI_OPTIONS = [
  { id: 'e-bgremove', label: 'Eliminar fondo' },
  { id: 'e-dropshadow', label: 'Sombra automática' },
  { id: 'e-retouch', label: 'Retoque' },
  { id: 'e-upscale', label: 'Mejorar resolución' },
] as const;
