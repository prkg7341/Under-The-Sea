import styled from "styled-components";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";

const settings = {
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
};

// styled-component
const Wrapper = styled.div`
  float: left;
`;
const Container = styled.div`
  overflow: hidden;
`;
const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
`;
const ImageContainer = styled.div`
  margin: 0 16px;
  padding: 1em;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 100%;
`;

export const TopSeller = () => {
  let url =
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
  const datas = [
    { rank: ["1", "2"], urls: [url, url] },
    { rank: ["3", "4"], urls: [url, url] },
    { rank: ["5", "6"], urls: [url, url] },
    { rank: ["7", "8"], urls: [url, url] },
  ];

  return (
    <>
      <h1>Top Sellers Component</h1>
      <h2>탑셀러 - 일반유저 (아티스트 아닌) 누적거래</h2>
      <Container>
        <StyledSlider {...settings}>
          {datas.map((data, index) => {
            return (
              <div key={index}>
                <Wrapper>
                  <NavLink to={`/profile/${data.rank[0]}`}>
                    <ImageContainer>
                      <h2>{data.rank[0]}</h2>
                      <Image
                        width="150"
                        src={data.urls[0]}
                        alt={data.rank[0]}
                      />
                    </ImageContainer>
                  </NavLink>
                  <NavLink to={`/profile/${data.rank[0]}`}>
                    <ImageContainer>
                      <h2>{data.rank[1]}</h2>
                      <Image
                        width="150"
                        src={data.urls[1]}
                        alt={data.rank[1]}
                      />
                    </ImageContainer>
                  </NavLink>
                </Wrapper>
              </div>
            );
          })}
        </StyledSlider>
      </Container>
    </>
  );
};
