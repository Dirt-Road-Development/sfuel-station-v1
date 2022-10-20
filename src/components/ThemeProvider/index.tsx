import { ThemeContext } from '../../context/ThemeContext';
import useCustomTheme from '../../hooks/theme';


export default function ThemeProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
    
    const [isDarkTheme, setIsDarkTheme] = useCustomTheme();

    const toggleTheme = () : void => {
        setIsDarkTheme(!isDarkTheme);
    }

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );

}
