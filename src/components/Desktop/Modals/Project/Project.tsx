import { Children, useEffect, useRef, useState } from "react";

import { ResponsiveImage } from "@/components/shared";
import { projectList } from "@/constants/shared/projects";
import { Project as ProjectType } from "@/interfaces/projects";

import SideBar from "./SideBar";
import ContentsCard from "./ContentsCard";
import styled from "@emotion/styled";

const clockIcon = "/assets/icons/clock.webp";
const githubIcon = "/assets/icons/githubBtn.webp";

function Project() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardListRef = useRef<HTMLUListElement>(null);
  const bodyWrapperRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType>(
    projectList[0],
  );
  const [sideBarWidth, setSideBarWidth] = useState<number>(200);

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
    localStorage.setItem("project_sidebar_width", JSON.stringify(sideBarWidth));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isClicked && containerRef.current && bodyWrapperRef.current) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const tempSideBarWidth = e.pageX - containerLeft;

      if (tempSideBarWidth <= 100) {
        setSideBarWidth(100);
      } else if (tempSideBarWidth < bodyWrapperRef.current.clientWidth / 2) {
        setSideBarWidth(tempSideBarWidth);
      }
    }
  };

  const handleClickTitle = (project: ProjectType) => {
    cardListRef.current?.scroll({ top: 0, behavior: "smooth" });
    setSelectedProject(project);
  };

  const handleClickUrl = (url?: string) => {
    if (url) {
      window.open(url, "_target");
    }
  };

  const getDate = (project: ProjectType) => {
    const startAt = project.startAt;
    const endAt = project.endAt;
    const startYear = startAt.getFullYear();
    const startMonth = startAt.getMonth() + 1;
    const endYear = endAt.getFullYear();
    const endMonth = endAt.getMonth() + 1;
    const startDate = `${startYear}.${
      startMonth > 10 ? startMonth : `0${startMonth}`
    }`;
    const endDate = `${endYear}.${endMonth > 10 ? endMonth : `0${endMonth}`}`;

    return `${startDate} - ${endDate}`;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isClicked]);

  useEffect(() => {
    const localStorageWidth = localStorage.getItem("project_sidebar_width");
    const projectSideBarWidth = localStorageWidth
      ? JSON.parse(localStorageWidth)
      : 200;

    setSideBarWidth(projectSideBarWidth);
  }, []);

  return (
    <Container ref={containerRef}>
      <SideBar
        width={sideBarWidth}
        selectedProject={selectedProject}
        onClickTitle={handleClickTitle}
        onMouseDown={handleMouseDown}
      />

      <Wrapper ref={bodyWrapperRef}>
        <HeaderTitle>프로젝트</HeaderTitle>
        <Body>
          <CardList ref={cardListRef}>
            <ContentsCard isRow>
              <MainCardIcon src={selectedProject.icon} alt="projectIcon" />
              <div>
                <MainCardTitle>
                  {selectedProject.title}
                  <MainCardSubTitle>
                    {selectedProject.subTitle}
                  </MainCardSubTitle>
                </MainCardTitle>

                <Date>
                  <DateIcon src={clockIcon} alt="clock" />
                  <div>{getDate(selectedProject)}</div>
                </Date>
              </div>

              <Links>
                {selectedProject.githubUrl && (
                  <Link
                    onClick={() => handleClickUrl(selectedProject.githubUrl)}
                  >
                    <ResponsiveImage src={githubIcon} alt="githubBtn" />
                  </Link>
                )}
                {selectedProject.url && (
                  <Link onClick={() => handleClickUrl(selectedProject.url)}>
                    구경하기
                  </Link>
                )}
              </Links>
            </ContentsCard>

            <ContentsCard title="Project Positions">
              <Tags>
                {Children.toArray(
                  selectedProject.positions.map((position) => (
                    <Tag>{position}</Tag>
                  )),
                )}
              </Tags>
            </ContentsCard>

            <ContentsCard title="Skills">
              <Tags>
                {Children.toArray(
                  selectedProject.skills.map((skill) => <Tag>{skill}</Tag>),
                )}
              </Tags>
            </ContentsCard>

            <ContentsCard title="Explanation">
              <Contents>
                {Children.toArray(
                  selectedProject.explanations.map((explanation) => (
                    <li>- {explanation}</li>
                  )),
                )}
              </Contents>
            </ContentsCard>

            <ContentsCard title="Images">
              <Images>
                {Children.toArray(
                  selectedProject.imgs.map((img) => (
                    <li>
                      <ResponsiveImage src={img} alt={img} />
                    </li>
                  )),
                )}
              </Images>
            </ContentsCard>
          </CardList>
        </Body>
      </Wrapper>
    </Container>
  );
}

export default Project;

const Container = styled.div`
  display: flex;
  height: calc(100% + 30px);
`;

const Wrapper = styled.div`
  width: 100%;
`;

const HeaderTitle = styled.div`
  width: 100%;
  height: 30px;
  background-color: var(--gray-30);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  height: calc(100% - 30px);
  background-color: var(--gray-20);
`;

const CardList = styled.ul`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
`;

const MainCardIcon = styled(ResponsiveImage)`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-right: 15px;
`;

const MainCardTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const MainCardSubTitle = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

const Date = styled.div`
  color: var(--gray-70per);
  margin: 5px 0 10px 0;
  display: flex;
  align-items: center;
`;

const DateIcon = styled(ResponsiveImage)`
  width: 15px;
  height: 15px;
  margin-right: 4px;
`;

const Links = styled.ul`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Link = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid var(--black);
  overflow: hidden;
  cursor: pointer;
`;

const Tags = styled.ul`
  width: fit-content;
  display: flex;
  gap: 10px;
  white-space: nowrap;
  flex-wrap: wrap;
`;

const Tag = styled.li`
  font-weight: bold;
  background-color: var(--gray-10per);
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
`;

const Contents = styled.ul`
  background-color: var(--gray-10per);
  padding: 10px;
  border-radius: 5px;
  font-size: 17px;
  word-break: keep-all;
  line-height: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Images = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
