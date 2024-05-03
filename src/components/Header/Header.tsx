import Logo from '../Logo/Logo'
import HeaderEmployee from './HeaderEmployee'

const Header = () => {
  return (
    <header className="z-10 bg-violet-50 shadow-lg">
      <div className="container mx-auto px-3 py-2">
        <nav className="flex items-end justify-between sm:items-center">
          <Logo />
          <HeaderEmployee />
        </nav>
      </div>
    </header>
  )
}

export default Header
