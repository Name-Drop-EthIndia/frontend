"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import Banner from "./Banner";
import HeroLeftText from "./HeroLeftText";
import ImageBox from "./ImageBox";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useRouter } from "next/navigation";

const HeroOnboarding = () => {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const router = useRouter();
  const { disconnect } = useDisconnect();
  return (
    <div className="max-h-[391px] lg:max-h-[716px] relative w-full ">
      <div className="flex items-center container h-full max-h-[391px] overflow-hidden lg:max-h-[716px]">
        <HeroOnboardingImages />
        <div className="w-full hidden lg:visible max-h-[391px] lg:max-h-[716px] lg:flex lg:items-center lg:justify-center lg:flex-col">
          <HeroLeftText />
        </div>
      </div>
      <div
        className="w-full"
        style={{
          position: "absolute",
          bottom: -100,
        }}
      >
        <Banner />
      </div>
      <div
        style={{
          width: "min-content",
        }}
        className="p-[10px] mt-10 w-full lg:hidden  max-h-[391px] lg:max-h-[716px]"
      >
        <HeroLeftText
          text={isConnected ? "Disconnect" : "Connect"}
          heading={"Engage. Collect. Thrive."}
          desc={
            "Engage effortlessly, collect vibrant memories, and thrive in a community that values your unique experiences"
          }
          onClick={() => {
            if (isConnected) {
              disconnect();
            }
            connect();
            router.push("/profile");
          }}
        />
      </div>
    </div>
  );
};

export default HeroOnboarding;

const HeroOnboardingImages = () => {
  const imgs = [
    [
      {
        src: "/avatar1.png",
        grad: 1,
      },
      {
        src: "/avatar2.png",
        grad: 2,
      },
      {
        src: "/avatar3.png",
        grad: 3,
      },
      {
        src: "/avatar4.png",
        grad: 4,
      },
      {
        src: "/avatar14.png",
        grad: 14,
      },
      {
        src: "/avatar15.png",
        grad: 15,
      },
      {
        src: "/avatar12.png",
        grad: 12,
      },
      {
        src: "/avatar13.png",
        grad: 13,
      },
    ],
    [
      {
        src: "/avatar5.png",
        grad: 5,
      },
      {
        src: "/avatar6.png",
        grad: 6,
      },
      {
        src: "/avatar13.png",
        grad: 7,
      },
      {
        src: "/avatar8.png",
        grad: 8,
      },
      {
        src: "/avatar17.png",
        grad: 17,
      },
      {
        src: "/avatar18.png",
        grad: 18,
      },
      {
        src: "/avatar14.png",
        grad: 14,
      },
      {
        src: "/avatar10.png",
        grad: 10,
      },
    ],
    [
      {
        src: "/avatar9.png",
        grad: 9,
      },
      {
        src: "/avatar10.png",
        grad: 10,
      },
      {
        src: "/avatar11.png",
        grad: 11,
      },
      {
        src: "/avatar12.png",
        grad: 12,
      },
      {
        src: "/avatar1.png",
        grad: 1,
      },
      {
        src: "/avatar16.png",
        grad: 16,
      },
      {
        src: "/avatar2.png",
        grad: 2,
      },
      {
        src: "/avatar3.png",
        grad: 3,
      },
    ],
  ];
  return (
    <>
      <div
        className="frc gap-3 md:gap-5 md:max-w-[550px]  rotate-[8.7deg] sm:translate-x-0 -translate-x-[20%]"
        style={
          {
            //   transform: "rotate(8.609deg) ",
          }
        }
      >
        {imgs.map((item, i) => (
          <div
            key={i}
            className={`fcc gap-3 md:gap-5 ${
              i % 2 == 0 ? "heroImgLeft" : "heroImgRight"
            }`}
            style={{
              transform: "",
            }}
          >
            {item.map((img, index) => (
              <ImageBox
                {...img}
                key={index}
                className={` h-[219px] w-[168px] sm:h-[250px] sm:w-[250px] lg:h-auto lg:w-auto `}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
