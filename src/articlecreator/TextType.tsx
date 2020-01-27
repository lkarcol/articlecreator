import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import EditPanel from './EditPanel';
import { Textarea, Input } from '@m2stack/ui.onestino';
import { Actions } from './';

interface Props {
    id: number;
    typename: string;
    dispatch: React.Dispatch<Actions>;
    DnD: any;
    content: any;
}

const StyledTexttype = styled.div`
    display:flex;
    flex-direction:column;
    margin-bottom:42px;
`;

const CreditType = styled.div`
    border: 1px solid #d1d3d6;
    padding:20px;
`;

const TextType: StatelessComponent<Props> = ({ id, typename, dispatch, content, DnD }) => {
    return (
        <StyledTexttype>
            <EditPanel
                id={id}
                typename={typename}
                onTrashClick={() => dispatch({ type: "onDeleteContentBox", boxId: id })}
                DnD={DnD}
            />
            <div
                id={id.toString()}
                onDragOver={DnD.onDragOver}
                onDragLeave={DnD.onDragLeave}
                onDrop={DnD.onDrop}
            >
                {
                    typename === "Credit" ? (
                        <CreditType>
                            <Input
                                label="Type of credit"
                                style={{ height: "41px", marginBottom: "18px" }}
                                value={content.type}
                                onChange={(type) => dispatch({ type: "onChangeCredit", box: { id, type, name: null } })}
                            />
                            <Input
                                label="Name"
                                style={{ height: "41px" }}
                                value={content.name}
                                onChange={(name) => dispatch({ type: "onChangeCredit", box: { id, name, type: null } })}
                            />
                        </CreditType>
                    ) : (
                            <Textarea
                                style={{ height: "108px" }}
                                value={content}
                                onChange={(text) => dispatch({ type: "onChangeText", box: { id, text } })}
                            />
                        )
                }
            </div>
        </StyledTexttype>
    );
};

export default TextType;
