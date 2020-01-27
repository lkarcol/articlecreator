import React, { StatelessComponent } from 'react';
import styled from 'styled-components';

import { IconButton, Text } from '@m2stack/ui.onestino';

const StyledPanel = styled.div`
    margin-bottom: 7px;
    display: flex;
    justify-content: space-between;
    position:relative;
`;

const TypeName = styled.div``;

interface Props {
    id: number;
    typename: string;
    onTrashClick: () => void;
    DnD: any;
}

const EditPanel: StatelessComponent<Props> = ({ id, typename, onTrashClick, DnD }) => {

    const onDragStart = (ev) => {
        DnD.onDragStart(ev, id);
    }

    return (
        <StyledPanel>
            <TypeName>
                <Text
                    text={typename}
                    style={{
                        font: "medium",
                        color: "tag",
                        fontSize: "16px",
                        letterSpacing: "1px",
                        lineHeight: "20px",
                    }}
                />
            </TypeName>
            <img
                src={`${process.env.PUBLIC_URL}/drag.png`}
                style={{ position: "absolute", left: "48.5%" }}
                onDragStart={onDragStart}
                draggable={true}
            />
            <IconButton icon="Trash" onClick={onTrashClick} />
        </StyledPanel>
    );
};

export default EditPanel;