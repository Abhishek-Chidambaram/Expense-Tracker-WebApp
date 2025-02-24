import React from "react";
import styled from "styled-components";

function Button({ name, icon, onClick, bg = "var(--color-primary)", bPad = "10px 20px", color = "#fff", bRad = "5px" }) {
    return (
        <ButtonStyled bg={bg} bPad={bPad} color={color} bRad={bRad} onClick={onClick}>
            {icon}
            {name}
        </ButtonStyled>
    );
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    background: ${(props) => props.bg};
    padding: ${props => props.$bPad || "0.5rem 1rem"};
    color: ${(props) => props.color};
    border-radius: ${props => props.$bRad || "0.3rem"};

    &:hover {
        opacity: 0.8;
    }
`;

export default Button;
