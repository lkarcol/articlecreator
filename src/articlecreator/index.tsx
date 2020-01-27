import React, { useState, useReducer } from 'react';
import styled from 'styled-components';

import TextType from './TextType';
import GalleryType from './GalleryType';
import ArticlePreview from './preview';
import { Input, Button, Textarea, Dropzone, Link } from '@m2stack/ui.onestino';

type ContentTypes = "Text" | "Gallery" | "Qoute" | "Credit";


interface ContentType {
    id: number;
    type: ContentTypes;
    content: any;
}

interface State {
    title: string;
    description: string;
    coverImage: any;
    articleContent: ContentType[];
}

export type Actions = (
    { type: "onChangeTitle", title: string } |
    { type: "onChangeDescription", desc: string } |
    { type: "onDropCoverImage", image: any } |
    { type: "onChangeText", box: { id: number, text: number } } |
    { type: "onChangeCredit", box: { id: number, name: string, type: Omit<ContentTypes, 'Gallery'> } } |
    { type: "addContent", box: ContentTypes } |
    { type: "onDropGalleryImage", box: { image: any, id: number, position: number } } |
    { type: "onDeleteContentBox", boxId: number } |
    { type: "onDeleteImageFromBox", box: { id: number, position: number } } |
    { type: "onSwapImagePosition", box: { id: number, position: number } } |
    { type: "onImageToFullWidthGallery", boxId: number } |
    { type: "swapAfterDrop", boxes: { targetId: number, selectedId: number } }
);

const initialState: State = {
    title: "",
    description: "",
    coverImage: null,
    articleContent: [],
};

const StyledArticleCreator = styled.div`
    max-width:513px;
    align-self: center;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const StyledButtonsPanel = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top:"40px"px;
    margin-bottom:56px;
`;

const StyledMain = styled.div`
    margin-bottom:42px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const CoverImage = styled.img`
    object-fit: cover;
    height: 272px;
