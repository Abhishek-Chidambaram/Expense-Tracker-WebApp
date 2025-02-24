import React from 'react';
import styled, { css } from "styled-components";

function Orb() {
    const { width, height } = useWindowSize();
    console.log(width, height);

    return <OrbStyled $width={width} $height={height} />;
}

// ✅ Define keyframes properly inside a CSS helper
const moveOrb = (width, height) => css`
    @keyframes moveOrb {
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(${width}px, ${height}px);
        }
        100% {
            transform: translate(0, 0);
        }
    }
`;

// ✅ Use $prop to prevent passing unknown props to <div>
const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-left: -37vh;
    margin-top: -37vh;
    background: linear-gradient(180deg, #ffcc5c 10%, #ff6f69 100%);
    filter: blur(450px);
    animation: ${(props) => moveOrb(props.$width, props.$height)} 15s alternate linear infinite;
`;

export default Orb;
