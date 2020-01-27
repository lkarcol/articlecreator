import React from 'react';
import styled from 'styled-components';

const StyledGallery = styled.div`
    width:100%;
    justify-content: space-between;
    display: flex;
    margin-bottom:64px;
`;

const Image = styled.img`
    object-fit: cover;
    height: 100%;
`;

const Blank = styled.div`
    width: 100%;
`;

const Gallery = ({ content }) => {
    return (
        <StyledGallery>
            {
                content.length === 2 ? (
                    content.map((image) => {
                        return image !== null ? <Image src={image.thumbnail} style={{ width: "460px" }} /> : <Blank />
                    })
                ) : (
                        <Image src={content[0].thumbnail} style={{ maxWidth: "100%" }} />
                    )
            }
        </StyledGallery>
    );
};

export default Gallery;