/**
 * Cloudinary CDN Asset Helper
 * Cloud Name: oyusqpnf
 * Permite optimizar automáticamente formato (WebP/AVIF) y compresión (q_auto).
 */

export const CLOUDINARY_CLOUD_NAME = 'oyusqpnf';
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Genera una URL de Cloudinary con optimización automática.
 * @param {string} publicPath Ruta o Public ID del archivo en Cloudinary
 * @param {object} options Opciones de transformación (width, quality, format)
 * @returns {string} URL CDN de Cloudinary
 */
export function getCloudinaryUrl(publicPath, options = {}) {
  if (!publicPath) return '';
  if (publicPath.startsWith('http')) {
    if (publicPath.includes('/image/upload/') && !publicPath.includes('/f_auto')) {
      return publicPath.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
    }
    return publicPath;
  }

  const { quality = 'auto', format = 'auto', width } = options;
  const transforms = [`f_${format}`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);

  const cleanPath = publicPath.startsWith('/') ? publicPath.slice(1) : publicPath;
  return `${CLOUDINARY_BASE_URL}/${transforms.join(',')}/${cleanPath}`;
}

// ── DASHBOARD (Cloudinary CDN) ─────────────────────────────────────────────
export const CLOUDINARY_DASHBOARD_BG = 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1787075401/dashboard.jpg';

// ── SERVICIOS (Cloudinary CDN) ─────────────────────────────────────────────
export const CLOUDINARY_SERVICES = {
  air: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997023/avion.jpg',
  sea: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997023/barco.jpg',
  land: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997023/camion.jpg',
  customs: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997023/gestion.jpg',
  insurance: 'https://res.cloudinary.com/oyusqpnf/image/upload/v1787007667/seguro_internacional_noticias.jpg',
};

// ── CLIENTES (Cloudinary CDN) ──────────────────────────────────────────────
export const CLOUDINARY_CLIENTS = [
  { name: 'SOBOCE', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/soboce.jpg' },
  { name: 'PIL Andina', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/pil.jpg' },
  { name: 'Droguería INTI', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/inti.jpg' },
  { name: 'COBOCE Cemento', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/coboce_cemento.jpg' },
  { name: 'Corimex', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/corimex.jpg' },
  { name: 'Autoelec', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/autoelec.jpg' },
  { name: 'Belmend', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/belmend.jpg' },
  { name: 'Dinatex', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/dinatex.jpg' },
  { name: 'Fair Play', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/fairplair.jpg' },
  { name: 'Gigantes del Libro', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/gigantes_del_libro.jpg' },
  { name: 'Interquímica', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/interquimica.jpg' },
  { name: 'Perno Centro', logo: 'https://res.cloudinary.com/oyusqpnf/image/upload/f_auto,q_auto/v1786997255/perno_centro.jpg' },
];
