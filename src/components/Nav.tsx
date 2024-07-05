import Logo from "../ui/Logo"
import LogoutButton from "../auth/LogoutButton"

const Nav = () => {

    return <nav className="nav">
        <section className="nav__side">
            <Logo />
        </section>
        <section className="nav__side">
            <LogoutButton />
        </section>
    </nav>
}

export default Nav