`;

function articleReducer(state: State, action: Actions): State {
    switch (action.type) {
        case 'onChangeTitle':
            return onChangeTitle(state, action.title);
        case 'onChangeDescription':
            return onChangeDescription(state, action.desc);
        case 'onDropCoverImage':
            return onDropCoverImage(state, action.image);
        case 'onChangeText':
            return onChangeText(state, action.box);
        case 'onChangeCredit':
            return onChangeCredit(state, action.box);
        case 'addContent':
            return addContent(state, action.box);
        case 'onDropGalleryImage':
            return onDropGalleryImage(state, action.box);
        case 'onDeleteContentBox':
            return onDeleteContentBox(state, action.boxId);
        case 'onDeleteImageFromBox':
            return onDeleteImageFromBox(state, action.box);
        case 'onSwapImagePosition':
            return onSwapImagePosition(state, action.box);
        case 'onImageToFullWidthGallery':
            return onImageToFullWidthGallery(state, action.boxId);
        case 'swapAfterDrop':
            return swapAfterDrop(state, action.boxes);
        default:
            return state;
    }
}

// Return max content ID from articleContent array
function findMaxContentId(content) {
    return Math.max(...content.map(o => o.id), 0);
}

function swapAfterDrop(state: State, data: any): State {
    const { targetId, selectedId } = data;
    const articleContent = [...state.articleContent];

    const targetIndex = articleContent.findIndex((c => c.id === targetId));
    const selecteIndex = articleContent.findIndex((c => c.id === selectedId));

    [articleContent[targetIndex], articleContent[selecteIndex]] = [articleContent[selecteIndex], articleContent[targetIndex]];

    return {
        ...state,
        articleContent,
    };

}

function onImageToFullWidthGallery(state: State, boxId: any): State {
    const articleContent = [...state.articleContent];
    const contentObject = articleContent.find((c => c.id === boxId));

    const image = contentObject.content.find(c => c != null);
    contentObject.content[0] = image;
    contentObject.content.pop();

    return {
        ...state,
        articleContent,
    };
}

// Swap image in box after click on small  square icon
function onSwapImagePosition(state: State, data: any): State {
    const { id, position } = data;
    const articleContent = [...state.articleContent];

    const contentObject = articleContent.find((c => c.id === id));

    if (contentObject.content.length === 2) {
        [contentObject.content[0], contentObject.content[1]] = [contentObject.content[1], contentObject.content[0]];
    } else {
        contentObject.content[position] = contentObject.content[0];
        contentObject.content[Math.abs(position - 1)] = null;
    }

    return {
        ...state,
        articleContent,
    };
}

// Delete image from "Gallery" after clik on "X"
function onDeleteImageFromBox(state: State, data: any): State {
    const { id, position } = data;
    const articleContent = [...state.articleContent];

    const contentObject = articleContent.find((c => c.id === id));
    contentObject.content[position] = null;

    return {
        ...state,
        articleContent,
    };
}

// Delete Gallery or Text, ... boxe after click on Trash icon
function onDeleteContentBox(state: State, boxId: number): State {
    return { ...state, articleContent: state.articleContent.filter((c) => c.id !== boxId) };
}

function onChangeTitle(state: State, title: string): State {
    return { ...state, title };
}

function onChangeDescription(state: State, description: string): State {
    return { ...state, description };
}

function onDropCoverImage(state: State, image: any): State {
    return { ...state, coverImage: image };
}

function onChangeText(state: State, data: any): State {
    const { id, text } = data;
    const newState = { ...state };

    const contentObject = newState.articleContent.find((c => c.id === id));
    contentObject.content = text;

    return newState;
}

function onChangeCredit(state: State, data: any): State {
    const { id, type, name } = data;
    const newState = { ...state };

    const contentObject = newState.articleContent.find((c => c.id === id));

    if (type === null) {
        contentObject.content.name = name;
    } else {
        contentObject.content.type = type;
    }

    return newState;
}


function onDropGalleryImage(state: State, data: any): State {

    const { id, image, position } = data;
    const newState = { ...state };

    const contentObject = newState.articleContent.find((c => c.id === id));

    contentObject.content[position] = image;

    return newState;
}

function addContent(state: State, type: ContentTypes): State {
    const newState = { ...state };

    const contentFormat = {
        Gallery: [null, null],
        Qoute: "",
        Text: "",
        Credit: { type: "", name: "" },
    };

    const contentType: ContentType = {
        id: findMaxContentId(newState.articleContent) + 1,
        type,
        content: contentFormat[type],
    };

    return { ...state, articleContent: [...state.articleContent, contentType] };
}

const buttonEvents: Array<{ buttonText: string; contentType: ContentTypes }> = [
    {
        buttonText: "Add image",
        contentType: "Gallery",
    },
    {
        buttonText: "Add text",
        contentType: "Text",
    },
    {
        buttonText: "Add qoute",
        contentType: "Qoute",
    },
    {
        buttonText: "Add credit",
        contentType: "Credit",
    }
];

const ArticleCreator = () => {

    const [articleState, dispatch] = useReducer(articleReducer, initialState);
    const [preview, setPreview] = useState(false);

    const shwowPreview = () => {
        return articleState.coverImage ? setPreview(true) : alert("Please add cover image");
    };

    // --------------------------------------------------------------------
    // ------------------------ Drag and Drop -----------------------------
    // --------------------------------------------------------------------

    const onDragStart = (ev, id) => {
        ev.dataTransfer.setData("text", id);
    };

    const onDragOver = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        ev.currentTarget.style.boxShadow = "#000000 0px 0px 10px 3px";
        ev.dataTransfer.dropEffect = "move";
    };

    const onDragLeave = ev => {
        ev.preventDefault();
        ev.stopPropagation();
        ev.currentTarget.style.boxShadow = "";
        ev.dataTransfer.dropEffect = "move";
    };

    const onDrop = (ev) => {

        ev.preventDefault();
        ev.stopPropagation();

        ev.currentTarget.style.boxShadow = "";

        const target = parseInt(ev.currentTarget.id, 10);
        const selected = parseInt(ev.dataTransfer.getData("text"), 10);

        dispatch({ type: 'swapAfterDrop', boxes: { targetId: target, selectedId: selected } });
    };

    const DnD = {
        onDragStart,
        onDragOver,
        onDragLeave,
        onDrop,
    };

    const renderContentTypeBoxes = () => {
        return articleState.articleContent.map((content) => {

            const TypeCompoenent = content.type === "Gallery" ? GalleryType : TextType;

            return (
                <TypeCompoenent
                    id={content.id}
                    typename={content.type}
                    content={content.content}
                    dispatch={dispatch}
                    DnD={DnD}
                />
            );

        });
    };

    return preview ? (
        <ArticlePreview {...articleState} onBackClick={() => setPreview(false)} />
    ) : (
            <StyledArticleCreator>
                <StyledMain>
                    <Button
                        value="Publish story"
                        style={{ marginBottom: "40px", width: "200px", alignSelf: "center" }}
                        type="actionSmall"
                    />
                    <Input
                        type="text"
                        label="Story title"
                        style={{ marginBottom: "40px" }}
                        value={articleState.title}
                        onChange={(title) => dispatch({ type: "onChangeTitle", title })}
                    />
                    <Textarea
                        label="Story short description"
                        style={{ marginBottom: "40px", height: "108px" }}
                        value={articleState.description}
                        onChange={(description) => dispatch({ type: "onChangeDescription", desc: description })}
                    />

                    {
                        articleState.coverImage === null ? (
                            <Dropzone
                                text="Upload your cover image"
                                onFileDrop={(image) => dispatch({ type: "onDropCoverImage", image })}
                                height={273}
                            />
                        ) : (
                                <CoverImage src={articleState.coverImage.thumbnail} />
                            )
                    }

                </StyledMain>

                {
                    renderContentTypeBoxes()
                }

                <StyledButtonsPanel>
                    {
                        buttonEvents.map((event, key) =>
                            <Button
                                key={key}
                                value={event.buttonText}
                                type="small"
                                onClick={() => dispatch({ type: "addContent", box: event.contentType })}
                            />
                        )
                    }
                </StyledButtonsPanel>

                <Button
                    value="Publish story"
                    style={{ marginBottom: "40px", width: "200px", alignSelf: "center" }}
                    type="actionSmall"
                />

                <Link value="Preview" onClick={shwowPreview} style={{ alignSelf: "center" }} />

            </StyledArticleCreator>
        );
};

export default ArticleCreator;