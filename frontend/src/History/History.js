import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../Context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext();
    const history = transactionHistory();

    return (
        <HistoryStyled>
            {history.length > 0 ? (
                history.map((item) => {
                    const { _id, title, amount, type } = item;
                    return (
                        <div key={_id} className="history-item">
                            <p style={{ 
                                color: type === 'expense' ? 'var(--color-red)' : 'var(--color-green)',
                                fontWeight: '500'
                            }}>
                                {title}
                            </p>
                            <p style={{ 
                                color: type === 'expense' ? 'var(--color-red)' : 'var(--color-green)',
                                fontWeight: '600'
                            }}>
                                {type === 'expense' ? `-$${amount ?? 0}` : `+$${amount ?? 0}`}
                            </p>
                        </div>
                    );
                })
            ) : (
                <p className="no-history">No recent transactions.</p>
            )}
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .history-item {
        background: ${props => props.theme.colors.white};
        border: 2px solid rgba(115, 101, 240, 0.1);
        box-shadow: ${props => props.theme.shadows.sm};
        padding: 1rem;
        border-radius: ${props => props.theme.borderRadius.md};
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: ${props => props.theme.transitions.default};

        &:hover {
            transform: translateX(5px);
            box-shadow: ${props => props.theme.shadows.md};
        }
    }

    .no-history {
        text-align: center;
        color: ${props => props.theme.colors.textSecondary};
        font-style: italic;
    }
`;

export default History;
