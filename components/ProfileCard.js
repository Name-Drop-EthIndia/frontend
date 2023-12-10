"use client";
import Image from "next/image";
import Link from "next/link";
import ProfileCardDetails from "./ProfileCardDetails";
import QRCode from "react-qr-code";
import { useAccount, useSignMessage } from "wagmi";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { useState } from "react";
import { useRouter } from "next/navigation";
const ProfileCard = ({
  name,
  socialTags = [{ icon: "twitter", id: "id" }],
  avatar = "/avatar1.png",
}) => {
  const router = useRouter();
  const [showQr, setShowQr] = useState(false);
  // const message = encodeAbiParameters(
  //   parseAbiParameters("address x"),
  //   "0x0cd95622de4b32e6f9f33cba9cf835922f2b4c72"
  // );
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "whats up",
  });

  return (
    <>
      <div
        onClick={() => {
          router.push("/profile/id");
        }}
        className="w-full max-w-[366px] h-[191px] profileCard frcsb hoverExpand"
      >
        {/* user details */}
        <ProfileCardDetails />
        {/* user IMAGE */}
        {/* <QRCode value={address + "?" + sig} /> */}
        <div className="flex flex-col w-full profileCardBg items-end justify-between h-full">
          <div
            style={{
              fontSize: 10,
            }}
            onClick={() => {
              setShowQr(!showQr);
            }}
            className="hoverExpand visitProfileBtn mt-4 mr-3"
          >
            {" Show QR >>"}
          </div>
          {showQr ? (
            <Image src={avatar} alt="avatar" width={157} height={157} />
          ) : (
            <QRCode
              value={"0x0cd95622de4b32e6f9f33cba9cf835922f2b4c72"}
              style={{
                height: 157,
                width: 157,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
