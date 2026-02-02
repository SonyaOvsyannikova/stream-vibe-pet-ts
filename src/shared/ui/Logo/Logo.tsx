type LogoProps = {
  className?: string
}
const Logo = (props: LogoProps) => {
  const { className } = props
  return (
    <a className={className} href="/public">
      <img src="../public/LogoHeader.png" alt="Logo" loading="lazy" />
    </a>
  )
}

export default Logo
