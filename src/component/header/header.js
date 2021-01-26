import './header.css'

export const Header = ({children}) => {
    return (
        <div className="header-container">
            {children}
        </div>
    )
}