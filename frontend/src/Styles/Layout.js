import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const InnerLayout = styled.div`
    width: 100%;
    padding: 2rem;
    background: #FCF6F9;
    border-radius: 1rem;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
`;
