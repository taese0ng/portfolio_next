import { Children, useEffect, useRef, useState } from "react";

import { Card, ResponsiveImage } from "@/components/shared";
import { projectList } from "@/constants/projects";
import { Project as ProjectType } from "@/interfaces/projects";

import styles from "./Project.module.scss";
import classNames from "classnames";

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
  const [sideBarWidth, setSideBarWidth] = useState(200);

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
    <div className={styles.container} ref={containerRef}>
      <div className={styles.sideBarWrapper}>
        <div style={{ width: sideBarWidth }}>
          <div className={styles.sideBarCategory}>프로젝트</div>

          <ul>
            {Children.toArray(
              projectList.map((project) => (
                <li
                  className={classNames(styles.sideBarItem, {
                    [styles.isFocused]: selectedProject.id === project.id,
                  })}
                  onClick={() => handleClickTitle(project)}
                >
                  {project.title}
                </li>
              )),
            )}
          </ul>
        </div>

        <span className={styles.widthSetter} onMouseDown={handleMouseDown} />
      </div>

      <div className={styles.bodyWrapper} ref={bodyWrapperRef}>
        <div className={styles.header}>프로젝트</div>
        <div className={styles.body}>
          <ul className={styles.cardList} ref={cardListRef}>
            <li>
              <Card>
                <div className={classNames(styles.cardWrapper, styles.isRow)}>
                  <ResponsiveImage
                    className={styles.cardWrapperIcon}
                    src={selectedProject.icon}
                    alt="projectIcon"
                  />
                  <div>
                    <div className={styles.cardWrapperTitle}>
                      {selectedProject.title}
                      <div className={styles.cardWrapperSubTitle}>
                        {selectedProject.subTitle}
                      </div>
                    </div>

                    <div className={styles.cardWrapperDate}>
                      <ResponsiveImage
                        src={clockIcon}
                        alt="clock"
                        className={styles.cardWrapperDateIcon}
                      />
                      <div>{getDate(selectedProject)}</div>
                    </div>
                  </div>

                  <ul className={styles.cardWrapperLinks}>
                    {selectedProject.githubUrl && (
                      <li
                        className={styles.cardWrapperLink}
                        onClick={() =>
                          handleClickUrl(selectedProject.githubUrl)
                        }
                      >
                        <ResponsiveImage src={githubIcon} alt="githubBtn" />
                      </li>
                    )}
                    {selectedProject.url && (
                      <li
                        className={styles.cardWrapperLink}
                        onClick={() => handleClickUrl(selectedProject.url)}
                      >
                        구경하기
                      </li>
                    )}
                  </ul>
                </div>
              </Card>
            </li>

            <li>
              <Card>
                <div className={styles.cardWrapper}>
                  <div className={styles.cardWrapperSubTitle}>
                    Project Positions
                  </div>
                  <ul className={styles.cardWrapperTags}>
                    {Children.toArray(
                      selectedProject.positions.map((position) => (
                        <li className={styles.tag}>{position}</li>
                      )),
                    )}
                  </ul>
                </div>
              </Card>
            </li>

            <li>
              <Card>
                <div className={styles.cardWrapper}>
                  <div className={styles.cardWrapperTitle}>Skills</div>
                  <ul className={styles.cardWrapperTags}>
                    {Children.toArray(
                      selectedProject.skills.map((skill) => (
                        <li className={styles.tag}>{skill}</li>
                      )),
                    )}
                  </ul>
                </div>
              </Card>
            </li>

            <li>
              <Card>
                <div className={styles.cardWrapper}>
                  <div className={styles.cardWrapperTitle}>Explanation</div>
                  <ul className={styles.cardWrapperContents}>
                    {Children.toArray(
                      selectedProject.explanations.map((explanation) => (
                        <li>- {explanation}</li>
                      )),
                    )}
                  </ul>
                </div>
              </Card>
            </li>

            <li>
              <Card>
                <div className={styles.cardWrapper}>
                  <div className={styles.cardWrapperTitle}>Images</div>
                  <ul className={styles.cardWrapperImages}>
                    {Children.toArray(
                      selectedProject.imgs.map((img) => (
                        <li>
                          <ResponsiveImage src={img} alt={img} />
                        </li>
                      )),
                    )}
                  </ul>
                </div>
              </Card>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Project;
