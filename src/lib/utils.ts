import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatRelative, isSameYear, format } from 'date-fns';
import { es } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCustomDate = (date: string | number | Date) => {
  const today = new Date();
  const target = new Date(date);
  const relativeDayRaw = formatRelative(target, today, { locale: es });
  const relativeDay = relativeDayRaw.split(' a las ')[0];

  const relativeDaysMap: Record<string, string> = {
    hoy: 'Hoy',
    mañana: 'Mañana',
    ayer: 'Ayer',
    sábado: 'Sábado',
    domingo: 'Domingo',
    lunes: 'Lunes',
    martes: 'Martes',
    miércoles: 'Miércoles',
    jueves: 'Jueves',
    viernes: 'Viernes',
  };

  if (relativeDaysMap[relativeDay.toLowerCase()])
    return relativeDaysMap[relativeDay.toLowerCase()];

  if (isSameYear(target, today)) {
    return format(target, 'dd MMM', { locale: es });
  } else {
    return format(target, 'dd MMM yyyy', { locale: es });
  }
};

export const downloadFile = async (url: string, fileName: string) => {
  try {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok)
      throw new Error(`Error al descargar el archivo: ${response.status}`);

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fileName || url.split('/').pop() || 'file';
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.log(`Error al descargar el archivo: ${error}`);
  }
};

export const copyToClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);

    return true;
  } catch (error) {
    console.error(`Error al copiar el enlace al portapapeles: ${error}`);
  }
};
