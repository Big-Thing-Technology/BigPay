// material-ui

import { useRouter } from 'next/navigation'

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoIconDark from 'assets/images/logo-icon-dark.svg';
 * import logoIcon from 'assets/images/logo-icon.svg';
 *
 */

// ==============================|| LOGO ICON SVG ||============================== //

export default function LogoIcon() {
  const router = useRouter()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* <Image src="logo/5.svg" alt="icon logo" width="70" height="70" /> */}
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet="/logo/8-resized.svg" />
        <img
          onClick={() => router.push('/')}
          src="/logo/5.svg"
          alt="logo"
          style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </picture>
    </div>
  )
}
