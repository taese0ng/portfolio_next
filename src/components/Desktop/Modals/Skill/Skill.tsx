import { Children } from "react";

import { skillList } from "@/constants/skills";
import { ResponsiveImage } from "@/components/shared";
import styled from "@emotion/styled";

function Skill() {
  return (
    <Container>
      <Skills>
        {Children.toArray(
          skillList.map((skill) => (
            <Item>
              <ItemImage src={skill.src} alt={skill.title} />
              <ItemTitle>{skill.title}</ItemTitle>
            </Item>
          )),
        )}
      </Skills>
    </Container>
  );
}

export default Skill;

const Container = styled.div`
  background-color: var(--gray-20);
  height: 100%;
`;

const Skills = styled.ul`
  padding: 0 100px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 100px;
`;

const Item = styled.li`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemImage = styled(ResponsiveImage)`
  border-radius: 10px;
  height: 100px;

  img {
    width: unset !important;
  }
`;

const ItemTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 15px;
`;
