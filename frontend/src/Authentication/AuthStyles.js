import styled from 'styled-components';

export const AuthStyled = styled.div`
    background: rgba(255, 255, 255, 0.1);
    padding: 3rem;
    border-radius: 1rem;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    
    h2 {
        color: white;
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        input {
            padding: 1rem;
            border: none;
            border-radius: 0.5rem;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 1rem;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        button {
            background: #e74c3c;
            color: white;
            padding: 1rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;

            &:hover {
                background: #c0392b;
            }
        }
    }

    .error {
        color: #e74c3c;
        text-align: center;
        margin-top: 1rem;
    }

    .signup-link, .login-link {
        text-align: center;
        margin-top: 1.5rem;
        color: white;

        a {
            color: #e74c3c;
            text-decoration: none;
            margin-left: 0.5rem;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`; 