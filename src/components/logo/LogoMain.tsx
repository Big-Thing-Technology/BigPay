// material-ui

import Image from 'next/image'

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

export default function LogoMain() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '100px',
        overflow: 'hidden',
      }}
    >
      <Image src="logo/4.svg" alt="icon logo" width="300" height="200" />
    </div>
  )
}
