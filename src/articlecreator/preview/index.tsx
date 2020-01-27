import React from 'react';

import styled from 'styled-components';
import { Text, Link, Label, DateTime } from '@m2stack/ui.onestino';
import Gallery from './Gallery';
import ContentText from './ContentText';


const StyledArticle = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 940px;
    width: 100%;
    align-items: center;
    align-self: center;
`;

const CoverImage = styled.img`
    margin-top:112px;
    width: 100%;
    height: 500px;
    object-fit: cover;
    margin-bottom:64px;
`;

const Autor = styled.div`
    margin-bottom:12px;
    display: flex;
    align-items: center;
`;

const DateAndSharePanel = styled.div`
    margin-top:45px;
    display: flex;
    align-items: center;
`;

const ArticlePreview = ({ title, description, coverImage, articleContent, onBackClick }) => {

    const renderContent = () => {
        return articleContent.map((content, key) => {
            return content.type === "Gallery" ? (
                <Gallery key={key} {...content} />
            ) : (
                    <ContentText key={key} {...content} />
                );
        });
    }

    return (
        <StyledArticle>
            <Autor>
                <Text text="Jessica Ferguson" style={{ fontSize: "16px", lineHeight: "20px", font: "medium", marginRight: "27px", color: "tag" }} />
                <Label value="Curator" type="green" size="small" />
            </Autor>
            <Text text={title} style={{ fontSize: "32px", lineHeight: "40px", textAlign: "center", marginBottom: "25px", maxWidth: "727px" }} />
            <Text text={description} style={{ fontSize: "16px", lineHeight: "20px", font: "medium", color: "tag", textAlign: "center", maxWidth: "727px" }} />
            <DateAndSharePanel>
                <DateTime style={{ color: "text", fontSize: "18px", marginRight: "32px" }} />
                <Label value="Contributors" type="grey" />
                <Text text="Share: FB, TW" style={{ fontSize: "18px", lineHeight: "22px", font: "medium", marginLeft: "32px" }} />
            </DateAndSharePanel>
            <CoverImage src={coverImage.thumbnail} />
            {
                renderContent()
            }
            <Link value="Back" onClick={onBackClick} />
        </StyledArticle>
    );
};

export default ArticlePreview;