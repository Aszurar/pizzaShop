import { Link, LinkProps, useLocation } from 'react-router-dom'

type NavLinkProps = LinkProps

export function NavLink(props: Readonly<NavLinkProps>) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className={`flex items-center gap-1.5 text-sm text-muted-foreground 
        hover:text-foreground 
        data-[current=true]:font-medium 
        data-[current=true]:text-foreground`}
      {...props}
    />
  )
}
