import HomeButton from "./HomeButton";

const HeroLeftText = ({ heading, desc, onClick, text }) => {
  return (
    <>
      <div>
        <h1>
          {heading || (
            <>
              Connect.
              <br /> Collect.
              <br /> Captivate.
              <br />
            </>
          )}
        </h1>
        <p className="mt-5">
          {desc ||
            "Circle : Where Connections Become Unforgettable Experiences"}
        </p>
        <HomeButton text={text} onClick={onClick} />
      </div>
    </>
  );
};

export default HeroLeftText;
