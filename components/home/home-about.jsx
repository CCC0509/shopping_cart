"use client";

import { useEffect, useRef, useState } from "react";

import AboutCard from "../ui-elements/about-card";
import { useFn } from "@/context/cart-data-context";
import { LeftArrow, RightArrow } from "../ui-elements/arrow";

import style from "./home-about.module.css";

const aboutData = [
  {
    id: 1,
    title: "我們的堅持",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut assumenda, obcaecati optio rem aut dolores ratione neque nihil explicabo soluta!",
  },
  {
    id: 2,
    title: "為什麼選擇我們",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur saepe unde illum voluptates corporis corrupti ex omnis consectetur sapiente ipsum.",
  },
  {
    id: 3,
    title: "Lorem",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, quas?",
  },
  {
    id: 4,
    title: "Lorem",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, quas?",
  },
];

const HomeAbout = (props) => {
  const [titlePosition, setTitlePosition] = useState(-200);
  const [arrowPosition, setArrowPosition] = useState(200);
  const [aboutIndex, setAboutIndex] = useState(0);
  const { scale, scrollPosition } = useFn();
  const aboutTitle = useRef();

  const prevAboutHandler = () => {
    if (aboutData.length > aboutIndex && aboutIndex !== 0) {
      setAboutIndex((prev) => prev - 1);
    }
  };

  const nextAboutHandler = () => {
    if (aboutData.length - 1 > aboutIndex > 0) {
      setAboutIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (aboutTitle.current) {
      const titleCurrent = scale(scrollPosition, 0, 80, -200, 0);
      setTitlePosition(titleCurrent);
    }
  }, [scrollPosition]);

  useEffect(() => {
    setArrowPosition(window.innerHeight > 645 ? window.innerHeight - 445 : 200);
    const onResize = () => {
      if (window.innerHeight < 824) {
        setArrowPosition(
          window.innerHeight > 645 ? window.innerHeight - 445 : 200
        );
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className={style.about_container}>
      <h2
        ref={aboutTitle}
        style={{
          transform: `translateY(${titlePosition <= 0 ? titlePosition : "0"}%)`,
        }}
        className={style.about_title}
      >
        關於我們
      </h2>
      <div className={style.about_list_container}>
        <LeftArrow
          style={{
            transform: `translate(-1rem,calc(${arrowPosition}px - 2rem))`,
          }}
          className={`${style.left_arrow} ${
            aboutIndex === 0 ? style.arrow_disabled : ""
          }`}
          onClick={prevAboutHandler}
        />
        <RightArrow
          style={{
            transform: `translate(calc(300px - 1rem),calc(${arrowPosition}px - 2rem))`,
          }}
          className={`${style.right_arrow}  ${
            aboutIndex === aboutData.length - 1 ? style.arrow_disabled : ""
          }`}
          onClick={nextAboutHandler}
        />

        {aboutData.map((d, ind) => (
          <AboutCard
            key={d.id}
            ind={ind}
            slideIn={style.about_card_slide_in}
            dragList={style.about_card_drag_list}
            aboutIndex={aboutIndex}
          >
            <h3>{d.title}</h3>
            <p>{d.content}</p>
          </AboutCard>
        ))}
      </div>
    </section>
  );
};

export default HomeAbout;
