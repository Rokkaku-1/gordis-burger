"""Rebuild the single served stylesheet after editing the existing CSS sources."""
from pathlib import Path
root = Path(__file__).resolve().parents[1] / 'dist'
files = ['styles.css', 'refinements.css', 'accessibility-motion.css', 'hero-polish.css',
         'responsive-balance.css', 'hero-direction.css', 'header-hero-final.css',
         'footer-closing.css', 'faq-polish.css', 'menu-carousel.css',
         'hero-desktop-balance.css', 'menu-ribbon-finish.css']
(root / 'site.css').write_text('\n'.join((root / name).read_text(encoding='utf-8')
                                        for name in files), encoding='utf-8')
