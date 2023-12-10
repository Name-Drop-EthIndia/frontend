"use client";
import Image from "next/image";
import { useState } from "react";
import ChooseAvatar from "./ChooseAvatar";
import ImageBox from "./ImageBox";
import HomeButton from "./HomeButton";
import { NameDropContractABI } from "@/constants";
import { useAccount, useContractWrite } from "wagmi";
import lighthouse from "@lighthouse-web3/sdk";
import { sendNotification } from "./Graph";

const Form = () => {
  const [nickname, setNickname] = useState("");
  const [keywords, setKeywords] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedin] = useState("");
  const [telegram, setTelegram] = useState("");
  const [personal, setPersonal] = useState("");
  const [avatar, setAvatar] = useState("");
  const [grad, setGrad] = useState(1); // [1,18
  const grads = Array(18).fill(0);
  const [uri, setUri] = useState("");
  const uploadData = {
    nickname,
    keywords,
    twitter,
    linkedIn,
    telegram,
    personal,
    avatar,
    grad,
  };

  const { address } = useAccount();
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0xF831f7693d3F5997816eD4c809D1A41cFc860C1b", //contract address
    abi: NameDropContractABI,
    functionName: "createProfile",
    onError: (e) => {
      console.log("failed to create profile");
      alert("Failed to create profile");
    },
    // args: [],
  });
  const apiKey = process.env.LIGHTHOUSE_API;
  const uploadImage = async () => {
    const filePath = file;
    const uploadImage = await lighthouse.upload(filePath, apiKey);
    console.log("File uploaded to IPFS via Lighthouse:", uploadImage);
    return uploadImage;
  };

  const uploadMetadata = async () => {
    console.log(apiKey);

    const metadataResponse = await lighthouse.uploadText(
      "hello",
      "ad5d0cd5.fc185766bd8d4e519b55144909d344ea"
    );
    console.log("Metadata uploaded to IPFS via Lighthouse:", metadataResponse);
    return metadataResponse;
  };
  const handleSubmitForm = async () => {
    try {
      // send data to lighthouse
      const lhres = await uploadMetadata();
      // get uri
      console.log("lughthouse response", lhres);
      const uri = "ipfs://" + lhres.data.Hash;
      if (!uri) {
        return alert("failed to upload metadata");
      }
      // create new nft profile
      write({
        args: [nickname || "test", nickname.substring(0, 3) || "test", uri],
      });
      sendNotification({ signer: address });
      // alert("Profile created");
    } catch (error) {
      console.log(error, "error in handleSubmitForm");
    }
  };
  const handleAvatar = (e, i) => {
    setAvatar(i);
    console.log(i);
    setShowAvatar(false);
  };
  const [showAvatar, setShowAvatar] = useState(false);
  const handleSetNickname = (e) => {
    setNickname(e.target.value);
  };
  const inputBars = [
    {
      label: "Nickname",
      value: nickname,
      setValue: handleSetNickname,
    },
    {
      label: "Social Handles",
      placeholder: "Twitter",
      value: twitter,
      icon: "twitter",
      setValue: (e) => {
        setTwitter(e.target.value);
      },
    },
    {
      value: linkedIn,
      placeholder: "LinkedIn",
      icon: "linkedIn",
      setValue: (e) => {
        setLinkedin(e.target.value);
      },
    },
    {
      value: telegram,
      placeholder: "Telegram",
      icon: "telegram",
      setValue: (e) => {
        setTelegram(e.target.value);
      },
    },
    {
      value: personal,
      placeholder: "Personal Website",
      icon: "personal",
      setValue: (e) => {
        setPersonal(e.target.value);
      },
    },
    {
      label: "Keywords",
      value: keywords,
      setValue: (e) => {
        setKeywords(e.target.value);
      },
    },
  ];
  return (
    <>
      {showAvatar && <ChooseAvatar chooseAvatar={handleAvatar} />}
      <div className="card w-full mt-5 p-5  fcc">
        {inputBars.map(({ label, value, setValue, icon, placeholder }, i) => (
          <div
            className="w-full"
            style={{
              marginTop: label && i != 0 ? 20 : 5,
            }}
          >
            {label && (
              <label className="label" htmlFor={label}>
                {label}
              </label>
            )}
            <div className="frc gap-x-[10px] mt-1">
              {icon && (
                <Image
                  src={"/" + icon + ".png"}
                  alt={icon}
                  width={20}
                  height={20}
                />
              )}
              <input
                name={label}
                placeholder={placeholder || label}
                value={value}
                onChange={setValue}
              />
            </div>
          </div>
        ))}
        {/* CHOOSE GRADIENT */}
        <div
          className="w-full flex flex-col gap-y-1"
          style={{
            marginTop: 20,
          }}
        >
          <label className="label" htmlFor={"choose"}>
            {"Background Gradient"}
          </label>
          <div
            className="w-full flex flex-wrap gap-[2px]"
            style={
              {
                //   gridTemplateColumns: "repeat(4, minmax(100px,1fr))",
              }
            }
          >
            {grads.map((item, i) => (
              <button
                onClick={() => {
                  setGrad(i + 1);
                }}
                key={i}
                className="card h-10 w-10"
                style={{
                  borderRadius: 5,
                  border: grad == i + 1 && "2px solid white",
                  background: `var(--grad${i + 1})`,
                }}
              ></button>
            ))}
          </div>
        </div>
        {/* CHOOSE AVATAR */}
        <div
          className="w-full flex flex-col gap-y-1"
          style={{
            marginTop: 20,
          }}
        >
          <label className="label" htmlFor={"choose"}>
            {"Avatar"}
          </label>
          {avatar && (
            <ImageBox
              grad={grad}
              onClick={() => {
                setShowAvatar(true);
              }}
              contHeight={330}
              contWidth={330}
              style={{
                border: "none",
              }}
              className={"border-none w-fit p-0"}
              src={`/avatar${avatar}.png`}
              width={330}
              height={330}
            />
            // <Image
            //   src={`/avatar${avatar}.png`}
            //   alt={avatar}
            //   width={330}
            //   height={330}
            // />
          )}
          <button
            onClick={() => {
              setShowAvatar(true);
            }}
            className="chooseAvatarBtn "
            name="choose"
          >
            Choose Avatar
          </button>
        </div>
        {/* SUBMIT */}
        <HomeButton
          loading={isLoading}
          text={"Create Profile"}
          onClick={handleSubmitForm}
        />
      </div>
    </>
  );
};

export default Form;
