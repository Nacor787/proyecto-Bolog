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
export const CLOUDINARY_DASHBOARD_BG = 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801151/estaticos/gkob5gi0juc0g7ksdgbn.jpg';

// ── SERVICIOS (Cloudinary CDN) ─────────────────────────────────────────────
export const CLOUDINARY_SERVICES = {
  air: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801160/estaticos/xeen9h8ba5dkycmlirfx.jpg',
  sea: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801155/estaticos/rvrzuazduyg4tmbykcvo.jpg',
  land: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801159/estaticos/bpkfd5rtswpqkpueygrm.jpg',
  customs: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801158/estaticos/gjpvttmo3856dlvdx4gu.jpg',
  insurance: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801161/estaticos/u4pxzhbrypvnl78byxp0.jpg',
};

// ── CLIENTES (Cloudinary CDN) ──────────────────────────────────────────────
export const CLOUDINARY_CLIENTS = [
  { name: 'SOBOCE', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801154/estaticos/fzx5fxgjdym2qe0grjnl.png' },
  { name: 'PIL Andina', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801153/estaticos/vkzep870qlxl1gf3p23r.png' },
  { name: 'Droguería INTI', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801165/estaticos/xprenbar4vysaauoqdo4.png' },
  { name: 'COBOCE Cemento', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801152/estaticos/fmea5f2ahtjaof3mgita.png' },
  { name: 'Corimex', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801156/estaticos/exnt9etocdvfnxagnjp5.png' },
  { name: 'Autoelec', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801150/estaticos/cet0wodqyqlypklzswpb.png' },
  { name: 'Belmend', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801157/estaticos/rhugd1tmqa8xvmbcp6ru.png' },
  { name: 'Dinatex', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801162/estaticos/hof4pmrhri81j1gyflsy.png' },
  { name: 'Fair Play', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801153/estaticos/zlut3vojpjs0yrb7wpxo.png' },
  { name: 'Gigantes del Libro', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801166/estaticos/zhsudmvbcpct29xpji72.png' },
  { name: 'Interquímica', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801164/estaticos/obkt9apwtzupb0es6gmj.png' },
  { name: 'Perno Centro', logo: 'https://res.cloudinary.com/nk4ejsrr/image/upload/v1788801163/estaticos/iukmr1utphllpg68ylzn.png' },
];
