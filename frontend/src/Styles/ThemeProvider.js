import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from './Theme';

export const ThemeProvider = ({ children }) => {
    return (
        <StyledThemeProvider theme={theme}>
            {children}
        </StyledThemeProvider>
    );
}; 