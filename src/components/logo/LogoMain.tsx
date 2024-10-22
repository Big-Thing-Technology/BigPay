// material-ui

import { useRouter } from 'next/navigation'

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

export default function LogoMain() {
  const router = useRouter()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '50px',
        maxWidth: '170px',
        overflow: 'hidden',
      }}
    >
      {/* <Image src="logo/4.svg" alt="icon logo" width="200" height="200" /> */}
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet="/logo/8-resized.svg" />
        <img
          onClick={() => router.push('/')}
          src="/logo/4-resized.svg"
          alt="logo"
          style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </picture>
    </div>
  )
}
