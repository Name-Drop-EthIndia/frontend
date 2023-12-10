import Image from "next/image";
import Link from "next/link";
import ProfileCardDetails from "./ProfileCardDetails";
import QRCode from "react-qr-code";

const ProfileCard = ({
  name,
  socialTags = [{ icon: "twitter", id: "id" }],
  avatar = "/avatar1.png",
}) => {
  return (
    <>
      <div className="w-full max-w-[366px] h-[191px] profileCard frcsb hoverExpand">
        {/* user details */}
        <ProfileCardDetails />
        {/* user IMAGE */}
        <QRCode value={"heeloo"} />
        <div className="flex flex-col profileCardBg items-end justify-between h-full">
          <Link href={"/profile/id"} className="visitProfileBtn mt-4 mr-3">
            {" Visit profile >>"}
          </Link>
          <Image src={avatar} alt="avatar" width={157} height={157} />
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
