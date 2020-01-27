import React, { StatelessComponent } from 'react';
import styled from 'styled-components';
import EditPanel from './EditPanel';
import { Actions } from './';

import { Dropzone, IconButton } from '@m2stack/ui.onestino';

interface Props {
    id: number;
    typename: string;
    dispatch: React.Dispatch<Actions>;
    content: any[];
    DnD: any;
}

const StyledGalleryType = styled.div`
    display:flex;
    flex-direction:column;
    margin-bottom:42px;
`;

const ImagesBox = styled.div`
    border: 1px solid #d1d3d6;
    padding:20px;
    display: flex;
    justify-content: space-between;
`;

const DropZoneCfg = {
    text: "Upload your  image",
    width: 227,
    height: 298,
}

const DroppedImageContainer = styled.div<{ fullWidth: boolean }>`
    position:relative;
    max-width:${props => props.fullWidth ? "100%" : "calc( 50% - 10px)"};
    max-height: ${props => props.fullWidth ? "100%" : "310px"};
`;

const DroppedImage = styled.img`
    width:100%;
    height: 100%;
    object-fit: contain;
`;

const PositionChanger = styled.div`
    position:absolute;
    width:176px;
    height:40px;
    background-color: #ffffff;
    padding:8px;
    top:121px;
    left: calc((100% - 192px)/2);
    display: flex;
    justify-content: space-between;

    & > div {
        height:40px;
        background-color: #d1d3d6;
        cursor:pointer;
    }

`;

const DeleteImage = styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
`;

const GalleryType: StatelessComponent<Props> = ({ id, typename, dispatch, content, DnD }) => {
    return (
        <StyledGalleryType>
            <EditPanel
                id={id}
                typename={typename}
                onTrashClick={() => dispatch({ type: "onDeleteContentBox", boxId: id })}
                DnD={DnD}
            />
            <ImagesBox
                id={id.toString()}
                onDragOver={DnD.onDragOver}
                onDragLeave={DnD.onDragLeave}
                onDrop={DnD.onDrop}
            >
                {
                    content.map((c, positionKey) => {
                        return c === null ? (
                            <Dropzone
                                key={positionKey}
                                text={DropZoneCfg.text}
                                onFileDrop={(image) => dispatch({ type: "onDropGalleryImage", box: { image, id, position: positionKey } })}
                                width={DropZoneCfg.width}
                                height={DropZoneCfg.height}
                            />
                        ) : (
                                <DroppedImageContainer fullWidth={content.length === 1} >
                                    <DroppedImage src={c.thumbnail} draggable={false} />
                                    <DeleteImage>
                                        <IconButton
                                            icon="Close"
                                            onClick={() => dispatch({
                                                type: "onDeleteImageFromBox",
                                                box: { id, position: positionKey },
                                            })}
                                        />
                                    </DeleteImage>
                                    <PositionChanger>
                                        <div
                                            onClick={() => dispatch({ type: "onSwapImagePosition", box: { id, position: 0 } })}
                                            style={{
                                                width: "40px",
                                                backgroundColor: 0 === positionKey && 1 !== content.length && "#86ea58",
                                            }}
                                        />
                                        <div
                                            onClick={() => dispatch({ type: "onSwapImagePosition", box: { id, position: 1 } })}
                                            style={{
                                                width: "40px",
                                                backgroundColor: 1 === positionKey && 1 !== content.length && "#86ea58",
                                            }}
                                        />
                                        <div
                                            onClick={() => dispatch({ type: "onImageToFullWidthGallery", boxId: id })}
                                            style={{
                                                width: "80px",
                                                backgroundColor: 1 === content.length && "#86ea58",
                                            }}
                                        />
                                    </PositionChanger>
                                </DroppedImageContainer>
                            )
                    })
                }
            </ImagesBox>
        </StyledGalleryType>
    );
};

export default React.memo(GalleryType);